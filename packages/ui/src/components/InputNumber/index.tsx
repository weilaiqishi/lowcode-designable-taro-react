import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { InputNumber as Component } from '@nutui/nutui-react-taro'

import { PreviewText } from '../PreviewText'

export const InputNumber = connect(
  Component,
  mapProps((props, field) => {
    console.log(props.formatter)
    delete props.formatter
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)
