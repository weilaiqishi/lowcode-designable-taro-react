import React from 'react'
import { observer, useForm } from '@formily/react'
import { Popup, PopupProps } from '@nutui/nutui-react-taro'

import { typePropsBase } from '../type'
import { formilyStoreEvent, useScope } from '../utils'

type typeProps = typePropsBase &
  PopupProps &
  Partial<{
    eventsConfig
  }>

export const WidgetPopup = observer(
  ({ children, eventsConfig, ...props }: typeProps) => {
    const scope = useScope()
    return (
      <Popup
        {...props}
        onClick={(e) => {
          if (eventsConfig?.scriptClick) {
            formilyStoreEvent(scope, eventsConfig.scriptClick)
          }
        }}
        onClose={() => {
          if (eventsConfig?.scriptClick) {
            formilyStoreEvent(scope, eventsConfig.scriptClose)
          }
        }}
      >
        {children}
      </Popup>
    )
  }
)
