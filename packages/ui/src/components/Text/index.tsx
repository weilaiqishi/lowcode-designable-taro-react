import React from 'react'
import { connect, mapProps, mapReadPretty, useForm } from '@formily/react'
import { Text as Component } from '@tarojs/components'

import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    useValue: boolean // 使用表单字段值
    staticValue: string // 在设计器中填入的静态值
  }>

export const Text = connect(({ useValue, staticValue, value, ...props }: typeProps) => {
  const text = (useValue ? value : staticValue) || ''
  return <Component {...props}>{text}</Component>
})
