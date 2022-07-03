import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Switch as component } from 'taro-ui-formily/lib'
import lodash from 'lodash-es'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Switch: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      color: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'ColorPicker',
      }
    },
  },
}) as any

Switch.Behavior = createBehavior({
  name: 'Switch',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Switch',
  designerProps: {
    propsSchema,
    defaultProps: {
      'x-component-props': {
        style: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
  designerLocales: {
    'zh-CN': {
      title: '开关',
      settings: {
        'x-component-props': {
          color: '背景颜色',
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
        type: 'string',
        title: 'Switch',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  ],
})
