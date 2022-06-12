import React, { useMemo } from 'react'
import {
  createForm,
  registerValidateLocale,
  registerValidateRules,
  setValidateLanguage,
} from '@formily/core'
import { createSchemaField, Field, FormProvider } from '@formily/react'
import { Button, Input as TaroInput,View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Input } from 'formily-taro-ui/lib'
import { AtInput } from 'taro-ui'

import './index.scss'

export default () => {
  const form = useMemo(() => createForm(), [])
  async function submit() {
    try {
      const res = (await form.submit()) as any
      const { formData } = res
      console.log('res formData', res, formData)
    } catch (e) {
      console.log(`e`, e)
      if (!e?.length) return
      const temp = e[0]
    }
  }
  return (
    <View>
      <FormProvider form={form}>
        {/* schema 要用 transitionPx 转换一遍 */}
        {/* <SchemaField schema={props.schema} /> */}
        <Field
          required
          name='abc'
          component={[Input, { border: true }]}
        ></Field>
        <Field
          required
          name='abcD'
          component={[AtInput]}
        ></Field>
        <Button onClick={submit}>submit</Button>
      </FormProvider>
    </View>
  )
}
