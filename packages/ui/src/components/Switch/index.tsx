import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Switch as Component } from '@nutui/nutui-react-taro'

export const Switch = connect(
  Component,
  mapProps((props, field) => {
    return {
      ...props,
    }
  })
)
