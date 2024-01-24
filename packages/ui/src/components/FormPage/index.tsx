import React, { createContext, useContext } from 'react'
import { Form as FormType, ObjectField } from '@formily/core'
import {
  ExpressionScope,
  FormProvider,
  JSXComponent,
  useParentForm,
} from '@formily/react'
import { View } from '@tarojs/components'

import { PreviewText } from '../PreviewText'

export interface IFormPageProps {
  form?: FormType
  component?: JSXComponent
  previewTextPlaceholder?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const FormPage: React.FC<React.PropsWithChildren<IFormPageProps>> = ({
  form,
  component,
  previewTextPlaceholder,
  className,
  style,
  children,
}) => {
  const top = useParentForm()
  const renderContent = (_form: FormType | ObjectField) => (
    <ExpressionScope value={{ $$form: _form }}>
      <PreviewText.Placeholder value={previewTextPlaceholder}>
        <View className={className} style={style}>
          {children}
        </View>
      </PreviewText.Placeholder>
    </ExpressionScope>
  )
  if (form)
    return <FormProvider form={form}>{renderContent(form)}</FormProvider>
  if (!top) throw new Error('must pass form instance by createForm')
  return renderContent(top)
}

export default FormPage
