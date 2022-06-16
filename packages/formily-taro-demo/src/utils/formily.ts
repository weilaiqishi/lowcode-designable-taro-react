import {
  registerValidateLocale,
  registerValidateRules,
  setValidateLanguage,
} from '@formily/core'
import { Schema } from '@formily/json-schema'
// @ts-ignore
import vm from '@kimeng/vm'

export function initFormily() {
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
    const a = { current: null }
    const context = vm.createContext({ a, expression, scope, console })
    try {
    // vm.runInContext(`a.current = new Function('$root', "with($root) { return (".concat(expression, "); }"))(scope);`, context); // none with
      vm.runInContext(`a.current = ${expression} `, context) // yes
    } catch (err) {
      console.error(err)
    }
    return a.current
  })

  // 组件初始化

  registerValidateRules({
    noBr(value) {
      return value.includes('\n') ? '不支持换行' : ''
    },
  })

  setValidateLanguage('zh-CN')
  registerValidateLocale({
    'zh-CN': {
    // required: '定制的必填校验文案',
    },
  })

}

export function transitionPx(theSchema) {
  for (const i in theSchema.properties) {
    const componentOptions = theSchema.properties[i]
    const style = componentOptions?.['x-component-props']?.style
    if (style) {
      for (const s in style) {
        if (String(style[s]).includes('rpx')) {
          return
        } // 有rpx 被转换过
        style[s] = String(style[s]).replace(/px/g, 'rpx')
      }
      if (style.backgroundImage && !style.backgroundSize) {
        style.backgroundSize = 'cover'
      }
    }
    if (componentOptions.properties) {
      transitionPx(componentOptions)
    }
    if (
      componentOptions?.['x-component'] === 'VoidSwiper' ||
      componentOptions.properties
    ) {
      componentOptions['x-component-props'].customSchema =
        componentOptions.properties
    }
  }
}