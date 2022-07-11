import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Rate as component } from '@taroify/core'

import { PreviewText } from '../PreviewText'

export const Rate = connect(
  component,
  mapProps((props, field) => {
    return {
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)
