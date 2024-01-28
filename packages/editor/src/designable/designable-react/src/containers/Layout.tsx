import { ReactFC } from '@formily/reactive-react'
import { each } from '@pind/designable-shared'
import cls from 'classnames'
import React, { Fragment, useContext, useLayoutEffect, useRef } from 'react'
import { DesignerLayoutContext } from '../context'
import { IDesignerLayoutProps } from '../types'

export const Layout: ReactFC<IDesignerLayoutProps> = (props) => {
  const layout = useContext(DesignerLayoutContext)
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const { current } = ref
    const { variables } = props
    if (current && variables) {
      each(variables, (value, key) => {
        current.style.setProperty(`--${key}`, value)
      })
    }
  }, [props.variables])

  if (layout) {
    return <Fragment>{props.children}</Fragment>
  }
  return (
    <div
      ref={ref}
      className={cls({
        [`${props.prefixCls}app`]: true,
        [`${props.prefixCls}${props.theme}`]: props.theme,
      })}
    >
      <DesignerLayoutContext.Provider
        value={{
          theme: props.theme,
          prefixCls: props.prefixCls as string,
          position:
            props.position as Required<IDesignerLayoutProps>['position'],
        }}
      >
        {props.children}
      </DesignerLayoutContext.Provider>
    </div>
  )
}

Layout.defaultProps = {
  theme: 'light',
  prefixCls: 'dn-',
  position: 'fixed',
}
