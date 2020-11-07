const DefinePlugin = require('webpack').DefinePlugin
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  }),
  new ExtractTextPlugin({
    filename: '[hash].css',
    allChunks: true
  }),
  new DefinePlugin({}),
  new WasmPackPlugin({
    crateDirectory: path.resolve(__dirname, '.'),
  }),
]

if (mode === 'production') {
  plugins.push(new CompressionPlugin())
}

module.exports = {
  mode,
  entry: [
    './src/index.ts',
    './src/index.scss'
  ],
  plugins,
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }),
      },
      {
        test: /\.s[ac]ss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      },
      {
        test: /\.(png|svg|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 8192
            },
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {},
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '~@': path.resolve(__dirname, './src/')
    }
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PORT,
    host: '0.0.0.0',
    liveReload: true,
    progress: true,
    proxy: {}
  }
}
