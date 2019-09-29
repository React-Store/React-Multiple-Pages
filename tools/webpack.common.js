const HappyPack = require('happypack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin') // 用于模板编译自动插入文件
const os = require('os')
const path = require('path')
const webpack = require('webpack')

const alias = require('./webpack.alias')

const fontName = 'fonts/[name].[hash:8].[ext]'
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) // happy config
const imageName = 'images/[name].[hash:8].[ext]'
const jsName = '[name].[hash:8].js'
const videoName = 'videos/[name].[hash:8].[ext]'

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: {
    common: [path.join(__dirname, '../src/common')],
    main: [path.join(__dirname, '../src/main')],
    home: [path.join(__dirname, '../src/pages/home/home.js')],
    about: [path.join(__dirname, '../src/pages/about/about.js')]
  },
  output: {
    filename: jsName,
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    alias: alias,
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve('src'),
        use: ['cache-loader', 'ts-loader']
      },
      {
        test: /\.(svg|cur)$/,
        loader: 'file-loader',
        exclude: /asset\/icon/,
        query: { name: imageName }
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'file-loader',
        query: { name: videoName }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: { limit: 8192, name: imageName }
      },
      {
        test: /\.eot((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: { limit: 100, name: fontName }
      },
      {
        test: /\.ttf((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          minetype: 'application/octet-stream',
          name: fontName
        }
      },
      {
        test: /\.woff((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: { limit: 100, minetype: 'application/font-woff', name: fontName }
      },
      {
        test: /\.woff2((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          minetype: 'application/font-woff2',
          name: fontName
        }
      }
    ]
  },

  plugins: [
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: ['ts-loader?transpileOnly=true&happyPackMode=true']
    }),
    new HTMLWebpackPlugin({
      template: 'src/pages/home/home.html',
      filename: 'home.html',
      chunks: ['home', 'common'], // 默认会将打包出的所有 js 插入 html。故需指明页面需要的模块
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new HTMLWebpackPlugin({
      template: 'src/pages/about/about.html',
      filename: 'about.html',
      chunks: ['about', 'common'],
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new HTMLWebpackPlugin({
      template: 'src/app.template.html',
      filename: 'index.html',
      chunks: ['main', 'common'],
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    //Global Variables
    new webpack.DefinePlugin({
      __DEBUG__: process.env.NODE_ENV === 'development'
    })
  ]
}
