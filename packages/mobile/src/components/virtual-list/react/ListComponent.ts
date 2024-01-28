/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ComponentType,
  createElement,
  CSSProperties,
  PureComponent,
  ReactNode,
} from 'react'
import { createSelectorQuery } from '@tarojs/taro'

import { getRTLOffsetType } from '../domHelpers'
import { memoizeOne } from '../memoize'
import { cancelTimeout, requestTimeout } from '../timer'

import * as types from './type'

// --- start FixedSizeList
let devWarningsDirection: WeakSet<any> | null = null
let devWarningsTagName: WeakSet<any> | null = null

if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined' && typeof window.WeakSet !== 'undefined') {
    devWarningsDirection = new WeakSet()
    devWarningsTagName = new WeakSet()
  }
}

const validateSharedProps = (
  {
    children,
    direction,
    height,
    layout,
    itemTagName,
    innerTagName,
    outerTagName,
    width,
  },
  { instance }
) => {
  if (process.env.NODE_ENV !== 'production') {
    if (innerTagName != null || outerTagName != null || itemTagName != null) {
      if (devWarningsTagName && !devWarningsTagName.has(instance)) {
        devWarningsTagName.add(instance)
        console.warn(
          'The itemTagName、innerTagName and outerTagName props have been deprecated. ' +
            'Please use the itemElementType、innerElementType and outerElementType props instead.'
        )
      }
    } // TODO Deprecate direction "horizontal"

    const isHorizontal = direction === 'horizontal' || layout === 'horizontal'

    switch (direction) {
      case 'horizontal':
      case 'vertical':
        if (devWarningsDirection && !devWarningsDirection.has(instance)) {
          devWarningsDirection.add(instance)
          console.warn(
            'The direction prop should be either "ltr" (default) or "rtl". ' +
              'Please use the layout prop to specify "vertical" (default) or "horizontal" orientation.'
          )
        }

        break

      case 'ltr':
      case 'rtl':
        // Valid values
        break

      default:
        throw Error(
          'An invalid "direction" prop has been specified. ' +
            'Value should be either "ltr" or "rtl". ' +
            `"${direction}" was specified.`
        )
    }

    switch (layout) {
      case 'horizontal':
      case 'vertical':
        // Valid values
        break

      default:
        throw Error(
          'An invalid "layout" prop has been specified. ' +
            'Value should be either "horizontal" or "vertical". ' +
            `"${layout}" was specified.`
        )
    }

    if (children == null) {
      throw Error(
        'An invalid "children" prop has been specified. ' +
          'Value should be a React component. ' +
          `"${children === null ? 'null' : typeof children}" was specified.`
      )
    }

    if (isHorizontal && typeof width !== 'number') {
      throw Error(
        'An invalid "width" prop has been specified. ' +
          'Horizontal lists must specify a number for width. ' +
          `"${width === null ? 'null' : typeof width}" was specified.`
      )
    } else if (!isHorizontal && typeof height !== 'number') {
      throw Error(
        'An invalid "height" prop has been specified. ' +
          'Vertical lists must specify a number for height. ' +
          `"${height === null ? 'null' : typeof height}" was specified.`
      )
    }
  }
}

