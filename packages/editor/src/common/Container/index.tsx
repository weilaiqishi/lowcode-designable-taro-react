import React from 'react'
import { observer } from '@formily/reactive-react'

import { DroppableWidget } from '@/designable/designable-react/src'

import './styles.less'

export const Container = observer((props) => {
  return <DroppableWidget>{props.children}</DroppableWidget>
})

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidget>
        <Target {...props} />
      </DroppableWidget>
    )
  }
}
