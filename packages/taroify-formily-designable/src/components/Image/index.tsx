import React from 'react'
import { createBehavior, createResource } from '@pind/designable-core'
import { DnFC } from '@pind/designable-react'
import { Image as Component } from 'taroify-formily'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field'
import { ImageModeSelect } from '../shared'

export const Image: DnFC<React.ComponentProps<typeof Component>> = (props) => {
  return <Component {...props} value={`https://dummyimage.com/200x200/000/fff&text=field`}></Component>
}
const propsSchema = createVoidFieldSchema({
  component: {
    type: 'object',
    properties: {
      useValue: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch'
      },
      staticValue: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        default: `https://dummyimage.com/200x200/000/fff&text=static`
      },
      ...ImageModeSelect.properties
    },
  },
  props: {
    'component-events-group': [],
  },
}) as any

const customStyles = {}
const styleSchema =
  propsSchema.properties['component-style-group'].properties[
    'x-component-props.style'
  ].properties
Object.entries(customStyles).forEach(
  (values) => (styleSchema[`style.${values[0]}`] = values[1])
)

Image.Behavior = createBehavior({
  name: 'Image',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Image',
  designerProps: {
    propsSchema,
    defaultProps: {
    },
  },
  designerLocales: {
    'zh-CN': {
      title: '图片',
      settings: {
        'x-component-props': {
          useValue: '	使用表单字段值',
          staticValue: '静态值',
          ...ImageModeSelect.locales
        },
      },
    },
  },
})

Image.Resource = createResource({
  icon: 'UploadSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Image',
        'x-component': 'Image',
        'x-component-props': {
          style: {
            width: '200px',
            height: '200px'
          },
        }
      },
    },
  ],
})
