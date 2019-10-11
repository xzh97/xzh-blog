module.exports = {
    root: true,
    parserOptions:{
        parser:'babel-eslint',
        ecmaVersion:6,
        sourceType:"module",
        ecmaFeatures:{
            jsx: true, //启用jsx,
            globalReturn: true, // 允许在全局作用域下使用 return 语句
            impliedStrict: false, // 是否启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
        }
    },
    env:{
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true
    },
    plugins:[
        'vue',
    ],
    //不配置extend *.vue文件 template标签会报eslint错误
    extends: [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    rules:{
        "parser": "babel-eslint",
        'indent': [2, 4],
        'eqeqeq': [2, 'always'],
        "no-console": 0, //不允许使用console
        "no-unused-vars" : 0, //声明但是没用到的变量
        //'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,
    }
};