const path = require('path')
var glob = require('glob');
const webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extract = new ExtractTextPlugin('css/[name].[contenthash].css')
const MultipageWebpackPlugin = require('multipage-webpack-plugin');
let ENV = process.env.NODE_ENV;
let pathConfig = require('./src/config/path-config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let pudctionPlugin = require('./src/config/plugin-config.js')
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

let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const vueLoaderConfig = require('./src/config/vue-loader.config')[ENV];
/**
 * 是否是线上环境
 */
const ENV_DEV = 'dev';
const isDev = () => process.env.NODE_ENV == ENV_DEV;
const isOnline = () => process.env.NODE_ENV == 'online'

const extractCSS = new ExtractTextPlugin({filename: 'statics/styles/[name]/[name].[contenthash].css', allChunks: true})
const extractLESS = new ExtractTextPlugin({filename: 'statics/styles/[name]/[name].[contenthash].css', allChunks: true})

/**
 * 获取entry and chunck
 */
const entries = {};
let getEntry = (entry) => {
    glob
        .sync(entry)
        .forEach(path => {
        const chunk = path
            .split('pages/')[1]
            .split('/')[0];
    if (!isDev()) {
        entries[chunk] = [path]
    } else {
        entries[chunk] = [hotMiddlewareScript, path];
    }

})
    return entries;
}

module.exports = {
    target: 'web',
    entry: getEntry('./src/pages/**/*.main.js'),
    output: {
        filename: isDev()
            ? 'statics/scripts/page/[name]/[name].js'
            : 'statics/scripts/page/[name]/[name].[chunkhash].js?[chunkhash]',
        path: path.resolve(__dirname, './web/'),
        chunkFilename: 'statics/scripts/chunk/chunk[id].js?[chunkhash]',
        publicPath: pathConfig.publicPath
    },
    module: {
        rules: [
            vueLoaderConfig, {
                test: /\.js$/,  //loader 转换文件
                loader: 'babel-loader',
                exclude: /node_modules/,
                options:{
                    babelrc:false,
                    extends:require.resolve('./src/config/.babelrc')
                }
            }, {
                test: /\.css$/, //loader 转换文件
                use: ExtractTextPlugin.extract([  //转换时使用哪个loader
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer]
                        }
                    }
                ])
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer]
                        }
                    },
                    'less-loader'
                ])
            }, {
                test: /\.(png|jpg|gif|eot|woff|svg|ttf|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'statics/images/[name].[hash].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.exec\.js$/,
                use: ['script-loader']
            },
            // {     test: require.resolve("./statics/scripts/common/jquery-1.11.1"), use:
            // "expose-loader?$" }
        ]
    },
    plugins: [  //扩展插件
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
               from:path.resolve(__dirname,'src/assets/mp3.mp3'),
               to:path.resolve(__dirname,'web/statics/assets')
             },
             {
                from:path.resolve(__dirname,'src/assets/indexTop.png'),
                to:path.resolve(__dirname,'web/statics/assets')
              }

        ]),
        new MultipageWebpackPlugin({
            // replace [name] in template path
            htmlTemplatePath: path.resolve(__dirname, './src/pages/[name]/index.html'),
            // some other options in htmlWebpackPlugin
            htmlWebpackPluginOptions: {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
            },
            templatePath: path.resolve(__dirname, './web/html/pages/[name]/'),
            bootstrapFilename: 'statics/[name]/inline.chunk.js'
        }),
        extractCSS,
        extractLESS
    ].concat(isOnline()
        ? [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack
                .optimize
                .UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
        ]
        : [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]),
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'prjConf$': pathConfig.pageConfig,
            'routerPath$':pathConfig.routerConfig
           // 'videoplayercss$':'video.js/dist/video-js.css'
        },
        extensions: ['.js', '.vue', '.json']
    },
    devServer: {
        host: '127.0.0.1',
        port: 8090,
        historyApiFallback: false,
        contentBase: __dirname + '/web/',
        inline: true,
        hot: true
    },
    devtool: isOnline
        ? false
        : "#eval-source-map"
}
