import { GlobalRegistry, IDesignerRegistry } from '@/designable/designable-core/src'
import { globalThisPolyfill } from '@/designable/designable-shared/src'

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
