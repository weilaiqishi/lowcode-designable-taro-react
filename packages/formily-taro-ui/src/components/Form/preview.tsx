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

export interface IFormLayoutProps {
  form?: FormType
  component?: JSXComponent
  previewTextPlaceholder?: React.ReactNode
  className?: string
  style?: React.CSSProperties

  bordered?: boolean
  labelAlign?: 'right' | 'left'
  labelCol?: number
  labelWidth?: number
  labelWrap?: boolean
  layout?: 'vertical' | 'horizontal' | 'inline'
  wrapperAlign?: 'right' | 'left',
  wrapperCol?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
}

export type IFormLayoutContext = Pick<
  IFormLayoutProps,
  'labelAlign' | 'wrapperAlign' | 'layout' | 'labelWrap' | 'labelWidth' | 'wrapperWidth' | 'wrapperWrap' | 'labelCol' | 'wrapperCol' | 'bordered'
>

export const FormLayoutContext = createContext<IFormLayoutContext | null>(null)
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
