import React, { useState } from 'react'
import { observer,useField } from '@formily/react'
import cls from 'classnames'

import { IconWidget,usePrefix } from '@/designable/designable-react/src'

import './styles.less'

export interface ICollapseItemProps {
  className?: string
  style?: React.CSSProperties
  defaultExpand?: boolean
  title?: string
}

export const CollapseItem: React.FC<ICollapseItemProps> = observer((props) => {
  const prefix = usePrefix('collapse-item')
  const field = useField()
  const [expand, setExpand] = useState(props.defaultExpand ?? true)
  let title = props.title || field.title
  if (typeof title !== 'string') {
    title = ''
  }
  return (
    <div
      className={cls(prefix, props.className, { expand })}
      style={props.style}
    >
      <div
        className={prefix + '-header'}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setExpand(!expand)
        }}
      >
        <div className={prefix + '-header-expand'}>
          <IconWidget infer="Expand" size={10} />
        </div>

        <div className={prefix + '-header-content'}>{title}</div>
      </div>
      <div className={prefix + '-content'}>{props.children}</div>
    </div>
  )
})
