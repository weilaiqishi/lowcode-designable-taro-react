import React from 'react'
import { observer } from '@formily/react'
import { View as TaroView } from '@tarojs/components'

import { formilyStoreEvent } from '../utils'

type typeProps = {
  children?: React.ReactNode
  style: any
  [propName: string]: any
}

const View: any = TaroView

export const WidgetBase = observer(({
  children,
  style,
  ...props
}: typeProps) => {
  return (
    <View
      {...props}
      style={style}
      onClick={() => {
        if (props?.event?.click) {
          formilyStoreEvent(props.event.click)
        }
      }}
    >
      {children}
    </View>
  )
})
