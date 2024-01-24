import React from 'react'
import { connect, mapProps, mapReadPretty, useForm } from '@formily/react'
import { TextArea as Component } from '@nutui/nutui-react-taro'

import PreviewText from '../PreviewText'

export const TextArea = connect(
  Component,
  mapProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)
