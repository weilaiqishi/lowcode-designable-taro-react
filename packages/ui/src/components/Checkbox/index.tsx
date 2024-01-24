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
    icon: typeIconImageProps // 选中前
    activeIcon: typeIconImageProps // 选中后
    indeterminateIcon: typeIconImageProps // 半选状态
  }>

export const Checkbox = connect(
  ({
    value,
    onChange,
    dataSource,
    CheckboxGroupProps,
    icon,
    activeIcon,
    indeterminateIcon,
    ...props
  }: typeProps) => {
    const _dataSource = dataSource || []

    return (
      <Component.Group
        {...(CheckboxGroupProps || {})}
        value={value}
        onChange={onChange}
      >
        {_dataSource.map((item, i) => {
          const propNames = ['icon', 'activeIcon', 'indeterminateIcon']
          const IconImageConfig = getIconImageConfig(propNames, {
            icon,
            activeIcon,
            indeterminateIcon,
          })
          return (
            <Component
              {...props}
              {...IconImageConfig}
              key={item.value}
            >
              {item.label}
            </Component>
          )
        })}
      </Component.Group>
    )
  }
  // mapProps({
  //   dataSource: 'dataSource',
  // })
)
