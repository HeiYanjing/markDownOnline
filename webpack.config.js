const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: {
    'index.js': './demo/index.js'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.ts', 'less']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', { grid: true, remove: false }]
                ]
              }
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    browsers: [
                      'last 2 Chrome major versions',
                      'last 2 Firefox major versions',
                      'last 2 Safari major versions',
                      'last 2 Edge major versions',
                      'last 2 iOS major versions',
                      'last 2 ChromeAndroid major versions',
                    ],
                  },
                },
              ],
            ],
          },
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index.js'],
      filename: './index.html',
      template: './demo/index.html',
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '.')
    },
    port: 6688,
    host: 'loalhost',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}