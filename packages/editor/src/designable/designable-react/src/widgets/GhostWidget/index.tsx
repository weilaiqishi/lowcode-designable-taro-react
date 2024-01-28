import React, { useRef, useEffect } from 'react'
import { useCursor, usePrefix, useDesigner } from '../../hooks'
import { CursorStatus } from '@pind/designable-core'
import { autorun } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import { NodeTitleWidget } from '../NodeTitleWidget'
import './styles.less'

export const GhostWidget = observer(() => {
  const designer = useDesigner()
  const cursor = useCursor()
  const ref = useRef<HTMLDivElement>(null)
  const prefix = usePrefix('ghost')
  const movingNodes = designer.findMovingNodes()
  const firstNode = movingNodes[0]
  useEffect(
    () =>
      autorun(() => {
        if (!cursor.position) return
        const { topClientX = 0, topClientY = 0 } = cursor.position
        const transform = `perspective(1px) translate3d(${topClientX - 18}px,${
          topClientY - 12
        }px,0) scale(0.8)`
        if (!ref.current) return
        ref.current.style.transform = transform
      }),
    [designer, cursor]
  )
  const renderNodes = () => {
    return (
      <span
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <NodeTitleWidget node={firstNode} />
        {movingNodes.length > 1 ? '...' : ''}
      </span>
    )
  }
  if (!firstNode) return null
  return cursor.status === CursorStatus.Dragging ? (
    <div ref={ref} className={prefix}>
      {renderNodes()}
    </div>
  ) : null
})

GhostWidget.displayName = 'GhostWidget'
