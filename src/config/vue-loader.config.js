let ENV = process.env.NODE_ENV;
let pathConfig = require('./path-config.js')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * vue-loader分为三部分
 * dev 开发环境 关闭extract
 * test 测试环境 打开extract， 设置资源的basePath
 * online 线上环境 打开extract  资源basePath设置为制定地址
 */

const autoprefixer = require('autoprefixer')({
    browsers: [
        "ie >= 9",
        "ie_mob >= 9",
        "ff >= 26",
        "chrome >= 30",
        "safari >= 6",
        "opera >= 23",
        "ios >= 7",
        "android >= 4.0",
        "bb >= 10"
    ]
})

module.exports = {
    'dev': {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: 'vue-style-loader!css-loader!less-loader',
                        css: 'vue-style-loader!css-loader'
                    },
                    postcss: [autoprefixer]
                }
            }
        ]
    },
    "test": {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css : ExtractTextPlugin.extract({
                            use: ['css-loader'],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        }),
                        less : ExtractTextPlugin.extract({
                            use: [
                                'css-loader', 'less-loader'
                            ],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        })
                    },
                    postcss: [autoprefixer]
                }
            }
        ]
    },
    "testfat": {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css : ExtractTextPlugin.extract({
                            use: ['css-loader'],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        }),
                        less : ExtractTextPlugin.extract({
                            use: [
                                'css-loader', 'less-loader'
                            ],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        })
                    },
                    postcss: [autoprefixer]
                }
            }
        ]
    },
    "testuat": {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css : ExtractTextPlugin.extract({
                            use: ['css-loader'],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        }),
                        less : ExtractTextPlugin.extract({
                            use: [
                                'css-loader', 'less-loader'
                            ],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        })
                    },
                    postcss: [autoprefixer]
                }
            }
        ]
    },
    'online': {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css : ExtractTextPlugin.extract({
                            use: ['css-loader'],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        }),
                        less : ExtractTextPlugin.extract({
                            use: [
                                'css-loader', 'less-loader'
                            ],
                            fallback: 'vue-style-loader',
                            publicPath: pathConfig.publicPath
                        })
                    },
                    postcss: [autoprefixer]
                }
            }
        ]
    }
}