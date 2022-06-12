import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { AtInput } from 'taro-ui'
import { AtInputProps } from 'taro-ui/types/input'

import { PreviewText } from '../PreviewText'

export const Input = connect(
  AtInput,
  mapProps((props, field) => {
    return {
      ...props,
      customStyle: props.style,
      border: false
    }
  }),
  mapReadPretty(PreviewText.Input)
)
