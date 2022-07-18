import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { ConfigProvider, Image, Slider as Component } from '@taroify/core'
import * as Icons from '@taroify/icons'

import { PreviewText } from '../PreviewText'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    max: number
    min: number
    step: number // 步长
    size: number // 进度条高度，默认单位为 px
    range: boolean // 是否开启双滑块模式
    orientation: 'horizontal' | 'vertical' // 滑块按钮展示方向，vertical 为垂直展示
    // thumb: any
  }>

export const Slider = connect((props: typeProps) => {
  const themeConfig = {
    sliderBorderRadius: '',
    sliderActiveBackgroundColor: '',
    sliderInactiveBackgroundColor: '',
    sliderDisabledOpacity: '',
    sliderTrackHeight: '',
    sliderTrackTransitionDuration: '',
    sliderThumbWidth: '',
    sliderThumbHeight: '',
    sliderThumbBorderRadius: '',
    sliderThumbBackgroundColor: '',
    sliderThumbBoxShadow: ''
  }
  return (
    <ConfigProvider
      theme={Object.keys(themeConfig).reduce((acc, cur) => {
        props?.style?.[cur] && (acc[cur] = props.style[cur])
        return acc
      }, {})}
    >
      <Component {...props}></Component>
    </ConfigProvider>
  )
})
