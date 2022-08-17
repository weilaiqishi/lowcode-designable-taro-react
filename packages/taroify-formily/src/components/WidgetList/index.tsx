import React from 'react'
import { observer, useForm } from '@formily/react'
import { List } from '@taroify/core'

import { pickDataProps } from '../__builtins__'
import { formilyStoreEvent } from '../utils'

type typeProps = {
  children?: React.ReactNode
  style: any
  [propName: string]: any
}

export const WidgetList = observer(
  ({
    children,
    style,
    ...props
  }: typeProps) => {
    const form = useForm()
    return (
      <List
        style={style}
        {...props}
      >
        {children}
      </List>
    )
  }
)
