import React, { useMemo } from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC, usePrefix } from '@designable/react'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import * as lodash from 'lodash-es'
import { Form as FormilyForm } from 'taroify-formily/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'

export const Form: DnFC<React.ComponentProps<typeof FormilyForm>> = observer(
  (props) => {
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <FormilyForm
        {...props}
        form={form}
      >
        {props.children}
      </FormilyForm>
    )
  }
)

Form.Behavior = createBehavior({
  name: 'Form',
  selector: (node) => node.componentName === 'Form',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: 'object',
        properties: {
          // ...(lodash.pick(AllSchemas.FormLayout.properties) as object),
          style: {
            type: 'void',
            properties: lodash.omit(AllSchemas.CSSStyle.properties as object, ['style.position', 'style.top', 'style.left', 'style.right', 'style.bottom'])
          },
        },
      },
      defaultProps: {
        initialValues: {}
      },
    }
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
        type: 'object',
        'x-component': 'Form'
      },
    },
  ],
})
