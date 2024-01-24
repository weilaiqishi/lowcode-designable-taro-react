import React from 'react'
import { observer, useForm } from '@formily/react'
import { View } from '@tarojs/components'

import { typePropsBase } from '../type'
import { formilyStoreEvent, useScope } from '../utils'

type typeProps = typePropsBase &
  Partial<{
    event
  }>

export const WidgetBase = observer(({ children, ...props }: typeProps) => {
  const scope = useScope()
  return (
    <View
      {...props}
      onClick={() => {
        if (props?.event?.click) {
          formilyStoreEvent(scope, props.event.click)
        }
      }}
    >
      {children}
    </View>
  )
})
