const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
entry: './src/main.js',
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist')
},
devtool: 'eval-source-map',
devServer: {
  contentBase: './dist'
},
plugins: [
  new Dotenv(),
  new UglifyJsPlugin({ sourceMap: true }),
  new CleanWebpackPlugin(['dist']),
  new CopyWebpackPlugin([
    {from:'src/img',to:'img'}
  ]),
  new HtmlWebpackPlugin({
    title: 'My Project',
    template: './src/index.html',
    inject: 'body'
  })
],
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {

      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true, // webpack@1.x
          disable: true, // webpack@2.x and newer
        }
      }]

    },
    {
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /spec/
      ],
      loader: "babel-loader",
      options: {
        presets: ['es2015']
      }
    }
  ]
}
};
