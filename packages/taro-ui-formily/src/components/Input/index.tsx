import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { AtInput } from 'taro-ui'

import { PreviewText } from '../PreviewText'

export const Input = connect(
  AtInput,
  mapProps((props, field) => {
    return {
      ...props,
      customStyle: props.style,
      border: false,
      // @ts-ignore
      clear: props.allowClear
    }
  }),
  mapReadPretty(PreviewText.Input)
)
