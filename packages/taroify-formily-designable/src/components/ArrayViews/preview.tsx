import React, { Fragment } from 'react'
import { createBehavior, createResource, TreeNode } from '@pind/designable-core'
import {
  DnFC,
  DroppableWidget,
  TreeNodeWidget,
  useNodeIdProps,
  useTreeNode,
} from '@pind/designable-react'
import { ArrayBase } from '@formily/antd-v5'
import { observer } from '@formily/react'
import cls from 'classnames'

import { LoadTemplate } from '../../common/LoadTemplate'
import { useDropTemplate } from '../../hooks'
import {
  createEnsureTypeItemsNode,
  createNodeId,
  findNodeByComponentPath,
  hasNodeByComponentPath,
  queryNodesByComponentPath,
} from '../../shared'
import { createFieldSchema, createVoidFieldSchema } from '../Field'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {},
  },
  props: {
    'component-events-group': [],
  },
}) as any

export const ArrayViews: DnFC = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDropTemplate('ArrayViews', (source) => {
    const objectNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'object',
      },
      children: [...source],
    })
    return [objectNode]
  })
  const renderCard = () => {
    if (node.children.length === 0) return <DroppableWidget />
    const children = queryNodesByComponentPath(node, [
      'ArrayViews',
      '*',
      (name) => name.indexOf('ArrayViews.') === -1,
    ])
    return (
      <ArrayBase disabled>
        <ArrayBase.Item index={0} record={null}>
          <div
            {...props}
            {...createNodeId(designer, ensureObjectItemsNode(node).id)}
          >
            {children.length ? (
              children.map((node) => (
                <TreeNodeWidget key={node.id} node={node} />
              ))
            ) : (
              <DroppableWidget hasChildren={false} />
            )}
          </div>
        </ArrayBase.Item>
      </ArrayBase>
    )
  }

  return (
    <div {...nodeId} className="dn-array-views">
      {renderCard()}
      <LoadTemplate actions={[]} />
    </div>
  )
})

ArrayBase.mixin(ArrayViews)

ArrayViews.Behavior = createBehavior({
  name: 'ArrayViews',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ArrayViews',
  designerProps: {
    droppable: true,
    propsSchema: propsSchema,
  },
  designerLocales: {
    'zh-CN': {
      title: '批量渲染列表',
      settings: {
        'x-component-props': {
         
        },
      },
    },
  },
})

ArrayViews.Resource = createResource({
  icon: 'ArrayCardsSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'array',
        'x-component': 'ArrayViews',
        'x-component-props': {
        },
      },
    },
  ],
})
