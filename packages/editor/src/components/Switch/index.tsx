import React from 'react'
import { Switch as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Switch: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      activeText: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      inactiveText: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

Switch.Behavior = createBehavior({
  name: 'Switch',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Switch',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '开关',
      settings: {
        'x-component-props': {
          activeText: '打开时文字描述',
          inactiveText: '	关闭时文字描述'
        },
      },
    },
  },
})

Switch.Resource = createResource({
  icon: 'SwitchSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        title: 'Switch',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  ],
})
