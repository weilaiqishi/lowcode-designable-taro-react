import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import * as lodash from 'lodash-es'
import { Form as Component } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import {
  DnFC,
  DroppableWidget,
  useTreeNode,
} from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field/shared'

export const Form: DnFC<React.ComponentProps<typeof Component>> = (props) => {
  const node = useTreeNode()
  if (node.children.length === 0) return <DroppableWidget />
  return <Component {...props}></Component>
}

Form.Behavior = createBehavior({
  name: 'Form',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Form',
  designerProps: {
    droppable: true,
    propsSchema: {
      type: 'void',
      properties: {
        style: {
          type: 'void',
          properties: lodash.omit(AllSchemas.CSSStyle.properties, [
            'style.position',
            'style.top',
            'style.left',
            'style.right',
            'style.bottom',
          ]) as any,
        },
      },
    },
  },

  designerLocales: AllLocales.Form,
})

Form.Resource = createResource({
  title: { 'zh-CN': '表单' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Form',
        'x-component-props': {
          style: {
          },
        },
      },
    },
  ],
})
