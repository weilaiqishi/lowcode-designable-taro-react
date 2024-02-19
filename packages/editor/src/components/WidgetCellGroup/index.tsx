import React from 'react'
import { WidgetCellGroup as Component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import {
  DnFC,
  DroppableWidget,
  useTreeNode,
} from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const WidgetCellGroup: DnFC<React.ComponentProps<typeof Component>> = (
  props
) => {
  const node = useTreeNode()
  if (node.children.length === 0) return <DroppableWidget />
  return <Component {...props}></Component>
}

const props = {
  'field-group': ['name', 'x-display', 'x-reactions'],
}

const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      description: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
      },
      divider: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  },
  props,
}) as any

WidgetCellGroup.Behavior = createBehavior({
  name: 'WidgetCellGroup',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'WidgetCellGroup',
  designerProps: {
    droppable: true,
    propsSchema,
  },
  designerLocales: {
    'zh-CN': {
      title: '单元格分组',
      settings: {
        'x-component-props': {
          title: '分组标题',
          description: '分组描述',
          divider: '单元格之间是否有分割线',
        },
      },
    },
  },
})

WidgetCellGroup.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'WidgetCellGroup',
        'x-component-props': {
          style: {
            width: '750px',
            height: '750px',
          },
        },
      },
    },
  ],
})