const FixedSizeListOptions = {
  getItemOffset(props, index, ref) {
    if (!props.unlimitedSize) {
      return index * props.itemSize
    }
    return ref._getCountSize(props, index)
  },
  getItemSize(props, index, ref) {
    if (!props.unlimitedSize) {
      return props.itemSize
    }

    return ref._getSizeUpload(index, isHorizontalFunc(props))
  },
  getEstimatedTotalSize(props, ref) {
    return ref._getCountSize(props, props.itemCount)
  },
  getOffsetForIndexAndAlignment: (
    props,
    id,
    index,
    align,
    scrollOffset,
    ref
  ) => {
    const { height, width } = props
    const { sizeList } = ref.state
    // TODO Deprecate direction "horizontal"
    const size = isHorizontalFunc(props) ? width : height
    const itemSize = ref._getSize(sizeList[index])
    const lastItemOffset = Math.max(
      0,
      ref._getCountSize(props, props.itemCount) - size
    )
    const maxOffset = Math.min(lastItemOffset, ref._getCountSize(props, index))
    const minOffset = Math.max(
      0,
      ref._getCountSize(props, index) - size + itemSize
    )

    if (align === 'smart') {
      if (
        scrollOffset >= minOffset - size &&
        scrollOffset <= maxOffset + size
      ) {
        align = 'auto'
      } else {
        align = 'center'
      }
    }

    switch (align) {
      case 'start':
        return maxOffset

      case 'end':
        return minOffset

      case 'center': {
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2)

        if (middleOffset < Math.ceil(size / 2)) {
          return 0 // near the beginning
        } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
          return lastItemOffset // near the end
        } else {
          return middleOffset
        }
      }

      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset
        } else if (scrollOffset < minOffset) {
          return minOffset
        } else {
          return maxOffset
        }
    }
  },
  getStartIndexForOffset(props, scrollOffset, ref) {
    return Math.max(0, ref._getSizeCount(props, scrollOffset) - 1)
  },
  getStopIndexForStartIndex(props, scrollOffset, startIndex, ref) {
    const { height, itemCount, itemSize, width } = props
    const size = isHorizontalFunc(props) ? width : height
    const offset = ref._getCountSize(props, startIndex)
    if (!props.unlimitedSize) {
      // TODO Deprecate direction "horizontal"
      const numVisibleItems = Math.ceil(
        (size + scrollOffset - offset) / itemSize
      )
      /** -1 is because stop index is inclusive */
      return Math.max(
        startIndex,
        Math.min(itemCount - 1, startIndex + numVisibleItems - 1)
      )
    }
    return Math.max(
      startIndex,
      Math.min(itemCount - 1, ref._getSizeCount(props, size + scrollOffset))
    )
  },

  initInstanceProps(...args) {
    // Noop
  },

  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: (nextProps, prevState) => {
    const { itemCount, itemSize } = nextProps
    const { sizeList } = prevState
    if (itemCount > sizeList.length) {
      const arr = new Array(itemCount - sizeList.length).fill(-1)
      sizeList.push(...arr)
    } else if (itemCount < sizeList.length) {
      sizeList.length = itemCount
    }
    if (process.env.NODE_ENV !== 'production') {
      if (typeof itemSize !== 'number') {
        throw Error(
          'An invalid "itemSize" prop has been specified. ' +
            'Value should be a number. ' +
            `"${itemSize === null ? 'null' : typeof itemSize}" was specified.`
        )
      }
    }
    validateSharedProps(nextProps, prevState)
  },
}
// --- end FixedSizeList

// --- start ListComponent

// 防抖时间
const IS_SCROLLING_DEBOUNCE_INTERVAL = 200

// In DEV mode, this Set helps us only log a warning once per component instance.
// This avoids spamming the console every time a render happens.
// 在DEV模式中，这个Set只帮助我们在每个组件实例中记录一次警告。 这避免了每次渲染发生时都破坏控制台。
const defaultItemKey = (index: any) => index

// 虚拟列表实例id
let INSTANCE_ID = 0

// 判断是否使用横向
export function isHorizontalFunc({
  direction,
  layout,
}: {
  direction?
  layout?
  [prop: string]: any
}) {
  return direction === 'horizontal' || layout === 'horizontal'
}
// 判断横向时滚动方向
export function isRtlFunc({ direction }) {
  return direction === 'rtl'
}
// querySelector获取item大小
export function getRectSize(
  id: string,
  success = (res?: any) => {},
  fail = () => {}
) {
  const query = createSelectorQuery()
  query
    .select(id)
    .boundingClientRect((res) => {
      if (res) {
        success(res)
      } else {
        fail()
      }
    })
    .exec()
}

