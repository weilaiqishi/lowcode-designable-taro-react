import {
  useDesigner,
  useLayout,
  usePrefix,
  useWorkspace,
} from '@/designable/designable-react/src'
import { globalThisPolyfill } from '@pind/designable-shared'
import { useEffect, useRef } from 'react'

export interface ISandboxProps {
  style?: React.CSSProperties
  cssAssets?: string[]
  jsAssets?: string[]
  scope?: any
}

export const useSandbox = (props: React.PropsWithChildren<ISandboxProps>) => {
  const ref = useRef<HTMLIFrameElement>(null)
  const appCls = usePrefix('app')
  const designer = useDesigner()
  const workspace = useWorkspace()
  const layout = useLayout()
  const cssAssets = props.cssAssets || []
  const jsAssets = props.jsAssets || []
  const getCSSVar = (name: string) => {
    return getComputedStyle(
      document.querySelector(`.${appCls}`) as HTMLElement
    ).getPropertyValue(name)
  }
  useEffect(() => {
    const contentWindow = ref.current?.contentWindow
    const contentDocument = ref.current?.contentDocument
    if (!contentWindow || !contentDocument) return
    if (!workspace || !designer) return

    const styles = cssAssets
      ?.map?.((css) => {
        return `<link media="all" rel="stylesheet" href="${css}" />`
      })
      .join('\n')
    const scripts = jsAssets
      ?.map?.((js) => {
        return `<script src="${js}" type="text/javascript" ></script>`
      })
      .join('\n')
    contentWindow['__DESIGNABLE_SANDBOX_SCOPE__'] = props.scope
    contentWindow['__DESIGNABLE_LAYOUT__'] = layout
    contentWindow['__DESIGNABLE_ENGINE__'] = designer
    contentWindow['__DESIGNABLE_WORKSPACE__'] = workspace
    contentWindow['Formily'] = globalThisPolyfill['Formily']
    contentWindow['Designable'] = globalThisPolyfill['Designable']

    contentDocument.open()
    contentDocument.write(`
      <!DOCTYPE html>
        <head>
          ${styles}
        </head>
        <style>
          html{
            overflow: overlay;
          }
          ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }
          ::-webkit-scrollbar-thumb {
            background-color:${getCSSVar('--dn-scrollbar-color')};
            border-radius: 0;
            transition: all .25s ease-in-out;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: ${getCSSVar('--dn-scrollbar-hover-color')};
          }
          body{
            margin:0;
            padding:0;
            overflow-anchor: none;
            user-select:none;
            background-color:${
              layout.theme === 'light' ? '#fff' : 'transparent'
            } !important;
          }
          html{
            overflow-anchor: none;
          }
          .inherit-cusor * {
            cursor: inherit !important;
          }
          #__SANDBOX_ROOT__{
            width: 100vw;
            height: 100vh;
          }
        </style>
        <script>
        </script>
        <body>
          <div id="__SANDBOX_ROOT__"></div>
          ${scripts}
        </body>
      </html>
      `)
    contentDocument.close()
  }, [workspace, designer])
  return ref
}
