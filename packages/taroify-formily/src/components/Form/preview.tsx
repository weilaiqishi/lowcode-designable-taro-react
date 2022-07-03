import React, { createContext, useContext } from 'react'
import { Form as FormType, ObjectField } from '@formily/core'
import {
  ExpressionScope,
  FormProvider,
  JSXComponent,
  useParentForm,
} from '@formily/react'
import { Cell } from '@taroify/core'

import { PreviewText } from '../PreviewText'

export interface IFormLayoutProps {
  form?: FormType
  component?: JSXComponent
  previewTextPlaceholder?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Form: React.FC<React.PropsWithChildren<IFormLayoutProps>> = ({
  form,
  component,
  previewTextPlaceholder,
  className,
  style,
  children
}) => {
  const top = useParentForm()
  const renderContent = (_form: FormType | ObjectField) => (
    <ExpressionScope value={{ $$form: _form }}>
      <PreviewText.Placeholder value={previewTextPlaceholder}>
        <Cell.Group inset className={className} style={style}>
          {children}
        </Cell.Group>
      </PreviewText.Placeholder>
    </ExpressionScope>
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
