import React from 'react'
import { connect, mapProps, mapReadPretty, useForm } from '@formily/react'
import { Button as Component, ConfigProvider, Image } from '@taroify/core'
import {
  ButtonColor,
  ButtonFormType,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '@taroify/core/button/button.shared'
import { ImageMode } from '@taroify/core/image/image.shared'
import * as Icons from '@taroify/icons'
import { Block as _Block } from '@tarojs/components'

import { PreviewText } from '../PreviewText'
import { typePropsFields } from '../type'
import { formilyStoreEvent } from '../utils'

const Block: any = _Block

type typeProps = typePropsFields &
  Partial<{
    children: string // 文本
    variant: ButtonVariant // 按钮变种，可选值为 contained text outlined
    color: ButtonColor // 按钮颜色，可选值为 default primary success warning danger
    size: ButtonSize // 尺寸，可选值为 medium large small mini
    shape: ButtonShape // 按钮形状，可选值为 square circle round
    block: boolean // 是否为块级元素
    hairline: boolean // 是否使用 0.5px 边框
    customIcon: typeCustomIcon
    event
  }>

type typeCustomIcon = Partial<{
  // 左侧图标或图片
  useIcon: boolean

  icon: string
  inline: 'none' | 'left' | 'right' // 图标是否用在children中

  src: string
  width: string
  height: string
  mode: ImageMode
}>

export const Button = connect((props: typeProps) => {
  const themeConfig = {}

  const extraProps: Record<string, any> = {}
  const customIcon = props.customIcon
  let children = <Block>{props.children}</Block>
  if (customIcon?.useIcon) {
    if (customIcon.src) {
      extraProps.icon = (
        <Image
          src={customIcon.src}
          style={{
            width: customIcon.width,
            height: customIcon.height,
            fontSize: 0,
            lineHeight: 0,
          }}
          mode={customIcon.mode || 'aspectFit'}
        />
      )
    } else if (customIcon.icon) {
      const Icon1 = Icons[customIcon.icon || '']
      switch (customIcon.inline) {
        case 'left': {
          children = (
            <Block>
              <Icon1></Icon1>
              {props.children}
            </Block>
          )
          break
        }
        case 'right': {
          children = (
            <Block>
              {props.children}
              <Icon1></Icon1>
            </Block>
          )
          break
        }
        default: {
          extraProps.icon = <Icon1></Icon1>
        }
      }
    }
  }

  const form = useForm()
  return (
    <ConfigProvider
      theme={Object.keys(themeConfig).reduce((acc, cur) => {
        props?.style?.[cur] && (acc[cur] = props.style[cur])
        return acc
      }, {})}
    >
      <Component
        {...props}
        {...extraProps}
        onClick={() => {
          if (props?.event?.click) {
            formilyStoreEvent(
              {
                $form: form,
              },
              props.event.click
            )
          }
        }}
      >
        {children}
      </Component>
    </ConfigProvider>
  )
})
