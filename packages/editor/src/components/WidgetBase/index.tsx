import React from 'react'
import * as lodash from 'lodash-es'
import { WidgetBase as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const WidgetBase: DnFC<React.ComponentProps<typeof component>> =
  component

const props = {
  'field-group': ['name', 'x-display', 'x-reactions'],
}

const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {},
  },
  props,
}) as any

WidgetBase.Behavior = createBehavior({
  name: 'WidgetBase',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'WidgetBase',
  designerProps: {
    droppable: true,
    propsSchema,
  },
  designerLocales: lodash.merge(AllLocales.Card, {
    'zh-CN': {
      title: '基础容器',
      settings: {
        'x-component-props': {
          style: {},
        },
      },
    },
  }),
})

WidgetBase.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'WidgetBase',
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
