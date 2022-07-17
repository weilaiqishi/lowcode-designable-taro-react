# 基于 Designable 开发 Taro小程序前端页面可视化搭建工具

## 目录介绍

```
├─ packages
  ├─ taroify-formily: 组件库
  ├─ taroify-formily-demo: demo例子
  ├─ taroify-formily-designable: 可视化设计器
```

## 预览地址

可视化设计器（体积很大，注意流量，最好用PC打开） <https://miku01.cn/taroifyDesignable/index.html>
demo H5（按 F12 切换设备仿真） <https://miku01.cn/taroifyDemo/index.html#/pages/index/index>

![](./showImage/taroify-formily-designable.png)
![](./showImage/taroify-formily-demo-weapp.png)

## 项目启动

根目录下

```bash
npm i -g yarn lerna ts-node @tarojs/cli@3.5.0-beta.6
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
编译微信小程序或淘宝(支付宝)小程序、h5

```bash
yarn dev:weapp
```

淘宝端在taro 3.5.0.beta6中好像不正常，3.5.0.beta2是可以的
```bash
yarn dev:alipay
```

```bash
yarn dev:h5
```

taroify-formily-demo/src/pages/index/jsonSchema.json
可以替换 `PC端可视化编辑器` 中编辑好的json

## 介绍文章

目前组件比较少，如有需要上生产建议按自身业务搭一套

[文章0](./article/article0.md)
[文章1](./article/article1.md)

