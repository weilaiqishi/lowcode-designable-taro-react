import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Range as Component, RangeProps } from '@nutui/nutui-react-taro'

import { getIconImageConfig, typeIconImageProps } from '../Icon/IconImage'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  RangeProps &
  Partial<{
    button: typeIconImageProps
  }>

export const Range = connect(({ button, ...props }: typeProps) => {
  const propNames = ['button']
  const IconImageConfig = getIconImageConfig(propNames, {
    button,
  })
  return <Component {...props} {...IconImageConfig}></Component>
})
