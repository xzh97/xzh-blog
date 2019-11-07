/* eslint-disable */
var path = require('path')
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
    }
}