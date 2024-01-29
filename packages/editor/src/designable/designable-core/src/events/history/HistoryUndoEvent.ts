import { ICustomEvent } from '@/designable/designable-shared/src'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryRedoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:redo'
}
