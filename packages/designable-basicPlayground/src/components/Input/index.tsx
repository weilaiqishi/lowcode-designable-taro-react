import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC , useTreeNode } from '@designable/react'
import { observer } from '@formily/react'
import { Input as component } from 'formily-taro-ui/lib'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Input: DnFC<React.ComponentProps<typeof component>> = component
const schema = {
  type: 'object',
  properties: {
    maxLength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      default: '请输入内容'
    },
  },
}
const propsSchema = createFieldSchema({ component: schema }) as any

Input.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema,
      defaultProps: {
      },
    },
    designerLocales: {
      'zh-CN': {
        title: '输入框',
        settings: {
          'x-component-props': {
            maxLength: '最大长度',
          },
        },
      },
    },
  },
)

Input.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'Input',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    ],
  },
)
