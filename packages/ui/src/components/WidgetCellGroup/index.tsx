import React from 'react'
import { observer, useForm } from '@formily/react'
import { CellGroup, CellGroupProps } from '@nutui/nutui-react-taro'

import { typePropsBase } from '../type'

type typeProps = typePropsBase &
  CellGroupProps &
  Partial<{
    event
  }>

export const WidgetCellGroup = observer(({ children, ...props }: typeProps) => {
  return <CellGroup {...props}>{children}</CellGroup>
})
