import { isFn, globalThisPolyfill } from '@pind/designable-shared'
import { createRoot } from 'react-dom/client'
import { useSandboxScope } from '../hooks'

export const renderSandboxContent = (render: (scope?: any) => JSX.Element) => {
  if (isFn(render)) {
    const container = document.getElementById('__SANDBOX_ROOT__')
    if (container) {
      const root = createRoot(container)
      root.render(render(useSandboxScope()))
      globalThisPolyfill.addEventListener('unload', () => {
        root.unmount()
      })
    } else {
      console.error('dom __SANDBOX_ROOT__ is non-existent')
    }
  }
}
