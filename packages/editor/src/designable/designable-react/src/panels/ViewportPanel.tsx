import { ReactFC } from '@formily/reactive-react'
import React from 'react'
import { Simulator } from '../containers'
import { IWorkspaceItemProps, WorkspacePanel } from './WorkspacePanel'

export const ViewportPanel: ReactFC<IWorkspaceItemProps> = (props) => {
  return (
    <WorkspacePanel.Item {...props} flexable>
      <Simulator>{props.children}</Simulator>
    </WorkspacePanel.Item>
  )
}
