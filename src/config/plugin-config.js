let config = [];
let ENV = process.env.NODE_ENV;
let path = require('path');
const webpack = require('webpack')
if (ENV === 'online') {
    config = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "production"
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
}

module.exports= config;