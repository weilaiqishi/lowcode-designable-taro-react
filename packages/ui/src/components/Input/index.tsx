import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as Component } from '@nutui/nutui-react-taro'
import {
  InputProps,
} from '@nutui/nutui-react-taro/dist/types/index'

import { PreviewText } from '../PreviewText'

import { typePropsFields } from '../type'

type typeProps = typePropsFields & InputProps & {
  clearIcon: typeIconImageProps
}

import { getIconImageConfig, typeIconImageProps } from '../Icon/IconImage'

export const Input = connect(
  ({ clearIcon, ...props }: typeProps) => {
    const propNames = ['clearIcon']
    const IconImageConfig = getIconImageConfig(propNames, {
      clearIcon,
    })
    if (IconImageConfig.noActiveIcon) {
      IconImageConfig.icon = IconImageConfig.noActiveIcon
      delete IconImageConfig.noActiveIcon
    }
    if (props.type === 'number') {
      const onChange = props.onChange
      props.onChange = (val) => {
        onChange(Number(val))
      }
    }
    return <Component {...props}></Component>
  },
  mapProps((props, field) => {
    return {
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)
