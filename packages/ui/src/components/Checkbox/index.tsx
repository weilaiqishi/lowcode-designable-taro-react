import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox as Component, Image } from '@nutui/nutui-react-taro'
import {
  CheckboxGroupProps,
  CheckboxProps,
} from '@nutui/nutui-react-taro/dist/types/index'

import { getIconImageConfig, typeIconImageProps } from '../Icon/IconImage'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  CheckboxProps &
  Partial<{
    CheckboxGroupProps: CheckboxGroupProps
    noActiveIcon: typeIconImageProps // 选中前
    activeIcon: typeIconImageProps // 选中后
    indeterminateIcon: typeIconImageProps // 半选状态
  }>

export const Checkbox = connect(
  ({
    value,
    onChange,
    dataSource,
    CheckboxGroupProps,
    noActiveIcon,
    activeIcon,
    indeterminateIcon,
    disabled,
    ...props
  }: typeProps) => {
    const _dataSource: {
      label: string,
      value: string | number,
      disabled: boolean
    }[] = (dataSource || []) as any
    return (
      <Component.Group
        {...(CheckboxGroupProps || {})}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {_dataSource.map((item, i) => {
          const propNames = ['noActiveIcon', 'activeIcon', 'indeterminateIcon']
          const IconImageConfig = getIconImageConfig(propNames, {
            noActiveIcon,
            activeIcon,
            indeterminateIcon,
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
  }),
)
