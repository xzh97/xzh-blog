const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry:{
        vue: [
            'vue/dist/vue',
            'vue-router',
            'vuex',
            'axios'
        ]
    },
    output:{
        path: path.resolve(__dirname, './public/static/dll'),
        filename: '[name]_[hash].dll.js',
        library: '[name]_[hash]'
    },
    plugins:[
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.resolve(__dirname, './public/static/dll', '[name]-manifest.json'),
            context: __dirname
        })
    ]

}