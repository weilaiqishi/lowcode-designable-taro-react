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
    icon: typeIconImageProps // 选中前
    activeIcon: typeIconImageProps // 选中后
  }>

export const Radio = connect(
  ({
    value,
    onChange,
    dataSource,
    RadioGroupProps,
    icon,
    activeIcon,
    ...props
  }: typeProps) => {
    const _dataSource = dataSource || []

    return (
      <Component.Group
        {...(RadioGroupProps || {})}
        value={value}
        onChange={onChange}
      >
        {_dataSource.map((item, i) => {
          const propNames = ['icon', 'activeIcon']
          const IconImageConfig = getIconImageConfig(propNames, {
            icon,
            activeIcon,
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
