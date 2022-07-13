import { ISchema } from '@formily/react'

export const Rate: ISchema = {
  type: 'object',
  properties: {
    count: {
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
    }, 
    gutter: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    }, 
    allowHalf: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    touchable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    }
  },
}
