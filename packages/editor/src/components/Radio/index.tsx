import React from 'react'
import { Radio as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'
import { iconimageDesignableConfig } from '../shared'


export const Radio: DnFC<React.ComponentProps<typeof component>> = component

const { imgsProperties, imgsLocales } = iconimageDesignableConfig([
  {
    name: 'noActiveIcon',
    locale: '选中前图标',
  },
  {
    name: 'activeIcon',
    locale: '选中后图标',
  }
])

const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      'RadioGroupProps-group': {
        type: 'void',
        'x-component': 'DrawerSetter',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          labelStyle: {
            display: 'none',
          },
        },
        properties: {
          'RadioGroupProps': {
            type: 'object',
            'x-component': 'CollapseItem',
            properties: {
              labelPosition: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                enum: [
                  {
                    label: 'left',
                    value: 'left',
                  },
                  {
                    label: 'right',
                    value: 'right',
                  },
                ],
                default: 'right',
              },
              direction: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                enum: [
                  {
                    label: '垂直',
                    value: 'vertical',
                  },
                  {
                    label: '水平',
                    value: 'horizontal',
                  },
                ],
                default: 'vertical',
              },
            },
            'x-component-props': {
              title: 'Checkbox.Group属性',
              defaultExpand: true,
            },
          },
        },
      },
      shape: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'button',
            value: 'button',
          },
          {
            label: 'round',
            value: 'round',
          },
        ],
        default: 'round',
      },
      ...imgsProperties,
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

Radio.Behavior = createBehavior({
  name: 'Radio',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Radio',
  designerProps: {
    propsSchema,
    defaultProps: {
      enum: [
        {
          label: '选项1',
          value: '1',
          disabled: true,
        },
        {
          label: '选项2',
          value: '2',
          disabled: false,
        },
      ],
    },
  },
  designerLocales: {
    'zh-CN': {
      title: '单选框组',
      settings: {
        'x-component-props': {
          'RadioGroupProps-group': 'Radio.Group属性',
          'RadioGroupProps': {
            labelPosition: '文本所在的位置',
            direction: '排列方向',
          },
          shape: '形状',
          ...imgsLocales,
        },
      },
    },
  },
})

Radio.Resource = createResource({
  icon: 'RadioGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Radio',
        'x-decorator': 'FormItem',
        'x-component': 'Radio',
      },
    },
  ],
})
