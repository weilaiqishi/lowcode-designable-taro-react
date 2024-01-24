import React from 'react'
import { createBehavior, createResource } from '@pind/designable-core'
import { Button as component } from 'ui-nutui-react-taro'

import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field'
import {
  iconimageDesignableConfig,
  IconSelect,
  imageDesignableConfig,
} from '../shared'

export const Button: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {
      children: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        default: '按钮',
      },
      color: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'ColorInput',
      },
      shape: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'square',
            value: 'square',
          },
          {
            label: 'round',
            value: 'round',
          },
        ],
        default: 'round',
      },
      type: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'success',
            value: 'success',
          },
          {
            label: 'warning',
            value: 'warning',
          },
          {
            label: 'danger',
            value: 'danger',
          },
          {
            label: 'info',
            value: 'info',
          },
        ],
        default: 'default',
      },
      size: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'normal',
            value: 'normal',
          },
          {
            label: 'large',
            value: 'large',
          },
          {
            label: 'small',
            value: 'small',
          },
          {
            label: 'mini',
            value: 'mini',
          },
        ],
        default: 'normal',
      },
      fill: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'none',
            value: 'none',
          },
          {
            label: 'solid',
            value: 'solid',
          },
          {
            label: 'outline',
            value: 'outline',
          },
          {
            label: 'dashed',
            value: 'dashed',
          },
        ],
        default: 'solid',
      },
      block: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      // icon: iconimageDesignableConfig(),
    },
  },
  props: {
    'component-events-group': ['click'],
  },
}) as any

Button.Behavior = createBehavior({
  name: 'Button',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Button',
  designerProps: {
    propsSchema,
    defaultProps: {
      'x-component-props': {
        style: {
          width: '',
          height: '',
        },
      },
    },
  },
  designerLocales: {
    'zh-CN': {
      title: '按钮',
      settings: {
        'x-component-props': {
          children: '文本',
          variant: '按钮变种',
          color: '按钮颜色',
          size: '尺寸',
          shape: '按钮形状',
          block: '是否为块级元素',
          hairline: '是否使用 0.5px 边框',
        },
      },
    },
  },
})

Button.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        title: 'Button',
        'x-component': 'Button',
      },
    },
  ],
})