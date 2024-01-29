import { createContext } from 'react'
import { TreeNode, Engine } from '@/designable/designable-core/src'
import {
  IDesignerLayoutContext,
  IWorkspaceContext,
  IDesignerComponents,
} from './types'

export const DesignerComponentsContext = createContext<IDesignerComponents>({})

export const DesignerLayoutContext =
  createContext<IDesignerLayoutContext | null>(null)

export const DesignerEngineContext = createContext<Engine | null>(null)

export const TreeNodeContext = createContext<TreeNode | null>(null)

export const WorkspaceContext = createContext<IWorkspaceContext | null>(null)
