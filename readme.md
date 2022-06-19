# 基于 Designable 开发 Taro 小程序低代码玩具系统

## 目录介绍

|-- packages
  |-- designable-basicPlayground: `PC端低代码编辑器`
  |-- formily-taro-demo: 使用 `低代码物料组件` 实例
  |-- formily-taro-ui: `低代码物料组件库`

## 项目启动

根目录下

```bash
npm i -g lerna
lerna bootstrap
```

formily-taro-ui 目录下

```bash
yarn build
```

designable-basicPlayground 目录下

```bash
yarn start
```

formily-taro-demo 目录下
编译微信小程序或淘宝(支付宝)小程序

```bash
yarn dev:weapp
```

```bash
yarn dev:alipay
```

formily-taro-demo/src/pages/index/jsonSchema.json
可以替换 `PC端低代码编辑器` 中编辑好的json