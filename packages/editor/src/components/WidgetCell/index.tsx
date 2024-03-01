import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import * as lodash from 'lodash-es'
import { WidgetCell as Component } from 'ui-nutui-react-taro'

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

export const WidgetCell: DnFC<React.ComponentProps<typeof Component>> = (
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
      extra: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      align: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'flex-start',
            value: 'flex-start',
          },
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'flex-end',
            value: 'flex-end',
          },
        ],
      },
    },
  },
  props,
}) as any

WidgetCell.Behavior = createBehavior({
  name: 'WidgetCell',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'WidgetCell',
  designerProps: {
    droppable: true,
    propsSchema,
  },
  designerLocales: {
    'zh-CN': {
      title: '单元格',
      settings: {
        'x-component-props': {
          title: '标题',
          description: '描述',
          extra: '右侧描述',
          align: '对齐方式',
        },
      },
    },
  },
})

WidgetCell.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'WidgetCell',
        'x-component-props': {
          style: {},
        },
      },
    },
  ],
})
