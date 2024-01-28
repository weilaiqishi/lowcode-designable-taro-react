import { observer, ReactFC } from '@formily/reactive-react'
import { ClosestPosition, CursorStatus, TreeNode } from '@pind/designable-core'
import cls from 'classnames'
import React, { Fragment } from 'react'
import {
  useCursor,
  useMoveHelper,
  usePrefix,
  useValidNodeOffsetRect,
  useViewport,
} from '../../hooks'
interface ICoverRectProps {
  node: TreeNode
  dragging?: boolean
  dropping?: boolean
}

const CoverRect: ReactFC<ICoverRectProps> = (props) => {
  const prefix = usePrefix('aux-cover-rect')
  const rect = useValidNodeOffsetRect(props.node)
  const createCoverStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    }
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`
      baseStyle.height = rect.height
      baseStyle.width = rect.width
    }
    return baseStyle
  }

  return (
    <div
      className={cls(prefix, {
        dragging: props.dragging,
        dropping: props.dropping,
      })}
      style={createCoverStyle()}
    ></div>
  )
}

export const Cover = observer(() => {
  const viewportMoveHelper = useMoveHelper()
  const viewport = useViewport()
  const cursor = useCursor()
  const renderDropCover = () => {
    if (
      !viewportMoveHelper.closestNode ||
      !viewportMoveHelper.closestNode?.allowAppend(
        viewportMoveHelper.dragNodes
      ) ||
      viewportMoveHelper.viewportClosestDirection !== ClosestPosition.Inner
    )
      return null
    return <CoverRect node={viewportMoveHelper.closestNode} dropping />
  }
  if (cursor.status !== CursorStatus.Dragging) return null

  return (
    <Fragment>
      {viewportMoveHelper.dragNodes.map((node) => {
        if (!node) return
        if (!viewport.findElementById(node.id)) return
        return <CoverRect key={node.id} node={node} dragging />
      })}
      {renderDropCover()}
    </Fragment>
  )
})

Cover.displayName = 'Cover'
