import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker as component } from '@nutui/nutui-react-taro'

import { PreviewText } from '../PreviewText'

export const DatePicker = connect(
  component,
  mapProps((props, field) => {
    return {
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)
