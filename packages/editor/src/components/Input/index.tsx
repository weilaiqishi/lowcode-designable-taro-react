import React from 'react'
import { Input as component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'
import { iconimageDesignableConfig } from '../shared'

export const Input: DnFC<React.ComponentProps<typeof component>> = component

const { imgsProperties, imgsLocales } = iconimageDesignableConfig([
  {
    name: 'clearIcon',
    locale: '清除图标',
  },
])

const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['text', 'number', 'digit', 'idcard'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'text',
        },
      },
      placeholder: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      align: {
        type: 'string',
        enum: ['left', 'center', 'right'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'left',
        },
      },
      maxLength: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      clearable: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      confirmType: {
        type: 'string',
        enum: [
          {
            label: '发送',
            value: 'send',
          },
          {
            label: '搜索',
            value: 'search',
          },
          {
            label: '下一个',
            value: 'next',
          },
          {
            label: '前往',
            value: 'go',
          },
          {
            label: '完成',
            value: 'done',
          },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'done',
        },
      },
      password: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      ...imgsProperties,
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

Input.Behavior = createBehavior({
  name: 'Input',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Input',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '输入框',
      settings: {
        'x-component-props': {
          type: '输入框类型',
          placeholder: 'placeholder',
          align: '输入框内容对齐方式',
          maxLength: '限制最长输入字符',
          clearable: '展示清除Icon',
          confirmType: '键盘右下角按钮的文字(小程序)',
          password: '是否是密码',
          ...imgsLocales,
        },
      },
    },
  },
})

Input.Resource = createResource({
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
})
