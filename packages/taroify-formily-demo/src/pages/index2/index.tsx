import React, { useEffect, useMemo, useState } from 'react'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'
import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import VirtualList from '@/components/virtual-list/react'

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset)
}
const _data = buildData(0)

const Row = React.memo(({ id, index, style, data }: any) => {
  return (
    <View
      id={id}
      className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
      style={style}
    >
      Row {index} : {data[index]}
    </View>
  )
})

export default () => {
  return (
    <View>
      <VirtualList
        height={500} /* 列表的高度 */
        width='100%' /* 列表的宽度 */
        itemData={_data} /* 渲染列表的数据 */
        itemCount={_data.length} /*  渲染列表的长度 */
        itemSize={100} /* 列表单项的高度  */
      >
        {Row}
      </VirtualList>
      <VirtualList
        height={500} /* 列表的高度 */
        width={750} /* 列表的宽度 */
        itemData={_data} /* 渲染列表的数据 */
        itemCount={_data.length} /*  渲染列表的长度 */
        itemSize={100} /* 列表单项的高度  */
        layout='horizontal'
      >
        {Row}
      </VirtualList>
    </View>
  )
}
