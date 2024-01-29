import { Engine, CursorStatus } from '../models'
import { MouseClickEvent } from '../events'
import { KeyCode, Point } from '@/designable/designable-shared/src'

export const useSelectionEffect = (engine: Engine) => {
  engine.subscribeTo(MouseClickEvent, (event) => {
    if (engine.cursor.status !== CursorStatus.Normal) return
    const target = event.data.target as HTMLElement
    const el = target?.closest?.(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `)
    const isHelpers = target?.closest?.(
      `*[${engine.props.nodeSelectionIdAttrName}]`
    )
    const currentWorkspace =
      event.context?.workspace ?? engine.workbench.activeWorkspace
    if (!currentWorkspace) return
    if (!el?.getAttribute) {
      const point = new Point(
        event.data.topClientX as number,
        event.data.topClientY as number
      )
      const operation = currentWorkspace.operation
      const viewport = currentWorkspace.viewport
      const outline = currentWorkspace.outline
      const isInViewport = viewport.isPointInViewport(point, false)
      const isInOutline = outline.isPointInViewport(point, false)
      if (isHelpers) return
      if (isInViewport || isInOutline) {
        const selection = operation.selection
        const tree = operation.tree
        selection.select(tree)
      }
      return
    }
    const props = engine.props
    const nodeId = el.getAttribute(props.nodeIdAttrName)
    const structNodeId = el.getAttribute(props.outlineNodeIdAttrName)
    const operation = currentWorkspace.operation
    const selection = operation.selection
    const tree = operation.tree
    const id = nodeId || structNodeId
    if (!id) return
    const node = tree.findById(id)
    if (node) {
      engine.keyboard.requestClean()
      if (
        engine.keyboard.isKeyDown(KeyCode.Meta) ||
        engine.keyboard.isKeyDown(KeyCode.Control)
      ) {
        if (selection.has(node)) {
          if (selection.selected.length > 1) {
            selection.remove(node)
          }
        } else {
          selection.add(node)
        }
      } else if (engine.keyboard.isKeyDown(KeyCode.Shift)) {
        if (selection.has(node)) {
          if (selection.selected.length > 1) {
            selection.remove(node)
          }
        } else {
          selection.crossAddTo(node)
        }
      } else {
        selection.select(node)
      }
    } else {
      selection.select(tree)
    }
  })
}
