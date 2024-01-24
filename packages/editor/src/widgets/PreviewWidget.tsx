import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { transformToSchema } from '@pind/designable-formily-transformer'
import { FormPage, SchemaField } from 'ui-nutui-react-taro'

export interface IPreviewWidgetProps {
  tree: any
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const { form: formProps, schema } = transformToSchema(props.tree, {
    designableFormName: 'FormPage',
  })
  const form = useMemo(
    () =>
      createForm({
        initialValues: formProps.initialValues || {},
      }),
    []
  )
  return (
    <FormPage {...formProps} form={form}>
      <SchemaField schema={schema} />
    </FormPage>
  )
}
