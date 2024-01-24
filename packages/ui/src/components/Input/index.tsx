import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as Component } from '@nutui/nutui-react-taro'

import { PreviewText } from '../PreviewText'

export const Input = connect(
  Component,
  mapProps((props, field) => {
    return {
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)
