import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { AtSwitch } from 'taro-ui'

export const Switch = connect(
  AtSwitch,
  mapProps((props, field) => {
    return {
      ...props,
      customStyle: props.style,
      border: false,
    }
  })
)