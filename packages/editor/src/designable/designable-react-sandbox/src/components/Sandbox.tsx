import React from 'react'
import { ISandboxProps, useSandbox } from '../hooks'

export const Sandbox: React.FC<ISandboxProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cssAssets, jsAssets, scope, style, ...iframeProps } = props
  return (
    <iframe
      {...iframeProps}
      ref={useSandbox(props)}
      style={{
        height: '100%',
        width: '100%',
        border: 'none',
        display: 'block',
        ...style,
      }}
    />
  )
}