type typeVirtualListComponentListProps = {
  className?
  style?

  // 逻辑参数
  id?: string
  children?
  height: string | number // 列表的高度 方向为垂直时必须为数字
  width: string | number // 列表的宽度 方向为水平时必须为数字
  itemData: any[] // 渲染列表的数据
  itemCount: number // 渲染列表的长度
  itemSize: number // 列表单项的高度
  overscanCount?: number // 缓冲区item数量
  unlimitedSize?: boolean // 是否使用列表项动态高度
  direction: 'horizontal' | 'vertical' | 'ltr' | 'rtl' // 滚动方向
  layout?: types.layout // 布局方向
  position?: types.position // 列表单项的定位方式 如果是absolute则在列表中的位置由组件计算
  useIsScrolling?: boolean // 是否注入 isScrolling 属性到 children 组件。这个参数一般用于实现滚动骨架屏（或其它 placeholder） 时比较有用
  initialScrollOffset?: number // 初始滚动偏移值，水平滚动影响 scrollLeft，垂直滚动影响 scrollTop
  renderTop?: ReactNode // 顶部区域
  renderBottom?: ReactNode // 底部区域

  // 容器 幻肢（监听它的滚动条） 子项 配置
  outerElementType?
  outerTagName?
  outerRef?
  innerElementType?
  innerTagName?
  innerRef?
  itemElementType?
  itemTagName?
  itemKey?

  // 事件
  onItemsRendered?
  onScroll?: types.onScroll
}

