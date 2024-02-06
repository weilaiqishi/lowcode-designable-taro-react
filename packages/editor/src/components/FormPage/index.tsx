import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import * as lodash from 'lodash-es'
import { FormPage as FormilyFormPage } from 'ui-nutui-react-taro'

import {
  createBehavior,
  createResource,
} from '@/designable/designable-core/src'
import { DnFC, usePrefix } from '@/designable/designable-react/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'

export const FormPage: DnFC<React.ComponentProps<typeof FormilyFormPage>> =
  observer((props) => {
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <FormilyFormPage {...props} form={form}>
        {props.children}
      </FormilyFormPage>
    )
  })

FormPage.Behavior = createBehavior({
  name: 'FormPage',
  selector: (node) => node.componentName === 'FormPage',
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
            properties: lodash.omit(AllSchemas.CSSStyle.properties as object, [
              'style.position',
              'style.top',
              'style.left',
              'style.right',
              'style.bottom',
            ]),
          },
        },
      },
      defaultProps: {
        initialValues: {},
        style: {},
      },
    }
  },
  designerLocales: lodash.merge(lodash.cloneDeep(AllLocales.Form), {
    'zh-CN': {
      title: '页面',
    },
  }),
})

FormPage.Resource = createResource({
  title: { 'zh-CN': '页面' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'FormPage',
      },
    },
  ],
})
