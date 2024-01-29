import * as Core from './exports'
export * from './exports'
import { globalThisPolyfill } from '@/designable/designable-shared/src'

if (globalThisPolyfill?.['Designable']?.['Core']) {
  try {
    if (module.exports) {
      module.exports = {
        __esModule: true,
        ...globalThisPolyfill['Designable']['Core'],
      }
    }
  } catch (error) {}
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {}
  globalThisPolyfill['Designable'].Core = Core
}
