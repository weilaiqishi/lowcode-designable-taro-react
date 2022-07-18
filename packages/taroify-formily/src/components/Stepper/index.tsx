import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { ConfigProvider, Image, Stepper as Component } from '@taroify/core'
import * as Icons from '@taroify/icons'

import { PreviewText } from '../PreviewText'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    max: number
    min: number
    step: number // 步长
    size: number // 进度条高度，默认单位为 px
    precision: number // 固定显示的小数位数
    shape: 'rounded' | 'square' | 'circular' // 样式风格
    longPress: boolean // 是否开启长按手势
  }>

export const Stepper = connect((props: typeProps) => {
  const themeConfig = {
    stepperActiveBackgroundColor: '',
    stepperBackgroundColor: '',
    stepperInputWidth: '',
    stepperInputHeight: '',
    stepperInputMargin: '',
    stepperInputFontSize: '',
    stepperInputLineHeight: '',
    stepperInputColor: '',
    stepperInputBackgroundColor: '',
    stepperInputDisabledColor: '',
    stepperInputDisabledBackgroundColor: '',
    stepperButtonIconColor: '',
    stepperButtonDisabledColor: '',
    stepperButtonDisabledBackgroundColor: '',
    stepperRoundedButtonBorderRadius: '',
    stepperRoundedDecreaseButtonBorderRadius: '',
    stepperRoundedIncreaseButtonBorderRadius: '',
    stepperCircularDecreaseButtonColor: '',
    stepperCircularDecreaseButtonBackgroundColor: '',
    stepperCircularDecreaseButtonBorderColor: '',
    stepperCircularIncreaseButtonColor: '',
    stepperCircularIncreaseButtonBackgroundColor: ''
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
