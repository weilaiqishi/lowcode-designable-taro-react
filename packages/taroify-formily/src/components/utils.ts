import { Schema } from '@formily/json-schema'
import { useField } from '@formily/react'
import { autorun, observable, untracked } from '@formily/reactive'
import Taro from '@tarojs/taro'
import * as lodash from 'lodash-es'

import ArrayBase from './ArrayBase'

const vm = process.env.TARO_ENV !== 'h5' ? require('@kimeng/vm').default : {}

// --- 小工具
// lodash.throttle 在小程序里不能正常获得时间
export function throttle(callback, wait = 600) {
  let start = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - start >= wait) {
      callback.call(this, ...args)
      start = now
    }
  }
}

// --- 样式转化相关
type transitionPxMode = 'rpx' | 'rem'
const pxToRem = (str) => {
  const reg = /(\d+(\.\d*)?)+(px)/gi
  return String(str).replace(reg, function (x) {
    const val = x.replace(/px/gi, '')
    return Taro.pxTransform(Number(val))
  })
}
function transitionPx(origin, mode: transitionPxMode = 'rem') {
  for (const s in origin) {
    if (typeof origin[s] !== 'string') {
      continue
    }
    if (mode === 'rem') {
      origin[s] = pxToRem(origin[s])
    } else {
      origin[s] = String(origin[s]).replace(/px/g, 'rpx')
    }
  }
}
export function schemaTransitionPx(
  theSchema,
  options?: { mode: transitionPxMode }
) {
  // 处理designable导出的json中schema字段的style 从px转成rem或rpx
  if (theSchema.hasTransition) {
    return
  }
  for (const i in theSchema.properties) {
    const componentOptions = theSchema.properties[i]
    const style = componentOptions?.['x-component-props']?.style
    if (style) {
      transitionPx(style, options?.mode)
      // 如果有背景图片 backgroundSize 默认为 cover
      if (style.backgroundImage && !style.backgroundSize) {
        style.backgroundSize = 'cover'
      }
    }
    if (componentOptions.properties) {
      schemaTransitionPx(componentOptions)
    }
    // 处理自定义图标中的样式
    const customIcon = componentOptions?.['x-component-props']?.customIcon
    if (customIcon) {
      transitionPx(customIcon, options?.mode)
    }

    // 遍历 Array类型字段
    if (componentOptions?.items?.properties) {
      schemaTransitionPx(componentOptions.items)
    }
  }

  theSchema.hasTransition = true
}
export function formStyleTransitionPx(
  form,
  options?: { mode: transitionPxMode }
) {
  // 处理designable导出的json中form字段的style 从px转成rem或rpx
  if (form.hasTransition) {
    return
  }
  const style = form.style || {}
  if (style) {
    transitionPx(style, options?.mode)
    if (style.backgroundImage && !style.backgroundSize) {
      style.backgroundSize = 'cover'
    }
  }
  form.hasTransition = true
}

// --- Schema中JS表达式执行相关
function baseCompiler(expression, scope, isStatement?) {
  if (isStatement) {
    new Function('$root', 'with($root) { '.concat(expression, '; }'))(scope)
    return
  }
  return new Function(
    '$root',
    'with($root) { return ('.concat(expression, '); }')
  )(scope)
}
function miniCompiler(expression, scope, isStatement?) {
  if (scope === void 0) {
    scope = {}
  }
  const scopeKey = Object.keys(scope).filter((str) => str.includes('$'))
  scopeKey.forEach((key) => {
    const reg = new RegExp(`\\${key}`, 'g')
    expression = expression.replace(reg, 'scope.' + key)
  })
  const bridge = { current: null }
  const context = vm.createContext({ bridge, expression, scope, console })
  try {
    if (isStatement) {
      vm.runInContext(`${expression} `, context)
      return
    }
    vm.runInContext(`bridge.current = ${expression} `, context)
  } catch (err) {
    console.error(err)
  }
  return bridge.current
}
export function formilyCompilerInMiniRegister() {
  // json-schema注册兼容小程序的解析器
  if (process.env.TARO_ENV !== 'h5' ) {
    Schema.registerCompiler(miniCompiler)
    shared.compiler = miniCompiler
  }
}

// --- 事件系统相关
const shared = {
  formilyStore: {
    Taro,
  },
  PC: false,
  compiler: baseCompiler,
}
type typeScope = Partial<{
  $dependencies
  $deps
  $effect
  $form
  $memo
  $observable
  $props
  $self
  $target
  $values

  // Array组件里才有
  $array
  $index
  $record
}>
export type typeEventItem = {
  api: string
  path: string
  propsOperatorsArray: any[]
}
export function formilyStoreRunFunction(
  scope: typeScope,
  path,
  propsOperatorsArray,
  ...otherProps
) {
  console.log(
    'formilyStoreRunFunction -> formilyStore scope path propsOperatorsArray otherProps -> ',
    shared.formilyStore,
    scope,
    path,
    propsOperatorsArray,
    otherProps
  )
  let fn
  let callObject = null

  // 自定义JS语句执行
  if (path === 'runStatement') {
    const expression = propsOperatorsArray[0]
    if (expression) {
      shared.compiler(expression, scope, true)
    }
    return
  }

  // formily和注册方法执行
  if (path.includes('$form')) {
    // 从$form上获取方法
    const formFnPath = path.split('.')[1]
    fn = lodash.get(scope.$form, formFnPath)
    callObject = scope.$form
  } else {
    // 从全局formilyStore获取方法
    fn = lodash.get(shared.formilyStore, path)
    try {
      const segments = String(path || '').split('.')
      segments.pop()
      callObject = lodash.get(shared.formilyStore, segments.join())
    } catch (err) {
      console.log('formilyStoreRunFunction -> getCallObject err -> ', err)
    }
  }
  let propsArray: any[] = []
  try {
    propsArray = propsOperatorsArray.map((expression) => {
      return shared.compiler(expression, scope)
    })
  } catch (err) {
    console.log('formilyStoreRunFunction -> parsePropsJSON err -> ', err)
  }

  if (typeof fn === 'function') {
    callObject
      ? fn.call(callObject, ...propsArray, ...otherProps)
      : fn(...propsArray, ...otherProps)
  }
}

export function useScope() {
  const field = useField()
  const $array = ArrayBase.useArray?.()
  const $index = ArrayBase.useIndex?.()
  const $record = ArrayBase.useRecord?.()
  const scope = {
    $self: field,
    $form: field.form,
    $values: field.form.values,
    $observable: (target: any, deps?: any[]) =>
      autorun.memo(() => observable(target), deps),
    $effect: (props: any) => field.setComponentProps(props),
    $memo: autorun.memo,
    $props: (props: any) => field.setComponentProps(props),
    $array,
    $index,
    $record,
  }
  return scope
}
export const formilyStoreEvent = function (
  scope: typeScope,
  eventItem: typeEventItem,
  ...otherProps
) {
  const { api, path, propsOperatorsArray } = eventItem
  if (!api && !path) {
    return
  }
  formilyStoreRunFunction(
    scope,
    path || api,
    propsOperatorsArray,
    ...otherProps
  )
}
export function useInPc() {
  shared.PC = true
}
export function formilyStoreRegister(obj) {
  shared.formilyStore = obj
}
