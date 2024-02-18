import React from 'react'
import { Checkbox as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'
import { iconimageDesignableConfig } from '../shared'

export const Checkbox: DnFC<React.ComponentProps<typeof component>> = component

const { imgsProperties, imgsLocales } = iconimageDesignableConfig([
  {
    name: 'noActiveIcon',
    locale: '选中前图标',
  },
  {
    name: 'activeIcon',
    locale: '选中后图标',
  },
  {
    name: 'indeterminateIcon',
    locale: '半选状态图标',
  },
])

const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      'CheckboxGroupProps-group': {
        type: 'void',
        'x-component': 'DrawerSetter',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          labelStyle: {
            display: 'none',
          },
        },
        properties: {
          'CheckboxGroupProps': {
            type: 'object',
            'x-component': 'CollapseItem',
            properties: {
              max: {
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
              min: {
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
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

Checkbox.Behavior = createBehavior({
  name: 'Checkbox',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Checkbox',
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
      title: '复选按钮',
      settings: {
        'x-component-props': {
          'CheckboxGroupProps-group': 'Checkbox.Group属性',
          'CheckboxGroupProps': {
            max: '限制最大可选数',
            min: '限制至少选择数',
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

Checkbox.Resource = createResource({
  icon: 'CheckboxGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Checkbox',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox',
      },
    },
  ],
})
