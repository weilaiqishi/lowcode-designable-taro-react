import React from 'react'
import { connect, mapProps, mapReadPretty, useForm } from '@formily/react'
import { Image as Component } from '@taroify/core'
import { ImageMode, ImageShape } from '@taroify/core/image/image.shared'

import { typePropsFields } from '../type'

type typeProps = typePropsFields &
  Partial<{
    useValue: boolean // 使用表单中对应字段的值
    staticValue: string // 在设计器中填入的静态值

    mode: ImageMode
    shape: ImageShape
  }>

export const Image = connect(
  ({ useValue, staticValue, value, ...props }: typeProps) => {
    const src = (useValue ? value : staticValue) || ''
    return <Component src={src} {...props}></Component>
  }
)
