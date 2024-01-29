import React from 'react'
import cls from 'classnames'
import { useDesigner, usePrefix } from '../../hooks'
import { TreeNode } from '@/designable/designable-core/src'
import { IconWidget } from '../IconWidget'
import { ReactFC } from '@formily/reactive-react'

export interface ITranslateHandlerProps {
  node: TreeNode
}

export const TranslateHandler: ReactFC<ITranslateHandlerProps> = (props) => {
  const designer = useDesigner()
  const prefix = usePrefix('aux-node-translate-handler')
  const createHandler = (value: string) => {
    return {
      [designer.props.nodeTranslateAttrName]: value,
      className: cls(prefix, value),
    }
  }
  const allowTranslate = props.node.allowTranslate()
  if (!allowTranslate) return null
  return (
    <>
      <div {...createHandler('translate')}>
        <IconWidget infer="FreeMove" />
      </div>
    </>
  )
}
