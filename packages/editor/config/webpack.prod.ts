import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

import baseConfig from './webpack.base'

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: chunk,
      publicPath: './',
      templateParameters: {
        'process': JSON.stringify({ env: process.env })
      }
    })
  })
}

export default {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].bundle.js',
    publicPath: './',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './template.ejs'),
        chunk: ['playground'],
      },
    ]),

    // Limit the maximum number of chunks
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10,
    })
  ],
  // mode: 'development',
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true,
    // 代码分割
    splitChunks: {
      chunks: 'all',
      minSize: 0
    },
  },
}
