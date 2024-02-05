import { Component } from 'react'

import '@nutui/nutui-react-taro/dist/style.css'
import '@nutui/icons-react-taro/dist/style_iconfont.css'
import './app.scss'

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
