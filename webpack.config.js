const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { addAbortSignal } = require('stream');
const { randomFill } = require('crypto');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './scripts.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            favicon: './img/favicon.ico'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        port: 8800
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|ttf|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ],
    },
  
}