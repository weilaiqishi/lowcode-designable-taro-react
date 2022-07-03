import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'
import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Form, SchemaField, schemaTransitionPx } from 'taroify-formily/lib'

import { initFormily } from '@/utils/formily'

import './index.scss'

import jsonSchema from './jsonSchema.json'

initFormily()

export default () => {
  const form = useMemo(() => createForm(), [])
  async function submit() {
    try {
      const res = (await form.submit()) as any
      console.log('form res -> ', res)
    } catch (e) {
      console.log(`e`, e)
      if (!e?.length) return
      const temp = e[0]
    }
  }
  schemaTransitionPx(jsonSchema.schema)
  return (
    <View>
      <Form form={form} {...jsonSchema.form}>
        <SchemaField schema={jsonSchema.schema} />
      </Form>
      <Button onClick={submit} style={{marginTop: '1rem'}}>submit</Button>
    </View>
  )
}
