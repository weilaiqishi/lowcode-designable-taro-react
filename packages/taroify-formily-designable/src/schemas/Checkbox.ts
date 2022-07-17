import { ISchema } from '@formily/react'

import { ImageModeSelect } from '../components/shared'

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
  },
}
