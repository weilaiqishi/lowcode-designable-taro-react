import React from 'react'
import { observer, useForm } from '@formily/react'
import { View as TaroView } from '@tarojs/components'

import { formilyStoreEvent, useScope } from '../utils'

type typeProps = {
  children?: React.ReactNode
  style: any
  [propName: string]: any
}

const View: any = TaroView
export const WidgetBase = observer(
  ({ children, style, ...props }: typeProps) => {
    const scope = useScope()
    return (
      <View
        {...props}
        style={style}
        onClick={() => {
          if (props?.event?.click) {
            formilyStoreEvent(scope, props.event.click)
          }
        }}
      >
        {children}
      </View>
    )
  }
)
