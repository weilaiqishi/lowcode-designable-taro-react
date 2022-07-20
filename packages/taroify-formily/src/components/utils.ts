import { Schema } from '@formily/json-schema'
import vm from '@kimeng/vm'
import Taro from '@tarojs/taro'
import * as lodash from 'lodash-es'

const pxToRem = (str) => {
  const reg = /(\d+(\.\d*)?)+(px)/gi
  return String(str).replace(reg, function (x) {
    const val = x.replace(/px/gi, '')
    return Taro.pxTransform(Number(val))
  })
}

type transitionPxMode = 'rpx' | 'rem'
function transitionPx(origin, mode: transitionPxMode = 'rem') {
  for (const s in origin) {
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
    theSchema.hasTransition = true
  }
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

const shared = {
  formilyStore: {
    Taro,
  },
  PC: false,
}

export function useInPc() {
  shared.PC = true
}

export function formilyStoreRegister(obj) {
  shared.formilyStore = obj
}

export function formilyStoreRunFunction(
  scope: typeScope,
  path,
  propsOperatorsArray,
  ...otherProps
) {
  console.log(
    'formilyStoreRunFunction scope path propsOperatorsArray otherProps -> ',
    scope,
    path,
    propsOperatorsArray,
    otherProps
  )
  let fn
  let obj = null
  if (path.includes('$form')) {
    // 从$form上获取方法
    const formFnPath = path.split('.')[1]
    fn = lodash.get(scope.$form, formFnPath)
    obj = scope.$form
  } else {
    // 从全局formilyStore获取方法
    fn = lodash.get(shared.formilyStore, path)
    try {
      const segments = String(path || '').split('.')
      segments.pop()
      obj = lodash.get(shared.formilyStore, segments.join())
    } catch (err) {
      console.log('formilyStoreRunFunction -> getCallObj err -> ', err)
    }
  }
  let propsArray: any[] = []
  try {
    propsArray = propsOperatorsArray.map((expression) => {
      if (process.env.TARO_ENV === 'h5') {
        return new Function(
          '$root',
          'with($root) { return ('.concat(expression, '); }')
        )(scope)
      } else {
        const scopeKey = [
          '$dependencies',
          '$deps',
          '$effect',
          '$form',
          '$memo',
          '$observable',
          '$props',
          '$self',
          '$target',
          '$values',
        ]
        scopeKey.forEach((key) => {
          const reg = new RegExp(`\\${key}`, 'g')
          expression = expression.replace(reg, 'scope.' + key)
        })
        const bridge = { current: null }
        const context = vm.createContext({ bridge, expression, scope, console })
        try {
          vm.runInContext(`bridge.current = ${expression} `, context)
        } catch (err) {
          console.error(err)
        }
        return bridge.current
      }
    })
  } catch (err) {
    console.log('formilyStoreRunFunction -> parsepropsJSON err -> ', err)
  }

  if (typeof fn === 'function') {
    obj
      ? fn.call(obj, ...propsArray, ...otherProps)
      : fn(...propsArray, ...otherProps)
  }
}

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

export const formilyStoreRunFunctionThrottle = throttle(
  formilyStoreRunFunction,
  200
)

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
}>

export type typeEventItem = {
  api: string
  path: string
  propsOperatorsArray: any[]
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
  formilyStoreRunFunctionThrottle(
    scope,
    path || api,
    propsOperatorsArray,
    ...otherProps
  )
}

export function formilyCompilerInMiniRegister() {
  // json-schema注册兼容小程序的解析器
  Schema.registerCompiler(function (expression, scope) {
    if (scope === void 0) {
      scope = {}
    }
    const scopeKey = [
      '$dependencies',
      '$deps',
      '$effect',
      '$form',
      '$memo',
      '$observable',
      '$props',
      '$self',
      '$target',
      '$values',
    ]
    scopeKey.forEach((key) => {
      const reg = new RegExp(`\\${key}`, 'g')
      expression = expression.replace(reg, 'scope.' + key)
    })
    const bridge = { current: null }
    const context = vm.createContext({ bridge, expression, scope, console })
    try {
      vm.runInContext(`a.current = ${expression} `, context)
    } catch (err) {
      console.error(err)
    }
    return bridge.current
  })
}
