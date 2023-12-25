import React, { useMemo } from 'react'
import { transformToSchema } from '@pind/designable-formily-transformer'
import { createForm } from '@formily/core'
import { Form, SchemaField } from 'taroify-formily'

export interface IPreviewWidgetProps {
  tree: any
}

console.log(SchemaField)

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const { form: formProps, schema } = transformToSchema(props.tree)
  const form = useMemo(() => createForm({
    initialValues: formProps.initialValues || {}
  }), [])
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  )
}
