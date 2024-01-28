import React, { Fragment, useRef, useMemo } from 'react'
import { FormItem, IFormItemProps } from '@formily/antd-v5'
import { useField, observer, ReactFC } from '@formily/react'
import { observable } from '@formily/reactive'
import { IconWidget, usePrefix } from '@/designable/designable-react/src'
import cls from 'classnames'
import './styles.less'

const ExpandedMap = new Map<string, boolean>()

const InternalFoldItem: ReactFC<IFormItemProps> & {
  Base?: React.FC
  Extra?: React.FC
} = observer(({ className, children, ...props }) => {
  const prefix = usePrefix('fold-item')
  const field = useField()
  const expand = useMemo(
    () => observable.ref(ExpandedMap.get(field.address.toString())),
    []
  )
  const slots = useRef({ base: null, extra: null })
  React.Children.forEach(children, (node) => {
    const props = node?.['props']
    if (React.isValidElement(node)) {
      if (node?.['type']?.['displayName'] === 'FoldItem.Base') {
        slots.current.base = props.children
      }
      if (node?.['type']?.['displayName'] === 'FoldItem.Extra') {
        slots.current.extra = props.children
      }
    }
  })
  return (
    <div className={cls(prefix, className)}>
      <div
        className={prefix + '-base'}
        onClick={() => {
          expand.value = !expand.value
          ExpandedMap.set(field.address.toString(), expand.value)
        }}
      >
        <FormItem.BaseItem
          {...props}
          label={
            <span
              className={cls(prefix + '-title', {
                expand: expand.value,
              })}
            >
              {slots.current.extra && <IconWidget infer="Expand" size={10} />}
              {props.label}
            </span>
          }
        >
          <div
            style={{ width: '100%' }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {slots.current.base}
          </div>
        </FormItem.BaseItem>
      </div>
      {expand.value && slots.current.extra && (
        <div className={prefix + '-extra'}>{slots.current.extra}</div>
      )}
    </div>
  )
})

const Base: ReactFC = () => {
  return <Fragment />
}

Base.displayName = 'FoldItem.Base'

const Extra: ReactFC = () => {
  return <Fragment />
}

Extra.displayName = 'FoldItem.Extra'

export const FoldItem = Object.assign(InternalFoldItem, {
  Base,
  Extra,
})
