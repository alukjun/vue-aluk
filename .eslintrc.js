module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        // 代码风格配置
        'no-console': process.env.VUE_APP_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.VUE_APP_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}