const path = require("path");
const webpack = require('webpack');
// const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: [
        'webpack-dev-server/client?http://192.168.0.18:3000',
        'webpack/hot/only-dev-server',
        './src/index',
    ],
    output: {
        path: path.resolve('./static/'),
        publicPath: 'http://192.168.0.18:3000/static/',
        // publicPath: '/static/',
        chunkFilename: '[name].bundle.js',
        filename: "[name].js",
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), //VERY IMPORTANT, instead of using HOT in server.js
        new webpack.ProvidePlugin({}),
        new ExtractTextPlugin('[name].styles.css', {
            allChunks: true
        }),
        new CleanWebpackPlugin('./static/'),
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                commons: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                }
            }
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {presets: ['react', 'es2015', 'stage-3'], plugins: ['transform-runtime']}
            }, // to transform JSX into JS
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader!resolve-url-loader!sass-loader?sourceMap"
                })
            }, //to transform less into CSS
            {test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|gif|svg)(\?.*$|$)/, loader: 'url-loader?limit=100000'},//changed the regex because of an issue of loading less-loader for font-awesome.
            {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})},
        ],

    },
    resolve: {
        modules: [
            path.resolve('./src'),
            './node_modules'
        ],
        extensions: ['.js', '.jsx']
    }
};