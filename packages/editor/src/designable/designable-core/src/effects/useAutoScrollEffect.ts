import { Engine, CursorStatus, Viewport } from '../models'
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'
import {
  calcAutoScrollBasicInfo,
  scrollAnimate,
  IAutoScrollBasicInfo,
  IPoint,
  Point,
} from '@/designable/designable-shared/src'

export const useAutoScrollEffect = (engine: Engine) => {
  let xScroller: IAutoScrollBasicInfo | null = null
  let yScroller: IAutoScrollBasicInfo | null = null
  let xScrollerAnimationStop: Function | null = null
  let yScrollerAnimationStop: Function | null = null

  const scrolling = (point: IPoint, viewport: Viewport) => {
    if (engine.cursor.status === CursorStatus.Dragging) {
      xScroller = calcAutoScrollBasicInfo(point, 'x', viewport.rect as DOMRect)
      yScroller = calcAutoScrollBasicInfo(point, 'y', viewport.rect as DOMRect)
      if (xScroller) {
        if (xScrollerAnimationStop) {
          xScrollerAnimationStop()
        }
        xScrollerAnimationStop = scrollAnimate(
          viewport.scrollContainer,
          'x',
          xScroller.direction,
          xScroller.speed
        )
      } else {
        if (xScrollerAnimationStop) {
          xScrollerAnimationStop()
        }
      }
      if (yScroller) {
        if (yScrollerAnimationStop) {
          yScrollerAnimationStop()
        }
        yScrollerAnimationStop = scrollAnimate(
          viewport.scrollContainer,
          'y',
          yScroller.direction,
          yScroller.speed
        )
      } else {
        if (yScrollerAnimationStop) {
          yScrollerAnimationStop()
        }
      }
    }
  }

  engine.subscribeTo(DragStartEvent, () => {
    engine.workbench.eachWorkspace((workspace) => {
      workspace.viewport.takeDragStartSnapshot()
    })
  })

  engine.subscribeTo(DragMoveEvent, (event) => {
    engine.workbench.eachWorkspace((workspace) => {
      const viewport = workspace.viewport
      const outline = workspace.outline
      const point = new Point(
        event.data.topClientX as number,
        event.data.topClientY as number
      )
      if (outline.isPointInViewport(point)) {
        scrolling(point, outline)
      } else if (viewport.isPointInViewport(point)) {
        scrolling(point, viewport)
      }
    })
  })
  engine.subscribeTo(DragStopEvent, () => {
    xScroller = null
    yScroller = null
    if (xScrollerAnimationStop) {
      xScrollerAnimationStop()
    }
    if (yScrollerAnimationStop) {
      yScrollerAnimationStop()
    }
  })
}
