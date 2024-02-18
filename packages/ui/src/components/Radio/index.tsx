import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  Radio as Component,
  RadioGroupProps,
  RadioProps,
} from '@nutui/nutui-react-taro'

import { getIconImageConfig, typeIconImageProps } from '../Icon/IconImage'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  RadioProps &
  Partial<{
    RadioGroupProps: RadioGroupProps
    noActiveIcon: typeIconImageProps // 选中前
    activeIcon: typeIconImageProps // 选中后
  }>

export const Radio = connect(
  ({
    value,
    onChange,
    dataSource,
    RadioGroupProps,
    noActiveIcon,
    activeIcon,
    disabled,
    ...props
  }: typeProps) => {
    const _dataSource = dataSource || []
    return (
      <Component.Group
        {...(RadioGroupProps || {})}
        value={value}
        onChange={onChange}
        disabled={disabled ? true : undefined}
      >
        {_dataSource.map((item, i) => {
          const propNames = ['noActiveIcon', 'activeIcon']
          const IconImageConfig = getIconImageConfig(propNames, {
            noActiveIcon,
            activeIcon,
          })
          if (IconImageConfig.noActiveIcon) {
            IconImageConfig.icon = IconImageConfig.noActiveIcon
            delete IconImageConfig.noActiveIcon
          }
          return (
            <Component
              {...props}
              {...IconImageConfig}
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </Component>
          )
        })}
      </Component.Group>
    )
  },
  mapProps({
    dataSource: 'dataSource',
  })
)
