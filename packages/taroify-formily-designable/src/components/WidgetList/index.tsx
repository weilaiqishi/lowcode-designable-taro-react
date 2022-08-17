import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { WidgetList as component } from 'taroify-formily/src'

import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const WidgetList: DnFC<React.ComponentProps<typeof component>> =
  component

const props = {
  'field-group': ['name', 'x-display', 'x-reactions'],
}

const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {
    },
  },
  props,
}) as any

WidgetList.Behavior = createBehavior({
  name: 'WidgetList',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'WidgetList',
  designerProps: {
    droppable: true,
    propsSchema,
  },
  designerLocales: {
    'zh-CN': {
      title: '列表',
      settings: {
        'x-component-props': {
          style: {}
        },
      },
    },
  },
})

WidgetList.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'WidgetList',
        'x-component-props': {
          style: {
            height: '750px'
          }
        },
      },
    },
  ],
})
