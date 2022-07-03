import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { AtRate } from 'taro-ui'

export const Rate = connect(
  AtRate,
  mapProps((props, field) => {
    return {
      ...props,
      customStyle: props.style
    }
  })
)