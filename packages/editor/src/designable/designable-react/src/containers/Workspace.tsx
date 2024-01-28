import React, { useMemo, useRef, Fragment } from 'react'
import { useDesigner } from '../hooks'
import { WorkspaceContext } from '../context'
import { ReactFC } from '@formily/reactive-react'
export interface IWorkspaceProps {
  id?: string
  title?: string
  description?: string
}

export const Workspace: ReactFC<IWorkspaceProps> = ({
  id,
  title,
  description,
  ...props
}) => {
  const oldId = useRef<string>()
  const designer = useDesigner()
  const workspace = useMemo(() => {
    if (!designer)
      return {
        id: '',
      }
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current)
      if (old) old.viewport.detachEvents()
    }
    const workspace = {
      id: id || 'index',
      title,
      description,
    }
    designer.workbench.ensureWorkspace(workspace as any)
    oldId.current = workspace.id
    return workspace
  }, [id, designer])
  return (
    <Fragment>
      <WorkspaceContext.Provider value={workspace}>
        {props.children}
      </WorkspaceContext.Provider>
    </Fragment>
  )
}
