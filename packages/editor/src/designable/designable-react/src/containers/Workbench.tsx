import React from 'react'
import { observer, ReactFC } from '@formily/reactive-react'
import { useWorkbench } from '../hooks'
import { Workspace } from './Workspace'

export const Workbench: ReactFC = observer((props) => {
  const workbench = useWorkbench()
  return (
    <Workspace id={workbench.currentWorkspace?.id}>{props.children}</Workspace>
  )
})
