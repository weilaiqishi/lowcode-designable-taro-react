import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Rate as component } from 'formily-taro-ui/lib'
import lodash from 'lodash-es'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Rate: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      max: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          defaultValue: 5,
        },
      },
      size: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          defaultValue: 20,
        },
      },
      margin: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          defaultValue: 5,
        },
      },
    },
  },
}) as any

Rate.Behavior = createBehavior({
  name: 'Rate',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Rate',
  designerProps: {
    propsSchema,
    defaultProps: {
      'x-component-props': {
        style: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
  designerLocales: {
    'zh-CN': {
      title: '评分器',
      settings: {
        'x-component-props': {
          max: '最大评分',
          size: '评分星星大小',
          margin: '星星间隔',
        },
      },
    },
  },
})

Rate.Resource = createResource({
  icon: 'RateSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Rate',
        'x-decorator': 'FormItem',
        'x-component': 'Rate',
      },
    },
  ],
})
