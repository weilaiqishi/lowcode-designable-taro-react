import { ISchema } from '@formily/react'

export const Checkbox: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    max: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    direction: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        {
          label: '垂直',
          value: 'vertical'
        },
        {
          label: '水平',
          value: 'horizontal'
        }
      ],
      default: 'vertical'
    },
    size: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    shape: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        {
          label: '圆型',
          value: 'round'
        },
        {
          label: '正方形',
          value: 'square'
        }
      ],
      default: 'round'
    }
  },
}
