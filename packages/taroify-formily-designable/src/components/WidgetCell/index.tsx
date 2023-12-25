import React from 'react'
import { createBehavior, createResource } from '@pind/designable-core'
import { DnFC } from '@pind/designable-react'
import { WidgetCell as component } from 'taroify-formily'

import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const WidgetCell: DnFC<React.ComponentProps<typeof component>> =
  component

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
      size: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'medium',
            value: 'medium',
          },
          {
            label: 'large',
            value: 'large',
          }
        ],
        default: 'medium',
      },
      bordered: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultValue: true,
          defaultChecked: true,
        },
      },
      clickable: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultValue: false,
          defaultChecked: false,
        },
      },
      align: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'start',
            value: 'start',
          },
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'end',
            value: 'end',
          },
        ]
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
          style: {
          },
          title: '分组标题',
          size: '单元格大小',
          bordered: '是否显示内边框',
          clickable: '是否开启点击反馈',
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
          style: {
          }
        },
      },
    },
  ],
})
