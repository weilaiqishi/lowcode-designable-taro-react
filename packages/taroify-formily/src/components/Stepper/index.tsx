import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Stepper as component } from '@taroify/core'

import { PreviewText } from '../PreviewText'

export const Stepper = connect(
  component,
  mapProps((props, field) => {
    return {
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)