export default class List extends PureComponent<typeVirtualListComponentListProps> {
  // eslint-disable-next-line react/sort-comp
  _instanceProps: any
  _outerRef: any
  _resetIsScrollingTimeoutId: { id: number | NodeJS.Timeout } | null
  _callOnItemsRendered: any
  _callOnScroll: any
  _getSize: any
  _getSizeUploadSync: any
  _getSizeUpload: (index: any, isHorizontal: any) => any
  _getCountSize: any
  _getSizeCount: any
  _getStyleValue: (value: any) => any
  _getItemStyle: any
  _onScrollHorizontal: (event: any) => void
  _onScrollVertical: (event: any) => void
  _outerRefSetter: (ref: any) => void
  field: {
    scrollLeft: number
    scrollTop: number
    scrollHeight: number
    scrollWidth: number
    clientHeight: number
    clientWidth: number
    diffOffset: number
  }
  // props: typeVirtualListComponentListProps
  // eslint-disable-next-line react/sort-comp
  state: {
    id: string
    instance
    isScrolling: boolean
    scrollDirection: types.scrollDirection
    scrollOffset: number
    scrollUpdateWasRequested: boolean
    sizeList: any[]
  }
  static defaultProps: any = {
    direction: 'ltr',
    itemData: undefined,
    layout: 'vertical',
    overscanCount: 2,
    useIsScrolling: false,
  }
  // Always use explicit constructor for React components.
  // It produces less code after transpilation. (#26)
  // eslint-disable-next-line no-useless-constructor
  constructor(props: typeVirtualListComponentListProps) {
    super(props)
    this._instanceProps = FixedSizeListOptions.initInstanceProps(
      this.props,
      this
    )
    this._resetIsScrollingTimeoutId = null
    this.state = {
      id: this.props.id || `virtual-list-${INSTANCE_ID++}`,
      // eslint-disable-next-line react/no-unused-state
      instance: this,
      isScrolling: false,
      scrollDirection: 'forward',
      scrollOffset:
        typeof this.props.initialScrollOffset === 'number'
          ? this.props.initialScrollOffset
          : 0,
      scrollUpdateWasRequested: false,
      sizeList: [],
    }
    if (this.props.unlimitedSize) {
      this.state.sizeList = new Array(this.props.itemCount).fill(-1)
    }
    this.field = {
      scrollLeft: 0,
      scrollTop: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      clientHeight: 0,
      clientWidth: 0,
      diffOffset: 0,
    }
    this._callOnItemsRendered = memoizeOne(
      (
        overscanStartIndex: any,
        overscanStopIndex: any,
        visibleStartIndex: any,
        visibleStopIndex: any
      ) =>
        this.props.onItemsRendered({
          overscanStartIndex,
          overscanStopIndex,
          visibleStartIndex,
          visibleStopIndex,
        })
    )
    this._callOnScroll = void 0
    this._callOnScroll = memoizeOne(
      (
        scrollDirection: any,
        scrollOffset: any,
        scrollUpdateWasRequested: any,
        detail: any
      ) =>
        this.props.onScroll?.({
          scrollDirection,
          scrollOffset,
          scrollUpdateWasRequested,
          detail,
        })
    )

    this._getSize = void 0

    this._getSize = (size: number) => {
      if (typeof size === 'number' && size >= 0) {
        return size
      }
      return this.props.itemSize
    }

    this._getSizeUploadSync = void 0

    this._getSizeUploadSync = (index: number, isHorizontal: any) => {
      const ID = `#${this.state.id}-${index}`

      return new Promise((resolve) => {
        const success = ({ width, height }) => {
          const { sizeList } = this.state
          const size = isHorizontal ? width : height
          if (size !== sizeList[index]) {
            sizeList[index] = this._getSize(size)
            this.setState(
              {
                sizeList: [...sizeList],
              },
              () => {
                resolve(this._getSize(size))
              }
            )
          }
        }
        const fail = () => {
          const [startIndex, stopIndex] = this._getRangeToRender()
          if (index >= startIndex && index <= stopIndex) {
            setTimeout(() => {
              getRectSize(ID, success, fail)
            }, 100)
          }
        }
        getRectSize(ID, success, fail)
      })
    }

    this._getSizeUpload = (index, isHorizontal) => {
      this._getSizeUploadSync(index, isHorizontal)
      const { sizeList } = this.state
      return this._getSize(sizeList[index])
    }

    this._getCountSize = void 0

    this._getCountSize = (
      _props: { unlimitedSize: any; itemSize: number },
      count: number
    ) => {
      if (!_props.unlimitedSize) {
        return _props.itemSize * count
      }
      const { sizeList } = this.state
      const sizes = sizeList.slice(0, count)
      return sizes.reduce((p: any, a: any) => {
        return p + this._getSize(a)
      }, 0)
    }

    this._getSizeCount = void 0

    this._getSizeCount = (
      _props: { unlimitedSize: any; itemCount: number; itemSize: number },
      offset: number
    ) => {
      if (offset === 0) {
        return 0
      }
      if (!_props.unlimitedSize) {
        return Math.min(
          _props.itemCount - 1,
          Math.floor(offset / _props.itemSize)
        )
      }
      let offsetSize = 0
      const { sizeList } = this.state
      const count = sizeList.reduce((p: number, a: number) => {
        a = this._getSize(a)
        if (offsetSize < offset) {
          offsetSize += a
          return ++p
        }
        return p
      }, 0)
      return count - 1
    }

    this._getStyleValue = (value) => {
      return typeof value === 'number'
        ? value + 'px'
        : value == null
          ? ''
          : value
    }

    this._getItemStyle = void 0

    this._getItemStyle = (index: string | number) => {
      const { direction, itemSize, layout } = this.props

      // 记忆item自己的样式
      type typeItemStyleCache = {
        height: string
        left: string
        position: string
        right: string
        top: string
        width: string
      }
      const itemStyleCache: typeItemStyleCache = this._getItemStyleCache(
        FixedSizeListOptions.shouldResetStyleCacheOnItemSizeChange && itemSize,
        FixedSizeListOptions.shouldResetStyleCacheOnItemSizeChange && layout,
        FixedSizeListOptions.shouldResetStyleCacheOnItemSizeChange && direction
      ) as any

      let style: {
        [x: string]: any
        width: any
        right: any
        left: any
        height: any
        top: any
        hasOwnProperty?: any
        position?: string
      }

      const offset = FixedSizeListOptions.getItemOffset(this.props, index, this)
      const size = FixedSizeListOptions.getItemSize(this.props, index, this) // TODO Deprecate direction "horizontal"
      const isHorizontal = isHorizontalFunc(this.props)
      const isRtl = isRtlFunc(this.props)
      if (Reflect.has(itemStyleCache, index)) {
        style = itemStyleCache[index]
        if (isHorizontal) {
          style.width = size
          if (isRtl) {
            style.right = offset
          } else {
            style.left = offset
          }
        } else {
          style.height = size
          style.top = offset
        }
      } else {
        const offsetHorizontal = isHorizontal ? offset : 0
        itemStyleCache[index] = style = {
          position: 'absolute',
          left: !isRtl ? offsetHorizontal : undefined,
          right: isRtl ? offsetHorizontal : undefined,
          top: !isHorizontal ? offset : 0,
          height: !isHorizontal ? size : '100%',
          width: isHorizontal ? size : '100%',
        }
      }

      for (const k in style) {
        if (Reflect.has(style, k)) {
          style[k] = this._getStyleValue(style[k])
        }
      }

      return style
    }

    this._getItemStyleCache = memoizeOne(() => ({}))

    this._onScrollHorizontal = (event) => {
      const { clientWidth, scrollTop, scrollLeft, scrollHeight, scrollWidth } =
        event.currentTarget
      this.field.scrollHeight = scrollHeight
      this.field.scrollWidth = FixedSizeListOptions.getEstimatedTotalSize(
        this.props,
        this
      )
      this.field.scrollTop = scrollTop
      this.field.scrollLeft = scrollLeft
      this.field.clientHeight = scrollHeight
      this.field.clientWidth = clientWidth
      this.setState((prevState: { scrollOffset }) => {
        if (prevState.scrollOffset === scrollLeft) {
          // Scroll position may have been updated by cDM/cDU,
          // In which case we don't need to trigger another render,
          // And we don't want to update state.isScrolling.
          return null
        }

        let scrollOffset = scrollLeft

        if (isRtlFunc(this.props)) {
          // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
          // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
          // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
          // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
          switch (getRTLOffsetType()) {
            case 'negative':
              scrollOffset = -scrollLeft
              break

            case 'positive-descending':
              scrollOffset = scrollWidth - clientWidth - scrollLeft
              break
          }
        } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.

        scrollOffset = Math.max(
          0,
          Math.min(scrollOffset, scrollWidth - clientWidth)
        )
        this.field.scrollWidth = scrollOffset
        return {
          isScrolling: true,
          scrollDirection:
            prevState.scrollOffset < scrollLeft ? 'forward' : 'backward',
          scrollOffset,
          scrollUpdateWasRequested: false,
        }
      }, this._resetIsScrollingDebounced as any)
    }

    this._onScrollVertical = (event) => {
      const { clientHeight, scrollHeight, scrollWidth, scrollTop, scrollLeft } =
        event.currentTarget
      this.setState((prevState: { scrollOffset }) => {
        const diffOffset = this.field.scrollTop - scrollTop
        if (
          prevState.scrollOffset === scrollTop ||
          this.field.diffOffset === -diffOffset
        ) {
          // Scroll position may have been updated by cDM/cDU,
          // In which case we don't need to trigger another render,
          // And we don't want to update state.isScrolling.
          return null
        } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
        const scrollOffset = Math.max(
          0,
          Math.min(scrollTop, scrollHeight - clientHeight)
        )
        this.field.scrollHeight = FixedSizeListOptions.getEstimatedTotalSize(
          this.props,
          this
        )
        this.field.scrollWidth = scrollWidth
        this.field.scrollTop = scrollOffset
        this.field.scrollLeft = scrollLeft
        this.field.clientHeight = clientHeight
        this.field.clientWidth = scrollWidth
        this.field.diffOffset = diffOffset
        return {
          isScrolling: true,
          scrollDirection:
            prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
          scrollOffset,
          scrollUpdateWasRequested: false,
        }
      }, this._resetIsScrollingDebounced as any)
    }

    this._outerRefSetter = (ref) => {
      const { outerRef } = this.props
      this._outerRef = ref

      if (typeof outerRef === 'function') {
        outerRef(ref)
      } else if (
        outerRef != null &&
        typeof outerRef === 'object' &&
        Reflect.has(outerRef, 'current')
      ) {
        outerRef.current = ref
      }
    }

    this._resetIsScrollingDebounced = () => {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId)
      }

