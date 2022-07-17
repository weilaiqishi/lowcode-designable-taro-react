import { ISchema } from '@formily/react'

export const CSSStyle: ISchema = {
  type: 'void',
  properties: {
    'style.position': {
      type: 'string',
      'x-decorator': 'FormItem',
      default: 'relative',
      'x-component': 'Select',
      enum: [
        { label: 'static', value: 'static' },
        { label: 'relative', value: 'relative' },
        { label: 'absolute', value: 'absolute' },
        { label: 'fixed', value: 'fixed' },
        { label: 'sticky', value: 'sticky' },
      ],
    },
    'style.top': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      default: '0px',
    },
    'style.left': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      default: '0px',
    },
    'style.right': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      default: '0px',
    },
    'style.bottom': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      default: '0px',
    },
    'style.width': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    'style.height': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    'style.display': {
      'x-component': 'DisplayStyleSetter',
    },
    'style.background': {
      'x-component': 'BackgroundStyleSetter',
    },
    'style.boxShadow': {
      'x-component': 'BoxShadowStyleSetter',
    },
    'style.font': {
      'x-component': 'FontStyleSetter',
    },
    'style.margin': {
      'x-component': 'BoxStyleSetter',
    },
    'style.padding': {
      'x-component': 'BoxStyleSetter',
    },
    'style.borderRadius': {
      'x-component': 'BorderRadiusStyleSetter',
    },
    'style.border': {
      'x-component': 'BorderStyleSetter',
    },
    'style.opacity': {
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
}
