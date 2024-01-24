import React from 'react'
import { observer, useForm } from '@formily/react'
import { Cell, CellProps } from '@nutui/nutui-react-taro'

import { typePropsBase } from '../type'
import { formilyStoreEvent, useScope } from '../utils'

type typeProps = typePropsBase & CellProps &
  Partial<{
    event
  }>

export const WidgetCell = observer(
  ({
    children,
    event,
    ...props
  }: typeProps) => {
    const scope = useScope()
    return (
      <Cell
        {...props}
        onClick={() => {
          if (event?.click) {
            formilyStoreEvent(scope, event.click)
          }
        }}
      >
        {children}
      </Cell>
    )
  }
)
