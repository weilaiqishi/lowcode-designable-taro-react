import * as lodash from 'lodash-es'
import Taro from '@tarojs/taro'

const pxToRem = (str, designWidth = 750) => {
  const reg = /(\d+(\.\d*)?)+(px)/gi
  return str.replace(reg, function(x) {
    const val = (parseFloat(x.replace(/px"/gi, '')) / designWidth * 10).toFixed(4)
    return val + 'rem'
  })
}

type transitionPxMode = 'rpx' | 'rem'
export function schemaTransitionPx(theSchema, options?: { mode: transitionPxMode }) {
  if (theSchema.hasTransitionPxToRem) {
    return
  }
  for (const i in theSchema.properties) {
    const componentOptions = theSchema.properties[i]
    const style = componentOptions?.['x-component-props']?.style
    if (style) {
      for (const s in style) {
        if (options?.mode === 'rem') {
          style[s] = pxToRem(style[s])
        } else {
          // 有rpx 被转换过则跳过
          if (String(style[s]).includes('rpx')) {
            theSchema.hasTransitionPxToRem = true
            return
          } 
          style[s] = String(style[s]).replace(/px/g, 'rpx')
        }
      }
      if (style.backgroundImage && !style.backgroundSize) {
        style.backgroundSize = 'cover'
      }
    }
    if (componentOptions.properties) {
      schemaTransitionPx(componentOptions)
    }
    theSchema.hasTransitionPxToRem = true
  }
}

let formilyStore: any = {
  Taro
}
export function formilyStoreRegister(obj) {
  formilyStore = obj
}

export function formilyStoreRunFunction(path, propsJSONArray, ...otherProps) {
  // console.log('formilyStoreRunFunction path propsJSONArray otherProps -> ', propsJSONArray, otherProps)
  const fn = lodash.get(formilyStore, path)
  let obj = null
  try {
    const segments = String(path || '').split('.')
    segments.pop()
    obj = lodash.get(formilyStore, segments.join())
  } catch (err) {
    console.log('formilyStoreRunFunction -> getCallObj err -> ', err)
  }
  let propsArray: any[] = []
  try {
    propsArray = propsJSONArray.map(item => JSON.parse(item))
  } catch (err) {
    console.log('formilyStoreRunFunction -> parsepropsJSON err -> ', err)
  }
  if (typeof fn === 'function') {
    obj ? fn.call(obj, ...propsArray, ...otherProps) : fn(...propsArray, ...otherProps)
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

export const formilyStoreRunFunctionThrottle = throttle((path, propsJSONArray, ...otherProps) => {
  // console.log('formilyStoreRunFunction path propsJSONArray otherProps -> ', propsJSONArray, otherProps)
  const fn = lodash.get(formilyStore, path)
  let obj = null
  try {
    const segments = String(path || '').split('.')
    segments.pop()
    obj = lodash.get(formilyStore, segments.join())
  } catch (err) {
    console.log('formilyStoreRunFunction -> getCallObj err -> ', err)
  }
  let propsArray: any[] = []
  try {
    propsArray = propsJSONArray.map(item => JSON.parse(item))
  } catch (err) {
    console.log('formilyStoreRunFunction -> parsepropsJSON err -> ', err)
  }
  if (typeof fn === 'function') {
    obj ? fn.call(obj, ...propsArray, ...otherProps) : fn(...propsArray, ...otherProps)
  }
}, 200)

type typeEventItem = {
  api: string
  path: string
  propsJSONArray: any[]
}

export const formilyStoreEvent = function (eventItem: typeEventItem, ...otherProps) {
  const { api, path, propsJSONArray } = eventItem
  formilyStoreRunFunctionThrottle(path || api, propsJSONArray, ...otherProps)
}
