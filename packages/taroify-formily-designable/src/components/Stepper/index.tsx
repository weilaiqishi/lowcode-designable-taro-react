import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Stepper as component } from 'taroify-formily/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Stepper: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      max: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker'
      },
      min: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        default: 1
      },
      step: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        default: 1
      },
      size: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker'
      },
      precision: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      shape: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: [
          {
            label: 'rounded',
            value: 'rounded'
          },
          {
            label: 'square',
            value: 'square'
          },
          {
            label: 'circular',
            value: 'circular'
          },
        ]
      },
      longPress: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

const customStyles = {
  customStylesTitle: {
    type: 'void',
    'x-decorator': 'FormItem',
  },
  StepperBorderRadius: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  StepperActiveBackgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  StepperInactiveBackgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  StepperDisabledOpacity: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  StepperTrackHeight: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  StepperTrackTransitionDuration: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
  },
  StepperThumbWidth: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  StepperThumbHeight: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  StepperThumbBorderRadius: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  StepperThumbBackgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  StepperThumbBoxShadow: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
}
const styleSchema =
  propsSchema.properties['component-style-group'].properties[
    'x-component-props.style'
  ].properties
Object.entries(customStyles).forEach(
  (values) => (styleSchema[`style.${values[0]}`] = values[1])
)

Stepper.Behavior = createBehavior({
  name: 'Stepper',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Stepper',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '步进器',
      settings: {
        'x-component-props': {
          max: '最大值',
          min: '最小值',
          step: '步长',
          size: '	按钮大小以及输入框高度',
          precision: '固定显示的小数位数',
          shape: '样式风格',
          longPress: '是否开启长按手势',
          style: {
            customStylesTitle: '主题定制',
            stepperActiveBackgroundColor: 'active-background-color',
            stepperBackgroundColor: 'background-color',
            stepperInputWidth: 'input-width',
            stepperInputHeight: 'input-height',
            stepperInputMargin: 'input-margin',
            stepperInputFontSize: 'input-font-size',
            stepperInputLineHeight: 'input-line-height',
            stepperInputColor: 'input-color',
            stepperInputBackgroundColor: 'input-background-color',
            stepperInputDisabledColor: 'input-disabled-color',
            stepperInputDisabledBackgroundColor: 'input-disabled-background-color',
            stepperButtonIconColor: 'button-icon-color',
            stepperButtonDisabledColor: 'button-disabled-color',
            stepperButtonDisabledBackgroundColor: 'button-disabled-background-color',
            stepperRoundedButtonBorderRadius: 'rounded-button-border-radius',
            stepperRoundedDecreaseButtonBorderRadius: 'rounded-decrease-button-border-radius',
            stepperRoundedIncreaseButtonBorderRadius: 'rounded-increase-button-border-radius',
            stepperCircularDecreaseButtonColor: 'circular-decrease-button-color',
            stepperCircularDecreaseButtonBackgroundColor: 'circular-decrease-button-background-color',
            stepperCircularDecreaseButtonBorderColor: 'circular-decrease-button-border-color',
            stepperCircularIncreaseButtonColor: 'circular-increase-button-color',
            stepperCircularIncreaseButtonBackgroundColor: 'circular-increase-button-background-color'
          }
        },
      },
    }
  },
})

Stepper.Resource = createResource({
  icon: 'NumberPickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'Stepper',
        'x-decorator': 'FormItem',
        'x-component': 'Stepper',
      },
    },
  ],
})
