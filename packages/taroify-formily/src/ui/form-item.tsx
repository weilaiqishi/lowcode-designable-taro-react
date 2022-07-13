// fork for supporting designable props

import * as React from 'react'
import {
  Children,
  cloneElement,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
} from 'react'
import { CellBase, CellProps, CellValue } from '@taroify/core/cell'
import Form, { useFormField, useFormValue } from '@taroify/core/form'
import FormContext from '@taroify/core/form/form.context'
import { validateRules } from '@taroify/core/form/form.rule'
import {
  FormItemInstance,
  FormRule,
  FormValidateTrigger,
} from '@taroify/core/form/form.shared'
import FormFeedback from '@taroify/core/form/form-feedback'
import FormItemContext from '@taroify/core/form/form-item.context'
import useFormError from '@taroify/core/form/use-form-error'
import useFormFieldValueEffect from '@taroify/core/form/use-form-field-value-effect'
import { prefixClassname } from '@taroify/core/styles'
import { fulfillPromise } from '@taroify/core/utils/promisify'
import { useToRef } from '@taroify/core/utils/state'
import { isElementOf } from '@taroify/core/utils/validate'
import { cloneIconElement } from '@taroify/icons/utils'
import { View } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import classNames from 'classnames'
import * as _ from 'lodash'

import { pickDataProps } from '../components/__builtins__'

interface FormItemChildren {
  label?: ReactElement
  control?: ReactElement
  feedbacks?: ReactElement[]
}

function useFormItemChildren(children?: ReactNode): FormItemChildren {
  return useMemo<FormItemChildren>(() => {
    const __children__: FormItemChildren = {
      feedbacks: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return
      }

      const element = child as ReactElement
      const { type: elementType } = element as ReactElement<InputProps>
      if (isElementOf(element, Form.Label)) {
        __children__.label = element
      } else if (elementType === Form.Control) {
        __children__.control = element
      } else if (isElementOf(element, Form.Feedback)) {
        __children__.feedbacks?.push(element)
      }
    })
    return __children__
  }, [children])
}

export interface FormItemProps extends CellProps {
  name?: string
  defaultValue?: any
  required?: boolean

  rules?: FormRule[]

  children?: ReactNode
}

const FormItem = forwardRef<FormItemInstance, FormItemProps>(
  (props: FormItemProps, ref: ForwardedRef<FormItemInstance>) => {
    const {
      className,
      style,
      name,
      defaultValue,
      align,
      bordered,
      icon,
      rightIcon,
      clickable,
      required,
      children: childrenProp,
      rules: rulesProp,
      onClick,
      ..._props
    } = props

    const { label, control, feedbacks } = useFormItemChildren(childrenProp)

    const rulesRef = useToRef(rulesProp)

    const { validateTrigger } = useContext(FormContext)

    const { validateStatus, error, setError, resetError } = useFormError(name)

    const { value, getValue, setValue } = useFormValue(name, { defaultValue })

    const validate = useCallback(
      (rules = rulesRef.current) => {
        return new Promise<void>((resolve, reject) => {
          if (rules) {
            resetError()
            validateRules(getValue(), rules) //
              .then((errors) => {
                if (_.isEmpty(errors)) {
                  resetError()
                  resolve()
                } else {
                  setError({ errors })
                  reject({
                    name,
                    errors,
                  })
                }
              })
          } else {
            resolve()
          }
        })
      },
      [getValue, name, resetError, rulesRef, setError]
    )

    const validateWithTrigger = useCallback(
      (trigger: FormValidateTrigger) => {
        if (validateTrigger && rulesProp) {
          const defaultTrigger = validateTrigger === trigger
          const rules = rulesProp.filter((rule) => {
            if (rule.trigger) {
              return rule.trigger === trigger
            }

            return defaultTrigger
          })

          if (rules.length) {
            fulfillPromise(validate(rulesProp))
          } else if (defaultTrigger) {
            resetError()
          }
        }
      },
      [resetError, rulesProp, validate, validateTrigger]
    )

    const instance = useMemo<FormItemInstance>(
      () => ({
        name,
        validate,
        getValue,
        setValue,
      }),
      [getValue, name, setValue, validate]
    )

    useImperativeHandle(ref, () => instance, [instance])

    useFormField(name, instance)

    useFormFieldValueEffect(() => validateWithTrigger('onChange'), [value])

    const explain = useMemo(
      () => !_.isEmpty(feedbacks) || !_.isEmpty(error?.errors),
      //
      [error?.errors, feedbacks]
    )

    const Control = useMemo(
      () =>
        control &&
        cloneElement(control, {
          name,
          value,
          onBlur: () => validateWithTrigger('onBlur'),
          onChange: setValue,
        }),
      [control, name, setValue, validateWithTrigger, value]
    )

    return (
      <FormItemContext.Provider
        value={{
          validateStatus,
        }}
      >
        <CellBase
          {...pickDataProps(_props)}
          className={classNames(prefixClassname('form-item'), className)}
          style={style}
          bordered={bordered}
          align={align}
          clickable={clickable}
          icon={cloneIconElement(icon, {
            className: prefixClassname('form-item__icon'),
          })}
          rightIcon={cloneIconElement(rightIcon, {
            className: prefixClassname('form-item__right-icon'),
          })}
          required={required}
          onClick={onClick}
        >
          {label}
          <CellValue alone={false}>
            {Control}
            {explain && (
              <View className={classNames(prefixClassname('form__feedbacks'))}>
                {feedbacks}
                {_.map(error?.errors, (message, messageKey) => (
                  <FormFeedback
                    key={messageKey}
                    status='invalid'
                    // eslint-disable-next-line react/no-children-prop
                    children={message}
                  />
                ))}
              </View>
            )}
          </CellValue>
        </CellBase>
      </FormItemContext.Provider>
    )
  }
)

export default FormItem as ForwardRefExoticComponent<FormItemProps>
