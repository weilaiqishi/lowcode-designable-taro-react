import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Button as component } from 'taroify-formily/lib'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field'
import { IconSelect, ImageModeSelect } from '../shared'

export const Button: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {
      children: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      variant: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'contained',
            value: 'contained',
          },
          {
            label: 'text',
            value: 'text',
          },
          {
            label: 'outlined',
            value: 'outlined',
          },
        ],
        default: 'contained',
      },
      color: {
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
        ],
        default: 'default',
      },
      size: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'medium',
            value: 'medium',
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
        default: 'medium',
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
            label: 'circle',
            value: 'circle',
          },
          {
            label: 'round',
            value: 'round',
          },
        ],
        default: 'square',
      },
      block: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      hairline: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      customIcon: {
        type: 'object',
        'x-component': 'DrawerSetter',
        properties: {
          useIcon: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
          icon: IconSelect,
          inline: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [
              {
                label: 'none',
                value: 'none',
              },
              {
                label: 'left',
                value: 'left',
              },
              {
                label: 'right',
                value: 'right',
              },
            ],
          },
          src: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            default: 'https://img.yzcdn.cn/vant/user-active.png',
          },
          width: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'SizeInput',
            default: '25px',
          },
          height: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'SizeInput',
            default: '20px',
          },
          ...ImageModeSelect.properties,
        },
      },
    },
  },
  props: {
    'component-events-group': ['click'],
  },
}) as any

const customStyles = {}
const styleSchema =
  propsSchema.properties['component-style-group'].properties[
    'x-component-props.style'
  ].properties
Object.entries(customStyles).forEach(
  (values) => (styleSchema[`style.${values[0]}`] = values[1])
)

Button.Behavior = createBehavior({
  name: 'Button',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Button',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '??????',
      settings: {
        'x-component-props': {
          children: '??????',
          variant: '????????????',
          color: '????????????',
          size: '??????',
          shape: '????????????',
          block: '?????????????????????',
          hairline: '???????????? 0.5px ??????',
          customIcon: {
            title: '???????????????',
            useIcon: '?????????????????????',
            icon: '????????????',
            inline: '????????????',
            src: '????????????(??????)',
            width: '????????????',
            height: '????????????',
            ...ImageModeSelect.locales,
          },
          style: {},
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
        'x-decorator': 'FormItem',
        'x-component': 'Button',
      },
    },
  ],
})
