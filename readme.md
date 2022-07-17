# 基于 Designable 开发 Taro小程序前端页面可视化搭建工具

## 目录介绍

```
├─ packages
  ├─ taroify-formily: 组件库
  ├─ taroify-formily-demo: demo例子
  ├─ taroify-formily-designable: 可视化设计器
```

## 项目启动

根目录下

```bash
npm i -g lerna
lerna bootstrap
```

taroify-formily 目录下

```bash
yarn build
```

taroify-formily-designable 目录下

```bash
yarn start
```

taroify-formily-demo 目录下
编译微信小程序或淘宝(支付宝)小程序

```bash
yarn dev:weapp
```

```bash
yarn dev:alipay
```

taroify-formily-demo/src/pages/index/jsonSchema.json
可以替换 `PC端可视化编辑器` 中编辑好的json
