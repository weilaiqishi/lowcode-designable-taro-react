import React from 'react'
import { observer } from '@formily/react'
import { View as TaroView } from '@tarojs/components'

type typeProps = {
  children?: React.ReactNode
  style: any
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
    >
      {children}
    </View>
  )
})
