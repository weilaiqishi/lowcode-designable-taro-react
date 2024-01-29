import { TreeNode } from '@/designable/designable-core/src'
import { useContext } from 'react'
import { TreeNodeContext } from '../context'

export const useTreeNode = () => {
  return useContext(TreeNodeContext) as TreeNode
}
