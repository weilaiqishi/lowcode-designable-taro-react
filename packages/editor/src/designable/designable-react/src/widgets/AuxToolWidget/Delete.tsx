import { ReactFC } from '@formily/reactive-react'
import { TreeNode } from '@pind/designable-core'
import { Button } from 'antd'
import React from 'react'
import { usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

export interface IDeleteProps {
  node: TreeNode
  style?: React.CSSProperties
}

export const Delete: ReactFC<IDeleteProps> = ({ node, style }) => {
  const prefix = usePrefix('aux-copy')
  if (node === node.root) return null
  return (
    <Button
      className={prefix}
      style={style}
      type="primary"
      onClick={() => {
        TreeNode.remove([node])
      }}
    >
      <IconWidget infer="Remove" />
    </Button>
  )
}

Delete.displayName = 'Delete'
