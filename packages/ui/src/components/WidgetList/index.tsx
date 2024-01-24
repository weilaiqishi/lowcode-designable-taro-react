import React from 'react'
import { observer, useForm } from '@formily/react'
import { VirtualList, VirtualListProps } from '@nutui/nutui-react-taro';

import { typePropsBase } from '../type'
import { formilyStoreEvent, useScope } from '../utils'

type typeProps = typePropsBase & VirtualListProps &
  Partial<{
    event
  }>

// TODO
export const WidgetList = observer(
  ({
    ...props
  }: typeProps) => {
    return (
      <VirtualList
        {...props}
      >
      </VirtualList>
    )
  }
)
