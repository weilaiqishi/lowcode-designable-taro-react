const path = require('path')
const fs = require('fs')

if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true })
}
process.env.TARO_ENV = 'h5'
process.env.TARO_PLATFORM = 'web'

/*
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  entry: {
    main: './src/index.tsx', // 配置项目入口文件
  },
  devServer: {
    allowedHosts: 'all',
  },
  experiments: {
    // 旧版会存在这个问题，所以需要设置为 false
    // https://github.com/web-infra-dev/rspack/issues/2572
    // incrementalRebuild: false
  },
  output: {
    assetModuleFilename: './assets/[hash][ext][query]',
    filename: '[contenthash].js',
    cssFilename: '[contenthash].css',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@tarojs/components$': '@tarojs/components/lib/react',
      // '@tarojs/components$': '@tarojs/components-react',
      '@tarojs/taro': '@tarojs/taro-h5',
    },
  },
  builtins: {
    html: [
      {
        template: './index.html', // 对齐 CRA 生成index.html
        templateParameters: {
          process: JSON.stringify({
            env: process.env,
          }),
        },
        publicPath: './',
      },
    ],
    define: {
      process: {
        env: process.env,
      },
    },
  },
  devtool: process.env.GENERATE_SOURCEMAP === 'true' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'sass-loader',
          },
        ],
        type: 'css/auto',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
          },
        ],
        type: 'css/auto', // 如果你需要将 '*.module.less' 视为 CSS Module 那么将 'type' 设置为 'css/auto' 否则设置为 'css'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /taro-h5[\\/]dist[\\/]index/,
        loader: require.resolve(
          '@tarojs/plugin-framework-react/dist/api-loader.js'
        ),
      },
      {
        test: /\.(j|t)sx?$/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
            transform: {
              react: {
                runtime: 'automatic',
                development: true,
              },
            }
          },
          env: {
            mode: 'entry',
            "coreJs": "3",
            "skip": ["core-js/modules/_ie8-dom-define"]
          },
        },
        type: 'javascript/auto'
      },
      {
        test: /\.(ttf|otf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        type: 'asset',
      },
    ],
  },
}
