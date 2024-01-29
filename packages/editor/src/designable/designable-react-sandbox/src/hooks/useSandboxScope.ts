import { globalThisPolyfill } from '@/designable/designable-shared/src'

export const useSandboxScope = () => {
  return globalThisPolyfill['__DESIGNABLE_SANDBOX_SCOPE__']
}
