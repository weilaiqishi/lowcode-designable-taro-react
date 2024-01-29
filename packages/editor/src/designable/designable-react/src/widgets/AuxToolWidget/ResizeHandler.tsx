import { ReactFC } from '@formily/reactive-react'
import { TreeNode } from '@/designable/designable-core/src'
import cls from 'classnames'
import React from 'react'
import { useDesigner, usePrefix } from '../../hooks'

export interface IResizeHandlerProps {
  node: TreeNode
}

export const ResizeHandler: ReactFC<IResizeHandlerProps> = (props) => {
  const designer = useDesigner()
  const prefix = usePrefix('aux-node-resize-handler')
  const createHandler = (value: string) => {
    return {
      [designer.props.nodeResizeHandlerAttrName]: value,
      className: cls(prefix, value),
    }
  }
  const allowResize = props.node.allowResize()
  if (!allowResize) return null
  const allowX = allowResize.includes('x')
  const allowY = allowResize.includes('y')
  return (
    <>
      {allowX && <div {...createHandler('left-center')}></div>}
      {allowX && <div {...createHandler('right-center')}></div>}
      {allowY && <div {...createHandler('center-top')}></div>}
      {allowY && <div {...createHandler('center-bottom')}></div>}
      {allowX && allowY && <div {...createHandler('left-top')}></div>}
      {allowY && allowY && <div {...createHandler('right-top')}></div>}
      {allowX && allowY && <div {...createHandler('left-bottom')}></div>}
      {allowY && allowY && <div {...createHandler('right-bottom')}></div>}
    </>
  )
}
