import React from 'react'
import { observer, useForm } from '@formily/react'
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
  const form = useForm()
  return (
    <View
      {...props}
      style={style}
      onClick={() => {
        if (props?.event?.click) {
          formilyStoreEvent(
            {
              $form: form,
            },
            props.event.click
          )
        }
      }}
    >
      {children}
    </View>
  )
})
