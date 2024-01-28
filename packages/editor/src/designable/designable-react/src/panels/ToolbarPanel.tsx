import { ReactFC } from '@formily/reactive-react'
import React from 'react'
import { IWorkspaceItemProps, WorkspacePanel } from './WorkspacePanel'

export const ToolbarPanel: ReactFC<IWorkspaceItemProps> = (props) => {
  return (
    <WorkspacePanel.Item
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 4,
        padding: '0 4px',
        ...props.style,
      }}
    >
      {props.children}
    </WorkspacePanel.Item>
  )
}
