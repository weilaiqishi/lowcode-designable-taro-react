import React from 'react'
import { observer, useForm } from '@formily/react'
import { Popup, PopupProps } from '@nutui/nutui-react-taro'

import { typePropsBase } from '../type'
import { formilyStoreEvent, useScope } from '../utils'

type typeProps = typePropsBase &
  PopupProps &
  Partial<{
    event
  }>

export const WidgetPopup = observer(
  ({ children, event, ...props }: typeProps) => {
    const scope = useScope()
    return (
      <Popup
        {...props}
        onClick={() => {
          if (event?.click) {
            formilyStoreEvent(scope, event.click)
          }
        }}
        onClose={() => {
          if (event?.close) {
            formilyStoreEvent(scope, event.close)
          }
        }}
      >
        {children}
      </Popup>
    )
  }
)
