import { ICustomEvent } from '@/designable/designable-shared/src'
import { AbstractCursorEvent } from './AbstractCursorEvent'

export class MouseClickEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'mouse:click'
}

export class MouseDoubleClickEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'mouse:dblclick'
}
