import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { ConfigProvider, Image, Switch as Component } from '@taroify/core'
import * as Icons from '@taroify/icons'

import { PreviewText } from '../PreviewText'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    loading: boolean // 加载状态
    size: number // 自定义大小
  }>

export const Switch = connect((props: typeProps) => {
  const themeConfig = {
    switchSize: '',
    switchFontSize: '',
    switchWidth: '',
    switchHeight: '',
    switchBorder: '',
    switchBackgroundColor: '',
    switchTransitionDuration: '',
    switchNodeSize: '',
    switchNodeWidth: '',
    switchNodeHeight: '',
    switchNodeTranslateX: '',
    switchNodeBackgroundColor: '',
    switchNodeBoxShadow: '',
    switchCheckedColor: '',
    switchCheckedBackgroundColor: '',
    switchLoadingColor: '',
    switchDisabledOpacity: '',
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
