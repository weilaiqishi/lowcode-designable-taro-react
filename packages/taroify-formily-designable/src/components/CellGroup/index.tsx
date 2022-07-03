import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { CellGroup as component } from 'taroify-formily/lib'

import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const CellGroup: DnFC<React.ComponentProps<typeof component>> =
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
      inset: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultValue: false,
        },
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
    },
  },
  props,
}) as any

CellGroup.Behavior = createBehavior({
  name: 'CellGroup',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'CellGroup',
  designerProps: {
    droppable: true,
    propsSchema,
  },
  designerLocales: AllLocales.Card && {
    'zh-CN': {
      title: '单元格分组',
      settings: {
        'x-component-props': {
          style: {
          },
          title: '分组标题',
          inset: '是否展示为圆角卡片风格',
          bordered: '是否显示外边框'
        },
      },
    },
  },
})

CellGroup.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'CellGroup',
        'x-component-props': {
          style: {
            width: '750px',
            height: '750px'
          }
        },
      },
    },
  ],
})
