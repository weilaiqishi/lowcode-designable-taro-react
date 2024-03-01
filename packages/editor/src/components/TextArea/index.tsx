import React from 'react'
import { TextArea as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'
import { iconimageDesignableConfig } from '../shared'

export const TextArea: DnFC<React.ComponentProps<typeof component>> = component

const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      placeholder: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      maxLength: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      rows: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      showCount: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      autoSize: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      }
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

TextArea.Behavior = createBehavior({
  name: 'TextArea',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'TextArea',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '文本域',
      settings: {
        'x-component-props': {
          placeholder: 'placeholder',
          maxLength: '限制最长输入字符，-1 表示无限制',
          rows: '行数（仅支持H5）',
          showCount: '是否展示输入字符。须配合maxLength使用',
          autoSize: '高度是否可拉伸'
        },
      },
    },
  },
})

TextArea.Resource = createResource({
  icon: 'InputSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'TextArea',
        'x-decorator': 'FormItem',
        'x-component': 'TextArea',
      },
    },
  ],
})
