import React from 'react'
import { observer, useForm } from '@formily/react'
import { Cell, CellProps } from '@nutui/nutui-react-taro'

import { typePropsBase } from '../type'
import { formilyStoreEvent, useScope } from '../utils'

type typeProps = typePropsBase & CellProps &
  Partial<{
    eventsConfig
  }>

export const WidgetCell = observer(
  ({
    children,
    eventsConfig,
    ...props
  }: typeProps) => {
    const scope = useScope()
    return (
      <Cell
        {...props}
        onClick={(e) => {
          if (eventsConfig?.Click) {
            eventsConfig.Click(e)
            return
          }
          if (eventsConfig?.scriptClick) {
            formilyStoreEvent(scope, eventsConfig.scriptClick)
          }
        }}
      >
        {children}
      </Cell>
    )
  }
)
