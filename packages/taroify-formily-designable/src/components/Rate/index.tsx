import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Rate as component } from 'taroify-formily/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Rate: DnFC<React.ComponentProps<typeof component>> = component
const propsSchema = createFieldSchema({
  component: AllSchemas.Rate,
  props: {
    'component-events-group': [],
  },
}) as any

const customStyles = {
  rateIconSize: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  rateIconGutter: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
  },
  rateIconEmptyColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  rateIconFullColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
  rateIconDisabledColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput',
  },
}
const styleSchema =
  propsSchema.properties['component-style-group'].properties[
    'x-component-props.style'
  ].properties
Object.entries(customStyles).forEach(
  (values) => (styleSchema[`style.${values[0]}`] = values[1])
)

Rate.Behavior = createBehavior({
  name: 'Rate',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Rate',
  designerProps: {
    propsSchema,
    defaultProps: {},
  },
  designerLocales: AllLocales.Rate,
})

Rate.Resource = createResource({
  icon: 'RateSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'Rate',
        'x-decorator': 'FormItem',
        'x-component': 'Rate',
      },
    },
  ],
})
