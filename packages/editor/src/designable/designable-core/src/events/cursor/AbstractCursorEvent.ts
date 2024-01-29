import { IEngineContext } from '../../types'
import { globalThisPolyfill } from '@/designable/designable-shared/src'

export interface ICursorEventOriginData {
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  target: EventTarget | null
  view: Window | null
}

export interface ICursorEventData extends ICursorEventOriginData {
  topClientX: number
  topClientY: number
  topPageX: number
  topPageY: number
}

export class AbstractCursorEvent {
  data: ICursorEventData

  context: IEngineContext

  constructor(data: ICursorEventOriginData) {
    this.data = {
      topClientX: 0,
      topClientY: 0,
      topPageX: 0,
      topPageY: 0,
      ...data,
      view: data.view || globalThisPolyfill,
    }
    this.transformCoordinates()
  }

  transformCoordinates() {
    const { frameElement } = this.data?.view || {}
    if (
      frameElement &&
      this.data.view &&
      this.data.view !== globalThisPolyfill
    ) {
      const frameRect = frameElement.getBoundingClientRect()
      const scale = frameRect.width / frameElement['offsetWidth']
      this.data.topClientX = this.data.clientX * scale + frameRect.x
      this.data.topClientY = this.data.clientY * scale + frameRect.y
      this.data.topPageX =
        this.data.pageX + frameRect.x - this.data.view.scrollX
      this.data.topPageY =
        this.data.pageY + frameRect.y - this.data.view.scrollY
      const topElement = document.elementFromPoint(
        this.data.topPageX,
        this.data.topClientY
      )
      if (topElement !== frameElement) {
        this.data.target = topElement
      }
    } else {
      this.data.topClientX = this.data.clientX
      this.data.topClientY = this.data.clientY
      this.data.topPageX = this.data.pageX
      this.data.topPageY = this.data.pageY
    }
  }
}
