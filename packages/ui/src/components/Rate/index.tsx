import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Rate as Component, RateProps } from '@nutui/nutui-react-taro'

import { getIconImageConfig, typeIconImageProps } from '../Icon/IconImage'
import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  RateProps &
  Partial<{
    uncheckedIcon: typeIconImageProps // 未选中
    checkedIcon: typeIconImageProps // 选中
  }>

export const Rate = connect(
  ({ uncheckedIcon, checkedIcon, ...props }: typeProps) => {
    const propNames = ['uncheckedIcon', 'checkedIcon']
    const IconImageConfig = getIconImageConfig(propNames, {
      uncheckedIcon,
      checkedIcon,
    })
    return <Component {...props} {...IconImageConfig}></Component>
  }
)
