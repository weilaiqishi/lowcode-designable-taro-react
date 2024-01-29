import { Path } from '@formily/path'
import { globalThisPolyfill, requestIdle } from '@/designable/designable-shared/src'
import { MouseClickEvent, MouseDoubleClickEvent } from '../events'
import { Engine, TreeNode } from '../models'

type GlobalState = {
  activeElements: Map<HTMLInputElement, TreeNode>
  requestTimer: any
  isComposition: boolean
  queue: (() => void)[]
}

function getAllRanges(sel: Selection) {
  const ranges: {
    collapsed: boolean
    startOffset: number
    endOffset: number
  }[] = []
  for (let i = 0; i < sel.rangeCount; i++) {
    const range = sel.getRangeAt(i)
    ranges[i] = {
      collapsed: range.collapsed,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    }
  }
  return ranges
}

function setEndOfContenteditable(contentEditableElement: Element) {
  const range = document.createRange()
  range.selectNodeContents(contentEditableElement)
  range.collapse(false)
  const selection = globalThisPolyfill.getSelection()
  if (!selection) return
  selection.removeAllRanges()
  selection.addRange(range)
}

function createCaretCache(el: Element) {
  const currentSelection = globalThisPolyfill.getSelection()
  if (!currentSelection) return
  if (currentSelection.containsNode(el)) return
  const ranges = getAllRanges(currentSelection)
  return (offset = 0) => {
    const sel = globalThisPolyfill.getSelection()
    if (!sel) return
    const firstNode = el.childNodes[0]
    if (!firstNode) return
    sel.removeAllRanges()
    ranges.forEach((item) => {
      const range = document.createRange()
      range.collapse(item.collapsed)
      range.setStart(firstNode, item.startOffset + offset)
      range.setEnd(firstNode, item.endOffset + offset)
      sel.addRange(range)
    })
  }
}

export const useContentEditableEffect = (engine: Engine) => {
  const globalState: GlobalState = {
    activeElements: new Map(),
    queue: [],
    requestTimer: null,
    isComposition: false,
  }

  function onKeyDownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  function onInputHandler(event: InputEvent) {
    const node = globalState.activeElements.get(this)
    event.stopPropagation()
    event.preventDefault()
    if (node) {
      const target = event.target as Element
      const handler = () => {
        globalState.queue.length = 0
        if (globalState.isComposition) return
        const restore = createCaretCache(target)
        Path.setIn(
          node.props,
          this.getAttribute(engine.props.contentEditableAttrName),
          target?.textContent
        )
        requestIdle(() => {
          node.takeSnapshot('update:node:props')
          restore?.()
        })
      }
      globalState.queue.push(handler)
      clearTimeout(globalState.requestTimer)
      globalState.requestTimer = setTimeout(handler, 600)
    }
  }

  function onSelectionChangeHandler() {
    clearTimeout(globalState.requestTimer)
    globalState.requestTimer = setTimeout(
      globalState.queue[globalState.queue.length - 1],
      600
    )
  }

  function onCompositionHandler(event: CompositionEvent) {
    if (event.type === 'compositionend') {
      globalState.isComposition = false
      onInputHandler(event as unknown as InputEvent)
    } else {
      clearTimeout(globalState.requestTimer)
      globalState.isComposition = true
    }
  }

  function onPastHandler(event: ClipboardEvent) {
    event.preventDefault()
    const node = globalState.activeElements.get(this)
    const text = event.clipboardData?.getData('text')
    const selObj = globalThisPolyfill.getSelection()
    const target = event.target as Element
    const selRange = selObj?.getRangeAt(0)
    if (!selRange || !node || !text) return
    const restore = createCaretCache(target)
    selRange.deleteContents()
    selRange.insertNode(document.createTextNode(text))
    Path.setIn(
      node.props,
      this.getAttribute(engine.props.contentEditableAttrName),
      target.textContent
    )
    restore?.(text.length)
  }

  function findTargetNodeId(element: Element) {
    if (!element) return

    const props = engine.props
    const nodeId = element.getAttribute(props.contentEditableNodeIdAttrName)
    if (nodeId) return nodeId
    const parent = element.closest(`*[${props.nodeIdAttrName}]`)
    if (parent) return parent.getAttribute(props.nodeIdAttrName)
  }

  engine.subscribeTo(MouseClickEvent, (event) => {
    const target = event.data.target as Element
    const editableElement = target?.closest?.(
      `*[${engine.props.contentEditableAttrName}]`
    )
    if (
      editableElement &&
      editableElement.getAttribute('contenteditable') === 'true'
    )
      return
    globalState.activeElements.forEach((node, element) => {
      globalState.activeElements.delete(element)
      element.removeAttribute('contenteditable')
      element.removeAttribute('spellcheck')
      element.removeEventListener('input', onInputHandler)
      element.removeEventListener('compositionstart', onCompositionHandler)
      element.removeEventListener('compositionupdate', onCompositionHandler)
      element.removeEventListener('compositionend', onCompositionHandler)
      element.removeEventListener('past', onPastHandler)
      document.removeEventListener('selectionchange', onSelectionChangeHandler)
    })
  })

  engine.subscribeTo(MouseDoubleClickEvent, (event) => {
    const target = event.data.target as Element
    const editableElement = target?.closest?.(
      `*[${engine.props.contentEditableAttrName}]`
    ) as HTMLInputElement
    const workspace = engine.workbench.activeWorkspace
    const tree = workspace?.operation.tree
    if (editableElement && tree) {
      const editable = editableElement.getAttribute('contenteditable')
      if (editable === 'false' || !editable) {
        const nodeId = findTargetNodeId(editableElement)
        if (nodeId) {
          const targetNode = tree.findById(nodeId)
          if (targetNode) {
            globalState.activeElements.set(editableElement, targetNode)
            editableElement.setAttribute('spellcheck', 'false')
            editableElement.setAttribute('contenteditable', 'true')
            editableElement.focus()
            editableElement.addEventListener('input', onInputHandler)
            editableElement.addEventListener(
              'compositionstart',
              onCompositionHandler
            )
            editableElement.addEventListener(
              'compositionupdate',
              onCompositionHandler
            )
            editableElement.addEventListener(
              'compositionend',
              onCompositionHandler
            )
            editableElement.addEventListener('keydown', onKeyDownHandler)
            editableElement.addEventListener('paste', onPastHandler)
            document.addEventListener(
              'selectionchange',
              onSelectionChangeHandler
            )
            setEndOfContenteditable(editableElement)
          }
        }
      }
    }
  })
}
