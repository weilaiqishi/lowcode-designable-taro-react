import React, { createContext, useContext } from 'react'
import { Form as FormType, ObjectField } from '@formily/core'
import {
  ExpressionScope,
  FormProvider,
  JSXComponent,
  useParentForm,
} from '@formily/react'
import { Cell } from '@nutui/nutui-react-taro'
import classNames from 'classnames'

import { PreviewText } from '../PreviewText'

export interface IFormLayoutProps {
  form?: FormType
  component?: JSXComponent
  previewTextPlaceholder?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  divider: boolean // 是否有分割线
  labelPosition: 'top' | 'left' | 'right'
}

const PositionInfo: any = {
  top: 'form-layout-top',
  left: 'form-layout-left',
  right: 'form-layout-right',
}

export const Form: React.FC<React.PropsWithChildren<IFormLayoutProps>> = ({
  form,
  previewTextPlaceholder,
  className,
  style,
  children,
  divider,
  labelPosition,
}) => {
  const classPrefix = 'nut-form'
  const top = useParentForm()
  const renderContent = (_form: FormType | ObjectField) => (
    <ExpressionScope value={{ $$form: _form }}>
      <PreviewText.Placeholder value={previewTextPlaceholder}>
        <form
          className={classNames(
            classPrefix,
            PositionInfo[labelPosition],
            className
          )}
          style={style}
          action=''
          onSubmit={() => {}}
        >
          <Cell.Group divider={divider}>{children}</Cell.Group>
        </form>
      </PreviewText.Placeholder>
    </ExpressionScope>
  )
  if (form)
    return <FormProvider form={form}>{renderContent(form)}</FormProvider>
  if (!top) throw new Error('must pass form instance by createForm')
  return renderContent(top)
}

export default Form
