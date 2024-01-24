import React from 'react'
import { ScrollView, View } from '@tarojs/components'

import FixedSizeList from './ListComponent'
import * as types from './type'

function convertPxToInt(style) {
  if (typeof style === 'string') {
    const str = style.toLowerCase()
    if (/px$/.test(str)) {
      return Number(str.replace(/px$/, ''))
    }
  }
  return style
}

type OuterScrollViewProps = {
  style
  onScroll
  onScrollNative
  layout
  [propName: string]: any
}

const OuterScrollView = React.forwardRef((props: OuterScrollViewProps, ref) => {
  const { style, onScroll, onScrollNative, layout, ...rest } = props
  const handleScroll = (event) => {
    onScroll({
      ...event,
      currentTarget: {
        ...event.detail,
        clientWidth: convertPxToInt(style.width),
        clientHeight: convertPxToInt(style.height),
      },
    })

    if (typeof onScrollNative === 'function') {
      onScrollNative(event)
    }
  }

  return React.createElement(ScrollView, {
    ref,
    style,
    scrollY: layout === 'vertical',
    scrollX: layout === 'horizontal',
    onScroll: handleScroll,
    ...rest,
  })
})

const VirtualList = React.forwardRef((props: types.VirtualListProps, ref) => {
  const {
    direction = 'ltr',
    innerElementType = View,
    itemElementType = View,
    initialScrollOffset = 0,
    overscanCount = 1,
    ...rest
  } = props

  return React.createElement(FixedSizeList, {
    ref,
    itemElementType,
    innerElementType,
    outerElementType: OuterScrollView,
    direction,
    initialScrollOffset,
    overscanCount,
    layout: 'vertical',
    ...rest
  })
})

export default VirtualList
