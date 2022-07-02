import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { InputNumber as component } from 'formily-taro-ui/lib'
import lodash from 'lodash-es'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const InputNumber: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({ component: AllSchemas.Input,
  props: {
    'component-group': ['maxLength', 'placeholder'],
  }
}) as any

const AllLocalesInput = lodash.cloneDeep(AllLocales.Input)
AllLocalesInput['zh-CN'].title = '数字输入框'

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
    designerLocales: AllLocalesInput
  },
)

InputNumber.Resource = createResource(
  {
    icon: 'NumberPickerSource',
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
