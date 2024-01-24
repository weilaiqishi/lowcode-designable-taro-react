import React from 'react'
import { createBehavior, createResource } from '@pind/designable-core'
import { Radio as component } from 'ui-nutui-react-taro'

import { DnFC } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Radio: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: AllSchemas.Radio,
  props: {
    'component-events-group': [],
  },
}) as any

const customStyles = {
  customStylesTitle: {
    type: 'void',
    'x-decorator': 'FormItem',
  },
  radioFontSize: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  radioBorderColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  radioGap: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  radioLabelMargin: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  radioLabelColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  radioLabelLineHeight: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  radioDisabledLabelColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  radioIconFontSize: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  radioCheckedIconColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  radioCheckedIconBorderColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  radioCheckedIconBackgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  radioDisabledIconColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  radioDisabledIconBorderColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
}
const styleSchema =
  propsSchema.properties['component-style-group'].properties[
    'x-component-props.style'
  ].properties
Object.entries(customStyles).forEach(
  (values) => (styleSchema[`style.${values[0]}`] = values[1])
)

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
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  designerLocales: AllLocales.RadioGroup,
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
