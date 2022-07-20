import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Switch as component } from 'taroify-formily/lib'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Switch: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: {
    type: 'object',
    properties: {
      size: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      loading: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch'
      }
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
  switchSize: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchFontSize: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchWidth: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchHeight: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchBorder: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchBackgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  switchTransitionDuration: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
  },
  switchNodeSize: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchNodeWidth: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchNodeHeight: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  switchNodeTranslateX: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  switchNodeBackgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  switchNodeBoxShadow: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  switchCheckedColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  switchCheckedBackgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  switchLoadingColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  switchDisabledOpacity: {
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

Switch.Behavior = createBehavior({
  name: 'Switch',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Switch',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: {
    'zh-CN': {
      title: '开关',
      settings: {
        'x-component-props': {
          size: '	开关尺寸',
          loading: '是否为加载状态(请使用响应器)',
          style: {
            customStylesTitle: '主题定制',
            switchSize: 'size',
            switchFontSize: 'font-size',
            switchWidth: 'width',
            switchHeight: 'height',
            switchBorder: 'border',
            switchBackgroundColor: 'background-color',
            switchTransitionDuration: 'transition-duration',
            switchNodeSize: 'node-size',
            switchNodeWidth: 'node-width',
            switchNodeHeight: 'node-height',
            switchNodeTranslateX: 'node-translate-x',
            switchNodeBackgroundColor: 'node-background-color',
            switchNodeBoxShadow: 'node-box-shadow',
            switchCheckedColor: 'checked-color',
            switchCheckedBackgroundColor: 'checked-background-color',
            switchLoadingColor: 'loading-color',
            switchDisabledOpacity: 'disabled-opacity',
          }
        },
      },
    }
  },
})

Switch.Resource = createResource({
  icon: 'SwitchSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        title: 'Switch',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  ],
})
