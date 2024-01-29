import { observable, define, action } from '@formily/reactive'
import { Operation } from './Operation'
import { TreeNode } from './TreeNode'
import { HoverNodeEvent } from '../events'

export interface IHoverProps {
  operation: Operation
}

export class Hover {
  node?: TreeNode
  operation?: Operation
  constructor(props?: IHoverProps) {
    this.operation = props?.operation
    this.makeObservable()
  }

  setHover(node?: TreeNode) {
    this.node = node
    this.trigger()
  }

  clear() {
    this.node = undefined
  }

  trigger() {
    if (this.operation && this.node) {
      return this.operation.dispatch(
        new HoverNodeEvent({
          target: this.operation.tree,
          source: this.node,
        })
      )
    }
  }

  makeObservable() {
    define(this, {
      node: observable.ref,
      setHover: action,
      clear: action,
    })
  }
}
