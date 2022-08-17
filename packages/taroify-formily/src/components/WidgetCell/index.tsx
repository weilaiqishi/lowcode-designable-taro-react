import React from 'react'
import { observer, useForm } from '@formily/react'
import { Cell } from '@taroify/core'

import { pickDataProps } from '../__builtins__'
import { formilyStoreEvent } from '../utils'

type typeProps = {
  children?: React.ReactNode
  style: any
  title?: string // 左侧标题
  size?: 'medium' | 'large' // 单元格大小
  bordered?: boolean // 是否显示内边框
  clickable?: boolean // 是否开启点击反馈
  align?: 'start' | 'center' | 'end' // 对齐方式
  [propName: string]: any
}

export const WidgetCell = observer(
  ({
    children,
    style,
    title,
    size = 'medium',
    bordered = true,
    clickable = false,
    align,
    ...props
  }: typeProps) => {
    const form = useForm()
    return (
      <Cell
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
        title={title}
        size={size}
        bordered={bordered}
        clickable={clickable}
        align={align}
        {...props}
      >
        {children}
      </Cell>
    )
  }
)
