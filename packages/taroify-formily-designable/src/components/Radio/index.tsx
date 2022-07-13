import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Radio as component } from 'taroify-formily/lib'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'
import { ImageModeSelect } from '../Field/shared'

export const Radio: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: AllSchemas.Radio,
  props: {
    'component-events-group': [],
  },
}) as any

const customStyles = {
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
  }
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
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        },
      ]
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
