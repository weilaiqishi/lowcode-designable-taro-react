import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox as Component, ConfigProvider, Image } from '@taroify/core'
import { ImageMode } from '@taroify/core/image/image.shared'

import { PreviewText } from '../PreviewText'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    // CheckboxGroup
    max: number
    direction: 'vertical' | 'horizontal'

    // Checkbox
    size: number
    shape: 'round' | 'square'

    customIcon: typeCustomIcon
  }>

type typeCustomIcon = Partial<{
  useIcon: boolean
  srcActive: string
  srcInactive: string
  width: string
  height: string
  mode: ImageMode
}>

export const Checkbox = connect(
  ({ value, onChange, dataSource, disabled, ...props }: typeProps) => {
    const _dataSource = dataSource || []

    const themeConfig = {
      checkboxFontSize: '',
      checkboxBorderColor: '',
      checkboxGap: '',
      checkboxLabelMargin: '',
      checkboxLabelColor: '',
      checkboxLabelLineHeight: '',
      checkboxDisabledLabelColor: '',
      checkboxIconFontSize: '',
      checkboxCheckedIconColor: '',
      checkboxCheckedIconBorderColor: '',
      checkboxCheckedIconBackgroundColor: '',
      checkboxDisabledIconColor: '',
      checkboxDisabledIconBorderColor: ''
    }

    const customIcon = props.customIcon
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
          max={props.max}
          direction={props.direction}
        >
          {_dataSource.map((item, i) => {
            const extraProps: Record<string, any> = {}
            if (customIcon?.useIcon) {
              extraProps.icon = (
                <Image
                  src={
                    (Array.isArray(value) ? value : []).includes(item.value)
                      ? customIcon.srcActive
                      : customIcon.srcInactive
                  }
                  style={{
                    width: customIcon.width,
                    height: customIcon.height,
                    fontSize: 0,
                    lineHeight: 0
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
