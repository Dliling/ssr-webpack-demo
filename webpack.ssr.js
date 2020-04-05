/**
 * @file wepack ssr config
 * @author
 */

const path = require('path');
// html压缩
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 将CSS抽离成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name]-server.js',
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'umd'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            inlineSource: '.css$',
            template: path.join(__dirname, 'src/index.html'),
            filename: 'search.html',
            // 使用chunk,与注入的打包好的文件名对应
            chunks: ['main'],
            // 打包出的chunk自动注入
            inject: true,
            minify: {
                html5: true,
                // 删除空格和换行符，若preserveLineBreaks参数设为true，则保留了换行符
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    ]
};
