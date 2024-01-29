import { Operation } from '@/designable/designable-core/src'
import { onFieldInputValueChange } from '@formily/core'
import { globalThisPolyfill } from '@/designable/designable-shared/src'

let timeRequest = 0

export const useSnapshot = (operation: Operation) => {
  onFieldInputValueChange('*', () => {
    clearTimeout(timeRequest)
    timeRequest = globalThisPolyfill.setTimeout(() => {
      operation.snapshot('update:node:props')
    }, 1000)
  })
}
