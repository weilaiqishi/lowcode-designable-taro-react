import React from 'react'
import { connect, mapProps, mapReadPretty, useForm } from '@formily/react'
import { IconFont } from '@nutui/icons-react-taro'

import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Parameters<typeof IconFont>[0] &
  Partial<{
    useValue: boolean // 使用表单中对应字段的值
    name: string // 在设计器中填入的静态值
  }>

export const Icon = connect(
  ({ useValue, value, name, ...props }: typeProps) => {
    const nameHandled = (useValue ? value : name) || ''
    return <IconFont name={nameHandled} {...props}></IconFont>
  }
)
