import React, { useLayoutEffect, useRef, useState } from 'react'
import { usePrefix, useViewport } from '../hooks'
import { AuxToolWidget, EmptyWidget } from '../widgets'
import { Viewport as ViewportType } from '@pind/designable-core'
import { requestIdle, globalThisPolyfill } from '@pind/designable-shared'
import cls from 'classnames'
export interface IViewportProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder'> {
  placeholder?: React.ReactNode
  dragTipsDirection?: 'left' | 'right'
}

export const Viewport: React.FC<IViewportProps> = ({
  placeholder,
  dragTipsDirection,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const prefix = usePrefix('viewport')
  const viewport = useViewport()
  const ref = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<ViewportType>()
  const isFrameRef = useRef(false)
  useLayoutEffect(() => {
    const frameElement = ref.current?.querySelector('iframe')
    if (!viewport) return
    if (viewportRef.current && viewportRef.current !== viewport) {
      viewportRef.current.onUnmount()
    }
    if (frameElement) {
      frameElement.addEventListener('load', () => {
        viewport.onMount(frameElement, frameElement.contentWindow as Window)
        requestIdle(() => {
          isFrameRef.current = true
          setLoaded(true)
        })
      })
    } else {
      viewport.onMount(ref.current as HTMLDivElement, globalThisPolyfill)
      requestIdle(() => {
        isFrameRef.current = false
        setLoaded(true)
      })
    }
    viewportRef.current = viewport
    return () => {
      viewport.onUnmount()
    }
  }, [viewport])

  return (
    <div
      {...props}
      ref={ref}
      className={cls(prefix, props.className, 'theClass')}
      style={{
        opacity: !loaded ? 0 : 1,
        overflow: isFrameRef.current ? 'hidden' : 'overlay',
        ...props.style,
      }}
    >
      {props.children}
      <AuxToolWidget />
      <EmptyWidget dragTipsDirection={dragTipsDirection}>
        {placeholder}
      </EmptyWidget>
    </div>
  )
}
