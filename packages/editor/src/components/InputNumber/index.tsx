import React from 'react'
import { InputNumber as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const InputNumber: DnFC<React.ComponentProps<typeof component>> = component

const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      allowEmpty: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultValue: false,
        },
      },
      min: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      max: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      type: {
        type: 'string',
        enum: ['number', 'digit'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'number',
        },
      },
      step: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      digits: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          stringMode: true
        }
      },
      formatter: {
        'x-decorator': 'FormItem',
        'x-component': 'ValueInput',
        'x-component-props': {
          include: ['EXPRESSION'],
        },
      },
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

InputNumber.Behavior = createBehavior({
  name: 'InputNumber',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'InputNumber',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '数字输入框',
      settings: {
        'x-component-props': {
          allowEmpty: '是否允许内容为空',
          min: '最小值',
          max: '最大值',
          type: 'input的类型',
          step: '步长',
          digits: '设置保留的小数位',
          formatter: {
            title: '格式转换器',
            tooltip: '格式：function(value: number | string): string',
          },
        },
      },
    },
  },
})

InputNumber.Resource = createResource({
  icon: 'NumberPickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'InputNumber',
        'x-decorator': 'FormItem',
        'x-component': 'InputNumber',
      },
    },
  ],
})
