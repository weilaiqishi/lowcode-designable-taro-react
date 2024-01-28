import { ReactFC } from '@formily/reactive-react'
import cls from 'classnames'
import React from 'react'
import { Layout } from '../containers'
import { usePosition, usePrefix } from '../hooks'
export interface IStudioPanelProps {
  style?: React.CSSProperties
  className?: string
  logo?: React.ReactNode
  actions?: React.ReactNode
  prefixCls?: string
  theme?: string
  position?: React.ComponentProps<typeof Layout>['position']
}

const StudioPanelInternal: ReactFC<IStudioPanelProps> = ({
  logo,
  actions,
  ...props
}) => {
  const prefix = usePrefix('main-panel')
  const position = usePosition()
  const classNameBase = cls('root', position, props.className)
  if (logo || actions) {
    return (
      <div {...props} className={cls(`${prefix}-container`, classNameBase)}>
        <div className={prefix + '-header'}>
          <div className={prefix + '-header-logo'}>{logo}</div>
          <div className={prefix + '-header-actions'}>{actions}</div>
        </div>
        <div className={prefix}>{props.children}</div>
      </div>
    )
  }
  return (
    <div {...props} className={cls(prefix, classNameBase)}>
      {props.children}
    </div>
  )
}

export const StudioPanel: ReactFC<IStudioPanelProps> = (props) => {
  return (
    <Layout
      theme={props.theme}
      prefixCls={props.prefixCls}
      position={props.position}
    >
      <StudioPanelInternal {...props} />
    </Layout>
  )
}
