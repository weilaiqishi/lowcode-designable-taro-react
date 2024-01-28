import { observer, ReactFC } from '@formily/reactive-react'
import { requestIdle } from '@pind/designable-shared'
import cls from 'classnames'
import React, { useEffect, useState } from 'react'
import { usePrefix, useWorkbench } from '../hooks'
import { IconWidget, TextWidget } from '../widgets'
export interface ISettingPanelProps {
  title?: React.ReactNode
  extra?: React.ReactNode
}

export const SettingsPanel: ReactFC<ISettingPanelProps> = observer((props) => {
  const prefix = usePrefix('settings-panel')
  const workbench = useWorkbench()
  const [innerVisible, setInnerVisible] = useState(true)
  const [pinning, setPinning] = useState(false)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (visible || workbench.type === 'DESIGNABLE') {
      if (!innerVisible) {
        requestIdle(() => {
          requestAnimationFrame(() => {
            setInnerVisible(true)
          })
        })
      }
    }
  }, [visible, workbench.type])
  if (workbench.type !== 'DESIGNABLE') {
    if (innerVisible) setInnerVisible(false)
    return null
  }
  if (!visible) {
    if (innerVisible) setInnerVisible(false)
    return (
      <div
        className={prefix + '-opener'}
        onClick={() => {
          setVisible(true)
        }}
      >
        <IconWidget infer="Setting" size={20} />
      </div>
    )
  }
  return (
    <div className={cls(prefix, { pinning })}>
      <div className={prefix + '-header'}>
        <div className={prefix + '-header-title'}>
          <TextWidget>{props.title}</TextWidget>
        </div>
        <div className={prefix + '-header-actions'}>
          <div className={prefix + '-header-extra'}>{props.extra}</div>
          {!pinning && (
            <IconWidget
              infer="PushPinOutlined"
              className={prefix + '-header-pin'}
              onClick={() => {
                setPinning(!pinning)
              }}
            />
          )}
          {pinning && (
            <IconWidget
              infer="PushPinFilled"
              className={prefix + '-pin-filled'}
              onClick={() => {
                setPinning(!pinning)
              }}
            />
          )}
          <IconWidget
            infer="Close"
            className={prefix + '-header-close'}
            onClick={() => {
              setVisible(false)
            }}
          />
        </div>
      </div>
      <div className={prefix + '-body'}>{innerVisible && props.children}</div>
    </div>
  )
})
