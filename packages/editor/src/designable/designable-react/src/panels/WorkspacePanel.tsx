import { ReactFC } from '@formily/reactive-react'
import React from 'react'
import { usePrefix } from '../hooks'

export interface IWorkspaceItemProps {
  style?: React.CSSProperties
  flexable?: boolean
}

const InternalWorkspacePanel: ReactFC = (props) => {
  const prefix = usePrefix('workspace-panel')
  return <div className={prefix}>{props.children}</div>
}
const Item: ReactFC<IWorkspaceItemProps> = (props) => {
  const prefix = usePrefix('workspace-panel-item')
  return (
    <div
      className={prefix}
      style={{
        ...props.style,
        flexGrow: props.flexable ? 1 : 0,
        flexShrink: props.flexable ? 1 : 0,
      }}
    >
      {props.children}
    </div>
  )
}
export const WorkspacePanel = Object.assign(InternalWorkspacePanel, {
  Item,
})
