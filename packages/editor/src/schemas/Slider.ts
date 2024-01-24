import { ISchema } from '@formily/react'

export const Slider: ISchema = {
  type: 'object',
  properties: {
    max: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      default: 100
    },
    min: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      default: 0
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
      'x-component': 'NumberPicker',
      default: 2
    },
    range: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    orientation: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        {
          label: '水平',
          value: 'horizontal'
        },
        {
          label: '垂直',
          value: 'vertical'
        },
      ]
    },
  },
}
