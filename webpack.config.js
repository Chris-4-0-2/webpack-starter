const Path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    output: {
        path: Path.resolve(__dirname, 'build'),
        assetModuleFilename: 'images/[hash][ext][query]',
        clean: true,
    },
    mode: 'development',
    optimization: {
        minimizer: [new CssMinimizerWebpackPlugin()]
    },
    module: {
        rules: [
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
            filename: '[name].css',
            ignoreOrder: false
        }),
        
        // plugin for manage images
        //new CopyPlugin({
        //     patterns: [
        //         {from: 'src/assets', to: 'assets/'}
        //     ]
        // })
    ]
}