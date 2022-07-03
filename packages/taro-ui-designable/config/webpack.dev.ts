import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
//import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpack from 'webpack'

import baseConfig from './webpack.base'

const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

const PORT = 3000

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: chunk,
    })
  })
}

for (const key in baseConfig.entry) {
  if (Array.isArray(baseConfig.entry[key])) {
    baseConfig.entry[key].push(
      require.resolve('webpack/hot/dev-server'),
      `${require.resolve('webpack-dev-server/client')}?http://localhost:${PORT}`
    )
  }
}

export default {
  ...baseConfig,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './template.ejs'),
        chunk: ['playground'],
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
    new ModuleFederationPlugin({
      name: 'designable_taro',
      shared: {
        react: {
          requiredVersion: '17.0.0',
          singleton: true, // only a single version of the shared module is allowed
        },
        'react-dom': {
          requiredVersion: '17.0.0',
          singleton: true, // only a single version of the shared module is allowed
        },
      },
      remotes: {
        formily_taro: 'formily_taro@http://192.168.1.8:10086/remoteEntry.js'
      }
    }),
  ],
  devServer: {
    host: '127.0.0.1',
    open: true,
    port: PORT,
  },
}