      this._resetIsScrollingTimeoutId = requestTimeout(
        this._resetIsScrolling,
        IS_SCROLLING_DEBOUNCE_INTERVAL
      )
    }

    this._resetIsScrolling = () => {
      this._resetIsScrollingTimeoutId = null
      this.setState(
        {
          isScrolling: false,
        },
        () => {
          // Clear style cache after state update has been committed.
          // This way we don't break pure sCU for items that don't use isScrolling param.
          this._getItemStyleCache(-1, null)
        }
      )
    }
  }
  _getItemStyleCache(arg0: any, arg1: any, arg2?: any) {
    throw new Error('Method not implemented.')
  }
  _resetIsScrollingDebounced(
    arg0: (prevState) => {
      isScrolling: boolean
      scrollDirection: string
      scrollOffset: any
      scrollUpdateWasRequested: boolean
    } | null,
    _resetIsScrollingDebounced: any
  ) {
    throw new Error('Method not implemented.')
  }
  _resetIsScrolling(
    _resetIsScrolling: any,
    IS_SCROLLING_DEBOUNCE_INTERVAL_: number
  ): any {
    throw new Error('Method not implemented.')
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    FixedSizeListOptions.validateProps(nextProps, prevState)
    return null
  }

  scrollTo(scrollOffset: number) {
    scrollOffset = Math.max(0, scrollOffset)
    this.setState((prevState: { scrollOffset }) => {
      if (prevState.scrollOffset === scrollOffset) {
        return null
      }

      return {
        scrollDirection:
          prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
        scrollOffset: scrollOffset,
        scrollUpdateWasRequested: true,
      }
    }, this._resetIsScrollingDebounced as any)
  }

  scrollToItem(index: number, align = 'auto') {
    const { itemCount } = this.props
    const { scrollOffset } = this.state
    index = Math.max(0, Math.min(index, itemCount - 1))
    this.scrollTo(
      FixedSizeListOptions.getOffsetForIndexAndAlignment(
        this.props,
        this.state.id,
        index,
        align,
        scrollOffset,
        this
      )
    )
  }

  componentDidMount() {
    const { initialScrollOffset } = this.props

    if (typeof initialScrollOffset === 'number' && this._outerRef != null) {
      const outerRef = this._outerRef // TODO Deprecate direction "horizontal"

      if (isHorizontalFunc(this.props)) {
        outerRef.scrollLeft = initialScrollOffset
      } else {
        outerRef.scrollTop = initialScrollOffset
      }
    }

    this._callPropsCallbacks()
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { scrollOffset, scrollUpdateWasRequested } = this.state

    if (scrollUpdateWasRequested && this._outerRef != null) {
      const outerRef = this._outerRef // TODO Deprecate direction "horizontal"

      if (isHorizontalFunc(this.props)) {
        if (isRtlFunc(this.props)) {
          // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
          // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
          // So we need to determine which browser behavior we're dealing with, and mimic it.
          switch (getRTLOffsetType()) {
            case 'negative':
              outerRef.scrollLeft = -scrollOffset
              break

            case 'positive-ascending':
              outerRef.scrollLeft = scrollOffset
              break

            default:
              // eslint-disable-next-line no-case-declarations
              const { clientWidth, scrollWidth } = outerRef
              outerRef.scrollLeft = scrollWidth - clientWidth - scrollOffset
              break
          }
        } else {
          outerRef.scrollLeft = scrollOffset
        }
      } else {
        outerRef.scrollTop = scrollOffset
      }
    }

    this._callPropsCallbacks(prevProps, prevState)

    setTimeout(() => {
      const [startIndex, stopIndex] = this._getRangeToRender()
      const isHorizontal = isHorizontalFunc(this.props)
      for (let index = startIndex; index <= stopIndex; index++) {
        this._getSizeUploadSync(index, isHorizontal)
      }
    }, 0)
  }

  componentWillUnmount() {
    if (this._resetIsScrollingTimeoutId !== null) {
      cancelTimeout(this._resetIsScrollingTimeoutId)
    }
  }

  render() {
    const {
      children,
      className,
      direction,
      height,
      innerRef,
      innerElementType,
      innerTagName,
      itemElementType,
      itemTagName,
      itemCount,
      itemData,
      itemKey = defaultItemKey,
      layout,
      outerElementType,
      outerTagName,
      style,
      useIsScrolling,
      width,
      position,
      renderTop,
      renderBottom,
      ...rest
    } = this.props
    const { id, isScrolling, scrollOffset, scrollUpdateWasRequested } =
      this.state // TODO Deprecate direction "horizontal"

    const isHorizontal = isHorizontalFunc(this.props)
    const onScroll = isHorizontal
      ? this._onScrollHorizontal
      : this._onScrollVertical

    const [startIndex, stopIndex] = this._getRangeToRender()

    const items: any[] = []

    if (itemCount > 0) {
      for (let index = startIndex; index <= stopIndex; index++) {
        const key = itemKey(index, itemData)
        let _style: { height: any; width: any }
        if (position === 'relative') {
          const size = FixedSizeListOptions.getItemSize(this.props, index, this)
          _style = {
            height: this._getStyleValue(!isHorizontal ? size : '100%'),
            width: this._getStyleValue(isHorizontal ? size : '100%'),
          }
        } else {
          _style = this._getItemStyle(index)
        }
        items.push(
          createElement(
            itemElementType || itemTagName || 'div',
            {
              key,
              style: _style,
            },
            createElement(children, {
              id: `${id}-${index}`,
              data: itemData,
              index,
              isScrolling: useIsScrolling ? isScrolling : undefined,
            })
          )
        )
      }
    }
    // Read this value AFTER items have been created,
    // So their actual sizes (if variable) are taken into consideration.

    const estimatedTotalSize = FixedSizeListOptions.getEstimatedTotalSize(
      this.props,
      this
    )
    const outerElementProps = {
      ...rest,
      id,
      className,
      onScroll,
      ref: this._outerRefSetter,
      layout,
      style: {
        position: 'relative',
        height: this._getStyleValue(height),
        width: this._getStyleValue(width),
        overflow: 'overlay',
        WebkitOverflowScrolling: 'touch',
        willChange: 'transform',
        direction,
        ...style,
      },
      scrollLeft: 0,
      scrollTop: 0,
    }
    if (scrollUpdateWasRequested) {
      if (isHorizontal) {
        outerElementProps.scrollLeft = scrollOffset
      } else {
        outerElementProps.scrollTop = scrollOffset
      }
    }

    if (position === 'relative') {
      const pre = FixedSizeListOptions.getItemOffset(
        this.props,
        startIndex,
        this
      )
      return createElement(
        outerElementType || outerTagName || 'div',
        outerElementProps,
        renderTop,
        createElement(itemElementType || itemTagName || 'div', {
          key: `${id}-pre`,
          id: `${id}-pre`,
          style: {
            height: isHorizontal ? '100%' : this._getStyleValue(pre),
            width: !isHorizontal ? '100%' : this._getStyleValue(pre),
          },
        }),
        createElement(
          innerElementType || innerTagName || 'div',
          {
            ref: innerRef,
            key: `${id}-inner`,
            id: `${id}-inner`,
            style: {
              pointerEvents: isScrolling ? 'none' : 'auto',
            },
          },
          items
        ),
        renderBottom
      )
    } else {
      return createElement(
        outerElementType || outerTagName || 'div',
        outerElementProps,
        renderTop,
        createElement(
          innerElementType || innerTagName || 'div',
          {
            ref: innerRef,
            key: `${id}-inner`,
            id: `${id}-inner`,
            style: {
              height: this._getStyleValue(
                isHorizontal ? '100%' : estimatedTotalSize
              ),
              pointerEvents: isScrolling ? 'none' : 'auto',
              width: this._getStyleValue(
                isHorizontal ? estimatedTotalSize : '100%'
              ),
            },
          },
          items
        ),
        renderBottom
      )
    }
  }

  _callPropsCallbacks(
    prevProps?: { itemCount: any },
    prevState?: {
      scrollDirection: any
      scrollOffset: any
      scrollUpdateWasRequested: any
    }
  ) {
    if (typeof this.props.onItemsRendered === 'function') {
      if (this.props.itemCount > 0) {
        if (prevProps && prevProps.itemCount !== this.props.itemCount) {
          const [
            overscanStartIndex,
            overscanStopIndex,
            visibleStartIndex,
            visibleStopIndex,
          ] = this._getRangeToRender()

          this._callOnItemsRendered(
            overscanStartIndex,
            overscanStopIndex,
            visibleStartIndex,
            visibleStopIndex
          )
        }
      }
    }

    if (typeof this.props.onScroll === 'function') {
      if (
        !prevState ||
        prevState.scrollDirection !== this.state.scrollDirection ||
        prevState.scrollOffset !== this.state.scrollOffset ||
        prevState.scrollUpdateWasRequested !==
          this.state.scrollUpdateWasRequested
      ) {
        this._callOnScroll(
          this.state.scrollDirection,
          this.state.scrollOffset,
          this.state.scrollUpdateWasRequested,
          this.field
        )
      }
    }
  }
  // Lazily create and cache item styles while scrolling,
  // So that pure component sCU will prevent re-renders.
  // We maintain this cache, and pass a style prop rather than index,
  // So that List can clear cached styles and force item re-render if necessary.

  _getRangeToRender() {
    const { itemCount, overscanCount } = this.props
    const { isScrolling, scrollDirection, scrollOffset } = this.state

    if (itemCount === 0) {
      return [0, 0, 0, 0]
    }

    const startIndex = FixedSizeListOptions.getStartIndexForOffset(
      this.props,
      scrollOffset,
      this
    )
    const stopIndex = FixedSizeListOptions.getStopIndexForStartIndex(
      this.props,
      scrollOffset,
      startIndex,
      this
    ) // Overscan by one item in each direction so that tab/focus works.
    // If there isn't at least one extra item, tab loops back around.

    const overscanBackward =
      !isScrolling || scrollDirection === 'backward'
        ? Math.max(1, overscanCount || 0)
        : 1
    const overscanForward =
      !isScrolling || scrollDirection === 'forward'
        ? Math.max(1, overscanCount || 0)
        : 1
    return [
      Math.max(0, startIndex - overscanBackward),
      Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)),
      startIndex,
      stopIndex,
    ]
  }
}

// NOTE: I considered further wrapping individual items with a pure ListItem component.
// This would avoid ever calling the render function for the same index more than once,
// But it would also add the overhead of a lot of components/fibers.
// I assume people already do this (render function returning a class component),
// So my doing it would just unnecessarily double the wrappers.

// --- end start ListComponent
