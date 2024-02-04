import React from 'react'
import { Button as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field'
import {
  iconimageDesignableConfig,
} from '../shared'

export const Button: DnFC<React.ComponentProps<typeof component>> = component

const { imgsProperties, imgsLocales } = iconimageDesignableConfig([
  {
    name: 'leftIcon',
    locale: '左侧图标',
  },
  {
    name: 'rightIcon',
    locale: '右侧图标',
  },
])
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
        default: 'primary',
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
        default: 'large',
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
            label: '默认',
            value: '',
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
        default: '',
      },
      block: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      ...imgsProperties,
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
    }
  },
  designerLocales: {
    'zh-CN': {
      title: '按钮',
      settings: {
        'x-component-props': {
          children: '文本',
          color: '按钮颜色',
          shape: '按钮形状',
          type: '按钮样式',
          size: '尺寸',
          fill: '填充模式',
          block: '是否为块级元素',
          ...imgsLocales,
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
