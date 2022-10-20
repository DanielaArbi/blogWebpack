const path = require('path');//disponible en node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv= require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //limpia el build y con archivos que si se utilizan

module.exports = {
    entry: './src/index.js',               //elemnto inicial de la app
    output: {
        path: path.resolve(__dirname, 'dist'),  //donde se va a guardar el proyecto
        filename: '[name].[contenthash].js',
        assetModuleFilename : 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'] ,
        alias :{//se usa alias para evitar el ././ en las rutas
            '@utils' : path.resolve(__dirname,'src/utils/'),
            '@templates' : path.resolve(__dirname,'src/templates/'),
            '@styles' : path.resolve(__dirname,'src/styles/'),
            '@images' : path.resolve(__dirname,'src/assets/images/')
        }                 //dejamos claro con que tecnologias se va a trabajar
    },
    module: {
        rules: [
            {                     //reglas para trabajar con diferentes archivos
                test: /\.m?js$/,         //utiliza cualquier espresion con ext js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test : /\.css|.styl$/i,
                use : [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ],
            },
            {
                test : /\.png/,
                type : 'asset/resource'
            },
            {
                test :/\.(woff|woff2)$/,
                use:{
                    loader : 'url-loader',
                    options:{
                        limit :10000,
                        mimetype:"application/font-woff",
                        name : "[name].[contenthash].[ext]",
                        outputPath : "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule : false,
                    },
                }
            }
        ]
    },
    plugins :[
        new HtmlWebpackPlugin({    //config para el html
            inject : true,
            template : './public/index.html',
            filename : './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns :[
                {
                    from : path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimize : true,
        minimizer :[
            new CssMinimizerPlugin(), //para optimizar el css y js
            new TerserPlugin(),
        ]
    }
}