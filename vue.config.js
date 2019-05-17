const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const path = require("path")


// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
    // 配置 axios 代理请求
    devServer: {
        proxy: {
            '/data': {
                target: 'http://www.demo.com',
                // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
                    '^/api': '/'
                }
            }
        }
    },
    lintOnSave: true,
    configureWebpack: config => {
        if (process.env.VUE_APP_ENV === 'production') {
            return {
                // productionSourceMap: false,
                output: {
                    // outputDir: path.resolve(__dirname, './dist/assets'), //打包的文件路径
                    // publicPath: 'assets/', //此输出目录对应的公开 URL   需要以 / 结尾
                    filename: 'build-[hash].js', //此选项决定了每个输出 bundle 的名称   使用参数：例：filename: "[name].[hash].[id].bundle.js"
                    chunkFilename: '[id].build-[hash].js' //此选项决定了非入口(non-entry) chunk 文件的名称
                },
                plugins: [
                    new ExtractTextPlugin({ //将js中引入的css分离的插件
                        filename: 'focus.index.css' //分离出的css文件名
                    }),
                    // css 压缩代码，将下面代码注释掉
                    new OptimizeCSSPlugin({
                        assetNameRegExp: /\.optimize\.css$/g,
                        cssProcessor: require('cssnano'),
                        cssProcessorPluginOptions: {
                            preset: ['default', {
                                discardComments: {
                                    removeAll: true
                                }
                            }],
                        },
                        canPrint: true
                    }),
                    // 压缩js代码，将下面代码注释掉
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: { //压缩配置
                                warnings: false // 不显示警告
                            }
                        },
                        test: /\.js(\?.*)?$/i,
                        include: /\/src/,
                        exclude: /\/node_modules/,
                        sourceMap: false,
                        parallel: true
                    }),
                    new HtmlWebpackPlugin({
                        filename: 'index.html', //生成的html的文件名
                        template: './public/index.html', //依据的模板
                        inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
                        minify: { //压缩配置
                            removeComments: true, //删除html中的注释代码
                            collapseWhitespace: true, //删除html中的空白符
                            removeAttributeQuotes: true //删除html元素中属性的引号
                        },
                        chunksSortMode: 'dependency' //按dependency的顺序引入
                    })
                ]
            }
        } else if (process.env.VUE_APP_ENV === 'sandbox') {
            return {
                output: {
                    // outputDir: path.resolve(__dirname, './dist/assets'), //打包的文件路径
                    // publicPath: 'assets/', //此输出目录对应的公开 URL   需要以 / 结尾
                    filename: 'build-[hash].js', //此选项决定了每个输出 bundle 的名称   使用参数：例：filename: "[name].[hash].[id].bundle.js"
                    chunkFilename: '[id].build-[hash].js' //此选项决定了非入口(non-entry) chunk 文件的名称
                },
                plugins: [
                    new CompressionWebpackPlugin({
                        asset: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 10240,
                        minRatio: 0.8
                    }),
                    new ExtractTextPlugin({ //将js中引入的css分离的插件
                        filename: 'focus.index.css' //分离出的css文件名
                    }),
                    // css 压缩代码，将下面代码注释掉
                    new OptimizeCSSPlugin({
                        assetNameRegExp: /\.optimize\.css$/g,
                        cssProcessor: require('cssnano'),
                        cssProcessorPluginOptions: {
                            preset: ['default', {
                                discardComments: {
                                    removeAll: true
                                }
                            }],
                        },
                        canPrint: true
                    }),
                    // 压缩js代码，将下面代码注释掉
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: { //压缩配置
                                warnings: false // 不显示警告
                            }
                        },
                        test: /\.js(\?.*)?$/i,
                        include: /\/src/,
                        exclude: /\/node_modules/,
                        sourceMap: true,
                        parallel: true
                    }),
                    new HtmlWebpackPlugin({
                        filename: 'index.html', //生成的html的文件名
                        template: './public/index.html', //依据的模板
                        inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
                        minify: { //压缩配置
                            removeComments: true, //删除html中的注释代码
                            collapseWhitespace: true, //删除html中的空白符
                            removeAttributeQuotes: true //删除html元素中属性的引号
                        },
                        chunksSortMode: 'dependency' //按dependency的顺序引入
                    })
                ]
            }
        } else if (process.env.VUE_APP_ENV === 'uat') {
            return {
                output: {
                    // outputDir: path.resolve(__dirname, './dist/assets'), //打包的文件路径
                    // publicPath: 'assets/', //此输出目录对应的公开 URL   需要以 / 结尾
                    filename: 'build-[hash].js', //此选项决定了每个输出 bundle 的名称   使用参数：例：filename: "[name].[hash].[id].bundle.js"
                    chunkFilename: '[id].build-[hash].js' //此选项决定了非入口(non-entry) chunk 文件的名称
                },
                plugins: [
                    new ExtractTextPlugin({ //将js中引入的css分离的插件
                        filename: 'focus.index.css' //分离出的css文件名
                    }),
                    // css 压缩代码，将下面代码注释掉
                    new OptimizeCSSPlugin({
                        assetNameRegExp: /\.optimize\.css$/g,
                        cssProcessor: require('cssnano'),
                        cssProcessorPluginOptions: {
                            preset: ['default', {
                                discardComments: {
                                    removeAll: true
                                }
                            }],
                        },
                        canPrint: true
                    }),
                    // 压缩js代码，将下面代码注释掉
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: { //压缩配置
                                warnings: false // 不显示警告
                            }
                        },
                        test: /\.js(\?.*)?$/i,
                        include: /\/src/,
                        exclude: /\/node_modules/,
                        sourceMap: true,
                        parallel: true
                    }),
                    new HtmlWebpackPlugin({
                        filename: 'index.html', //生成的html的文件名
                        template: './public/index.html', //依据的模板
                        inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
                        minify: { //压缩配置
                            removeComments: true, //删除html中的注释代码
                            collapseWhitespace: true, //删除html中的空白符
                            removeAttributeQuotes: true //删除html元素中属性的引号
                        },
                        chunksSortMode: 'dependency' //按dependency的顺序引入
                    })
                ]
            }
        } else if (process.env.NODE_ENV === 'sit') {
            // 为开发环境修改配置...
            return {
                output: {
                    // outputDir: path.resolve(__dirname, './dist/assets'), //打包的文件路径
                    // publicPath: 'assets/', //此输出目录对应的公开 URL   需要以 / 结尾
                    filename: 'build-[hash].js', //此选项决定了每个输出 bundle 的名称   使用参数：例：filename: "[name].[hash].[id].bundle.js"
                    chunkFilename: '[id].build-[hash].js' //此选项决定了非入口(non-entry) chunk 文件的名称
                },
                plugins: [
                    new ExtractTextPlugin({ //将js中引入的css分离的插件
                        filename: 'focus.index.css' //分离出的css文件名
                    }),
                ]
            }
        } else if (process.env.NODE_ENV === 'development') {
            // 为开发环境修改配置...
            return {
                output: {
                    // outputDir: path.resolve(__dirname, './dist/assets'), //打包的文件路径
                    // publicPath: 'assets/', //此输出目录对应的公开 URL   需要以 / 结尾
                    filename: 'build-[hash].js', //此选项决定了每个输出 bundle 的名称   使用参数：例：filename: "[name].[hash].[id].bundle.js"
                    chunkFilename: '[id].build-[hash].js' //此选项决定了非入口(non-entry) chunk 文件的名称
                },
                plugins: [
                    new ExtractTextPlugin({ //将js中引入的css分离的插件
                        filename: 'focus.index.css' //分离出的css文件名
                    }),
                ]
            }
        }
    }
}