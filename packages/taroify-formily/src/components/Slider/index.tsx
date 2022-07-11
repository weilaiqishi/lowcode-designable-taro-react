import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Slider as component } from '@taroify/core'

import { PreviewText } from '../PreviewText'

export const Slider = connect(
  component,
  mapProps((props, field) => {
    return {
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)
