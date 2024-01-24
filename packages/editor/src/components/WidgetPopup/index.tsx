import React from 'react'
import { createBehavior, createResource } from '@pind/designable-core'
import { WidgetPopup as component } from 'ui-nutui-react-taro'

import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const WidgetPopup: DnFC<React.ComponentProps<typeof component>> =
  component

const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {
      open: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      placement: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: ['top', 'bottom', 'right', 'left'].map((item) => ({
          label: item,
          value: item,
        })),
      },
      duration: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      rounded: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  },
  props: {
    'field-group': ['name', 'x-display', 'x-reactions'],
    'component-events-group': ['click', 'close'],
  },
}) as any

WidgetPopup.Behavior = createBehavior({
  name: 'WidgetPopup',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'WidgetPopup',
  designerProps: {
    droppable: true,
    propsSchema,
  },
  designerLocales: {
    'zh-CN': {
      title: '弹出层',
      settings: {
        'x-component-props': {
          open: '是否显示弹出层(请使用响应器。PC设计器上定位使用了absolute，有一些样式问题)',
          placement: '弹出位置',
          duration: '动画时长，单位毫秒',
          rounded: '是否显示圆角',
        },
      },
    },
  },
})

WidgetPopup.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'WidgetPopup',
        'x-component-props': {
          style: {
            width: '750px',
            height: '30%',
          },
          placement: 'bottom',
        },
      },
    },
  ],
})
