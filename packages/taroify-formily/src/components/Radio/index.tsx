import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { ConfigProvider, Image, Radio as Component } from '@taroify/core'
import { ImageMode } from '@taroify/core/image/image.shared'

import { PreviewText } from '../PreviewText'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    // Radio.Group
    direction: 'vertical' | 'horizontal'

    // Radio
    size: number
    shape: 'round' | 'square'
  }>

type typeCustomIcon = Partial<{
  useIcon: boolean
  srcActive: string
  srcInactive: string
  width: string
  height: string
  mode: ImageMode
}>

export const Radio = connect(
  ({ value, onChange, dataSource, disabled, ...props }: typeProps) => {
    const _dataSource = dataSource || []

    const themeConfig = {
      radioFontSize: 'radioFontSize',
      radioBorderColor: 'radioBorderColor',
      radioGap: 'radioGap',
      radioLabelMargin: 'radioLabelMargin',
      radioLabelColor: 'radioLabelColor',
      radioLabelLineHeight: 'radioLabelLineHeight',
      radioDisabledLabelColor: 'radioDisabledLabelColor',
      radioIconFontSize: 'radioIconFontSize',
      radioCheckedIconColor: 'radioCheckedIconColor',
      radioCheckedIconBorderColor: 'radioCheckedIconBorderColor',
      radioCheckedIconBackgroundColor: 'radioCheckedIconBackgroundColor',
      radioDisabledIconColor: 'radioDisabledIconColor',
      radioDisabledIconBorderColor: 'radioDisabledIconBorderColor',
    }

    const customIcon: typeCustomIcon = (props.style as any)?.customIcon || {}    
    return (
      <ConfigProvider
        theme={Object.keys(themeConfig).reduce((acc, cur) => {
          props?.style?.[cur] && (acc[cur] = props.style[cur])
          return acc
        }, {})}
      >
        <Component.Group
          style={props.style}
          value={value}
          onChange={onChange}
          direction={props.direction}
        >
          {_dataSource.map((item, i) => {
            const extraProps: Record<string, any> = {}
            if (customIcon.useIcon) {
              extraProps.icon = (
                <Image
                  src={
                    value === item.value
                      ? customIcon.srcActive
                      : customIcon.srcInactive
                  }
                  style={{
                    width: customIcon.width,
                    height: customIcon.height,
                    fontSize: 0,
                    lineHeight: 0,
                  }}
                  mode={customIcon.mode || 'aspectFit'}
                />
              )
            }
            return (
              <Component
                style={props.style}
                name={item.value}
                key={item.value}
                disabled={disabled}
                size={props.size}
                shape={props.shape}
                {...extraProps}
              >
                {item.label}
              </Component>
            )
          })}
        </Component.Group>
      </ConfigProvider>
    )
  },
  mapProps({
    dataSource: 'dataSource',
  })
)
