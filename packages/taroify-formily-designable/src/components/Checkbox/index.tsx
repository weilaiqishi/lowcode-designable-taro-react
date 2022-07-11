import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Checkbox as component } from 'taroify-formily/lib'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'
import { ImageModeSelect } from '../Field/shared'

export const Checkbox: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: AllSchemas.Checkbox,
  props: {
    'component-events-group': [],
  },
}) as any

const customStyles = {
  checkboxFontSize: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  checkboxBorderColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  checkboxGap: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  checkboxLabelMargin: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  checkboxLabelColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  checkboxLabelLineHeight: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  checkboxDisabledLabelColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
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
      srcActive: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        default: 'https://img.yzcdn.cn/vant/user-active.png',
      },
      srcInactive: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        default: 'https://img.yzcdn.cn/vant/user-inactive.png',
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
}
const styleSchema =
  propsSchema.properties['component-style-group'].properties[
    'x-component-props.style'
  ].properties
Object.entries(customStyles).forEach(
  (values) => (styleSchema[`style.${values[0]}`] = values[1])
)

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
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        },
      ]
    },
  },
  designerLocales: AllLocales.CheckboxGroup,
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
