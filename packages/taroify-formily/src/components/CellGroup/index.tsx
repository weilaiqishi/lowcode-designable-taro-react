import React from 'react'
import { observer } from '@formily/react'
import { Cell } from "@taroify/core"
import { View as TaroView } from '@tarojs/components'

type typeProps = {
  children?: React.ReactNode
  style: any
  title?: string // 分组标题
  inset?: boolean // 是否展示为圆角卡片风格
  bordered?: boolean // 是否显示外边框
  [propName: string]: any
}

const View: any = TaroView

export const CellGroup = observer(({
  children,
  style,
  title,
  inset = false,
  bordered = true,
  ...props
}: typeProps) => {
  return (
    <View
      {...props}
      style={style}
    >
      <Cell.Group inset={inset} bordered={bordered} title={title}>
        {children}
      </Cell.Group>
    </View>
  )
})
