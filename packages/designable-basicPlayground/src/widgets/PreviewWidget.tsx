import React, { useMemo } from 'react'
import { transformToSchema } from '@designable/formily-transformer'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import { Form, FormItem, Input, InputNumber, Rate, WidgetBase } from 'formily-taro-ui/lib'

const SchemaField = createSchemaField({
  components: {
    Form,
    FormItem,
    Input,
    InputNumber,
    Rate,
    WidgetBase
  },
})

export interface IPreviewWidgetProps {
  tree: any
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), [])
  const { form: formProps, schema } = transformToSchema(props.tree)
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  )
}
