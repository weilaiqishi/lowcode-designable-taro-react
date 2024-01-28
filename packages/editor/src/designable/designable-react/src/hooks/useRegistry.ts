import { GlobalRegistry, IDesignerRegistry } from '@pind/designable-core'
import { globalThisPolyfill } from '@pind/designable-shared'

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
