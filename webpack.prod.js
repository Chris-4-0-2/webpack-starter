const Path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    output: {
        filename: 'main.[contenthash].js',
        path: Path.resolve(__dirname, 'build'),
        assetModuleFilename: 'images/[contenthash][ext][query]',
        clean: true,
    },
    mode: 'production',
    optimization: {
        minimizer: [new CssMinimizerWebpackPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/i,
                exclude: /style\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /style\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {//Handle image with Asset Module thereby i dont need loader for images
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset'
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        
        // plugin for manage images
        //new CopyPlugin({
        //     patterns: [
        //         {from: 'src/assets', to: 'assets/'}
        //     ]
        // })
        new TerserWebpackPlugin()
    ]
}