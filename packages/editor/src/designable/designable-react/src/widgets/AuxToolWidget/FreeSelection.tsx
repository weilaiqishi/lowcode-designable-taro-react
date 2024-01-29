import React from 'react'
import { useCursor, usePrefix, useViewport, useOperation } from '../../hooks'
import { observer } from '@formily/reactive-react'
import { CursorDragType, CursorStatus } from '@/designable/designable-core/src'
import { calcRectByStartEndPoint } from '@/designable/designable-shared/src'
import cls from 'classnames'

export const FreeSelection = observer(() => {
  const cursor = useCursor()
  const viewport = useViewport()
  const operation = useOperation()
  const prefix = usePrefix('aux-free-selection')
  const createSelectionStyle = () => {
    const { dragStartPosition, position } = cursor
    if (!dragStartPosition) return {}
    const startDragPoint = viewport.getOffsetPoint({
      x: dragStartPosition.topClientX as number,
      y: dragStartPosition.topClientY as number,
    })
    const currentPoint = viewport.getOffsetPoint({
      x: position.topClientX as number,
      y: position.topClientY as number,
    })
    const rect = calcRectByStartEndPoint(
      startDragPoint,
      currentPoint,
      viewport.dragScrollXDelta,
      viewport.dragScrollYDelta
    )
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0.2,
      borderWidth: 1,
      borderStyle: 'solid',
      transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
      height: rect.height,
      width: rect.width,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      zIndex: 1,
    }
    return baseStyle
  }

  if (
    operation.moveHelper.hasDragNodes ||
    cursor.status !== CursorStatus.Dragging ||
    cursor.dragType !== CursorDragType.Move
  )
    return null

  return <div className={cls(prefix)} style={createSelectionStyle()}></div>
})
