/* eslint-disable */
var path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const dllJson = require('./public/static/dll/vue-manifest.json');

function resolve (dir) {
    console.log(__dirname)
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
            // @/ 是 src/ 的别名
            // 所以这里假设你有 `src/variables.scss` 这个文件
            data: `@import "~@/styles/variables.scss";`
            },
            less: {
              javascriptEnabled:true
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        //open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'localhost:3000/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    },
    configureWebpack:{
        plugins:[
            //! dll声明
            new webpack.DllReferencePlugin({
                manifest: dllJson,
            }),

            //! 注入dll到html 
            //? 这里原因尚未查明，目前问题是打包后dist下会多出一个dll.js并引用了它，而不是引用dist/static/dll下的dll.js
            // new AddAssetHtmlWebpackPlugin({
            //     filepath: path.resolve(__dirname, `./public/static/dll/${dllJson.name}.dll.js`)
            // })

            //! vue-cli构建时不显示打包的时间，所以用这个插件
            new ProgressBarPlugin({
                // format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                // clear: false
            })

        ]
    },
    chainWebpack: config => {
        // ! 注入dll到html
        config
        .plugin('html')
        .tap(args => {
        args[0].vendor = '/static/dll/' + dllJson.name + '.dll.js'
        return args
        })
    },
}