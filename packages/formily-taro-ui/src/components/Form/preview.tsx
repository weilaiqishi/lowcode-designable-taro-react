import React, { createContext, useContext } from 'react'
import { Form as FormType, ObjectField } from '@formily/core'
import {
  ExpressionScope,
  FormProvider,
  JSXComponent,
  useParentForm,
} from '@formily/react'
import { View as TaroView } from '@tarojs/components'

import { PreviewText } from '../PreviewText'

const View: any = TaroView

export interface FormLayoutProps {
  bordered?: boolean
  labelAlign?: 'right' | 'left'
  labelCol?: number
  labelWidth?: number | string
  layout?: 'vertical' | 'horizontal' | 'inline'
  wrapperAlign?: 'right' | 'left',
  wrapperCol?: number
  wrapperWidth?: number | string
}

export interface IFormLayoutProps extends FormLayoutProps {
  form?: FormType
  component?: JSXComponent
  previewTextPlaceholder?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const FormLayoutPath= ['bordered', 'labelAlign', 'labelCol', 'labelWidth', 'layout', 'wrapperAlign', 'wrapperCol', 'wrapperWidth']

export const FormLayoutContext = createContext<FormLayoutProps | null>(null)
export const useFormLayoutContext = () => useContext(FormLayoutContext)
export const Form: React.FC<React.PropsWithChildren<IFormLayoutProps>> = ({
  className,
  style,
  form,
  component,
  previewTextPlaceholder,
  children,
  ...props
}) => {
  const top = useParentForm()
  const renderContent = (_form: FormType | ObjectField) => (
    <FormLayoutContext.Provider value={props}>
      <ExpressionScope value={{ $$form: _form }}>
        <PreviewText.Placeholder value={previewTextPlaceholder}>
          <View className={className} style={style} >
            {children}
          </View>
        </PreviewText.Placeholder>
      </ExpressionScope>
    </FormLayoutContext.Provider>
  )
  if (form)
    return <FormProvider form={form}>{renderContent(form)}</FormProvider>
  if (!top) throw new Error('must pass form instance by createForm')
  return renderContent(top)
}

Form.defaultProps = {
  component: 'form',
}

export default Form
