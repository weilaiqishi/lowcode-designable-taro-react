import { ComponentType, CSSProperties, ReactNode } from 'react'
import {
  BaseEventOrigFunction,
  StandardProps,
} from '@tarojs/components/types/common'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'

export interface onScrollDetail {
  clientWidth: number
  clientHeight: number
}
export type layout = 'vertical' | 'horizontal'
export type position = 'absolute' | 'relative'
export type onScroll = (event: VirtualListEvent<onScrollDetail>) => void
export interface VirtualListProps extends StandardProps {
  /** 列表的高度。 */
  height: string | number
  /** 列表的宽度。 */
  width: string | number
  /** 列表的长度 */
  itemCount: number
  /** 渲染数据 */
  itemData: any[]
  /** 列表单项的大小，垂直滚动时为高度，水平滚动时为宽度。 */
  itemSize: number
  /** 解开高度列表单项大小限制，默认值使用: itemSize (请注意，初始高度与实际高度差异过大会导致隐患)。 */
  unlimitedSize?: boolean
  /** 布局方式，默认采用 "absolute" */
  position?: position
  /** 初始滚动偏移值，水平滚动影响 scrollLeft，垂直滚动影响 scrollTop。 */
  initialScrollOffset?: number
  /** 列表内部容器组件类型，默认值为 View。 */
  innerElementType?: ComponentType
  /** 顶部区域 */
  renderTop?: ReactNode
  /** 底部区域 */
  renderBottom?: ReactNode
  /** 滚动方向。vertical 为垂直滚动，horizontal 为平行滚动。默认为 vertical。 */
  layout?: layout
  /** 列表滚动时调用函数 */
  onScroll?: onScroll
  /** 调用平台原生的滚动监听函数。 */
  onScrollNative?: BaseEventOrigFunction<ScrollViewProps.onScrollDetail>
  /** 在可视区域之外渲染的列表单项数量，值设置得越高，快速滚动时出现白屏的概率就越小，相应地，每次滚动的性能会变得越差。 */
  overscanCount?: number
  /** 是否注入 isScrolling 属性到 children 组件。这个参数一般用于实现滚动骨架屏（或其它 placeholder） 时比较有用。 */
  useIsScrolling?: boolean
  children?: ComponentType<{
    /** 组件 ID */
    id: string
    /** 单项的样式，样式必须传入组件的 style 中 */
    style?: CSSProperties
    /** 组件渲染的数据 */
    data: any
    /** 组件渲染数据的索引 */
    index: number
    /** 组件是否正在滚动，当 useIsScrolling 值为 true 时返回布尔值，否则返回 undefined */
    isScrolling?: boolean
  }>

  direction?: "vertical" | "horizontal" | "ltr" | "rtl"
  itemElementType?
}

export type scrollDirection = 'forward' | 'backward'
export interface VirtualListEvent<T> {
  /** 滚动方向，可能值为 forward 往前， backward 往后。 */
  scrollDirection: scrollDirection
  /** 滚动距离 */
  scrollOffset: number
  /** 当滚动是由 scrollTo() 或 scrollToItem() 调用时返回 true，否则返回 false */
  scrollUpdateWasRequested: boolean
  /** 当前只有 React 支持 */
  detail?: {
    scrollLeft: number
    scrollTop: number
    scrollHeight: number
    scrollWidth: number
    clientWidth: number
    clientHeight: number
  }
}
