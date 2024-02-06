import React, { createContext, useContext } from 'react'
import { Form as FormType, ObjectField } from '@formily/core'
import {
  ExpressionScope,
  FormProvider,
  JSXComponent,
  observer,
  useParentForm,
} from '@formily/react'
import { Cell } from '@nutui/nutui-react-taro'
import classNames from 'classnames'
import { typePropsBase } from '../type'
import { PreviewText } from '../PreviewText'

import './form.scss'

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

type typeProps = typePropsBase & IFormLayoutProps

export const Form = ({
  form,
  previewTextPlaceholder,
  className,
  style,
  children,
  divider,
  labelPosition,
  ...props
}: typeProps) => {
  console.log({
    form,
    previewTextPlaceholder,
    className,
    style,
    children,
    divider,
    labelPosition,
  })
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
          {...props}
        >
          <Cell.Group divider={divider} style={{ margin: '0' }} className='formCellGroup'>{children}</Cell.Group>
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
