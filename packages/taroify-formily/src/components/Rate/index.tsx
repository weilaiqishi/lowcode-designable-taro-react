import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { ConfigProvider, Image, Rate as Component } from '@taroify/core'
import * as Icons from '@taroify/icons'

import { PreviewText } from '../PreviewText'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    count: number
    size: number
    gutter: number
    allowHalf: boolean
    touchable: boolean
  }>

type typeCustomIcon = Partial<{
  useIcon: boolean
  icon: string
  emptyIcon: string
}>

export const Rate = connect(
  (props: typeProps) => {
    const themeConfig = {
      rateIconSize: 'rateIconSize',
      rateIconGutter: 'rateIconGutter',
      rateIconEmptyColor: 'rateIconEmptyColor',
      rateIconFullColor: 'rateIconFullColor',
      rateIconDisabledColor: 'rateIconDisabledColor'
    }

    const extraProps: Record<string, any> = {}
    const customIcon: typeCustomIcon = (props.style as any)?.customIcon || {}
    if (customIcon.useIcon) {
      const Icon1 = Icons[customIcon.icon || 'Like']
      const Icon2 = Icons[customIcon.emptyIcon || 'LikeOutlined']
      extraProps.icon = <Icon1></Icon1>
      extraProps.emptyIcon = <Icon2></Icon2>
    }
    return (
      <ConfigProvider
        theme={Object.keys(themeConfig).reduce((acc, cur) => {
          props?.style?.[cur] && (acc[cur] = props.style[cur])
          return acc
        }, {})}
      >
        <Component {...props} {...extraProps} />
      </ConfigProvider>
    )
  }
)
