# 基于 Designable 开发 Taro小程序前端页面可视化搭建工具

## 目录介绍

```
├─ packages
  ├─ taroify-formily: 组件库
  ├─ taroify-formily-demo: demo例子
  ├─ taroify-formily-designable: 页面可视化搭建设计器
```

## 预览地址

[Github](https://github.com/weilaiqishi/lowcode-designable-taro-react.git)

可视化设计器（体积很大，注意流量，最好用PC打开） <https://miku01.cn/taroifyDesignable/index.html>

demo H5（按 F12 切换设备仿真） <https://miku01.cn/taroifyDemo/index.html#/pages/index/index>

![taroify-formily-designable](./showImage/taroify-formily-designable.png)
![taroify-formily-demo-weapp](./showImage/taroify-formily-demo-weapp.png)

## 项目启动

**依赖安装**
根目录下

```bash
npm i -g yarn lerna ts-node @tarojs/cli@3.5.0-beta.6
lerna bootstrap
```

**物料组件库打包**
taroify-formily 目录下

```bash
yarn build
```

**Taro Demo运行**
taroify-formily-demo 目录下
编译微信小程序或淘宝(支付宝)小程序、h5

```bash
yarn dev:weapp
```

```bash
yarn dev:alipay
```

```bash
yarn dev:h5
```

`taroify-formily-demo/src/pages/index/jsonSchema.json`
可以替换 `PC端可视化设计器` 中编辑好的json

**可视化设计器启动**
taroify-formily-designable 目录下
`taroify-formily-designable/start.js` 中可修改 `Taro Demo` 地址

```bash
yarn start
```

## 介绍文章

目前组件比较少，如有需要上生产建议按自身业务搭一套

[0前端可视化搭建与designable](./article/0%E5%89%8D%E7%AB%AF%E5%8F%AF%E8%A7%86%E5%8C%96%E6%90%AD%E5%BB%BA%E4%B8%8Edesignable.md)
[1物料组件库、协议和渲染器、designable设计器](./article/1%E7%89%A9%E6%96%99%E7%BB%84%E4%BB%B6%E5%BA%93%E3%80%81%E5%8D%8F%E8%AE%AE%E5%92%8C%E6%B8%B2%E6%9F%93%E5%99%A8%E3%80%81designable%E8%AE%BE%E8%AE%A1%E5%99%A8.md)
[2Taro小程序H5渲染JSONSchema](./article/2Taro%E5%B0%8F%E7%A8%8B%E5%BA%8FH5%E6%B8%B2%E6%9F%93JSONSchema.md)
3事件系统(开坑中)
4数组组件(开坑中)
