import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { AtInputNumber } from 'taro-ui'

import { PreviewText } from '../PreviewText'

export const InputNumber = connect(
  AtInputNumber,
  mapProps((props, field) => {
    return {
      ...props,
      customStyle: props.style
    }
  }),
  mapReadPretty(PreviewText.Input)
)
