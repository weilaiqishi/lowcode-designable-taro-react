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