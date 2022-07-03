import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as component } from '@taroify/core'

import { PreviewText } from '../PreviewText'

export const Input = connect(
  component,
  mapProps((props, field) => {
    return {
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)
