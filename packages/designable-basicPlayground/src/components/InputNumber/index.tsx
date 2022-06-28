import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { InputNumber as component } from 'formily-taro-ui/lib'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const InputNumber: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({ component: AllSchemas.Input,
  props: {
    'component-group': ['maxLength', 'placeholder'],
  }
}) as any

InputNumber.Behavior = createBehavior(
  {
    name: 'InputNumber',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'InputNumber',
    designerProps: {
      propsSchema,
      defaultProps: {
      },
    },
    designerLocales: AllLocales.Input
  },
)

InputNumber.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'InputNumber',
          'x-decorator': 'FormItem',
          'x-component': 'InputNumber',
        },
      },
    ],
  },
)
