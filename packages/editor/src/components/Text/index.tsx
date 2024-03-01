import React from 'react'
import { Text as Component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field'

export const Text: DnFC<React.ComponentProps<typeof Component>> = (props) => {
  return <Component {...props} value="表单字段值"></Component>
}
const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {
      useValue: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      staticValue: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        default: '文本',
      },
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

Text.Behavior = createBehavior({
  name: 'Text',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Text',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '文本',
      settings: {
        'x-component-props': {
          useValue: '	使用表单字段值',
          staticValue: '静态值',
        },
      },
    },
  },
})

Text.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Text',
        'x-component': 'Text',
        'x-component-props': {
          style: {
            fontSize: '30px',
            lineHeight: '30px',
          },
        },
      },
    },
  ],
})
