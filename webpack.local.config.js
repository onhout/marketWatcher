const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const entryPoints = {
    vendor: [
        // 'jquery',
        // 'popper.js',
        // 'bootstrap',
        'react',
        'react-dom',
        // 'd3',
        // 'techan',
        'global/index.scss'
    ],
    main: ['main/js/main', 'main/sass/main.scss'],
    dashboard: ['dashboard/js/dashboard', 'dashboard/sass/dashboard.scss'],
    market: ['market/js/market', 'market/sass/market.scss']
}

module.exports = {
    context: __dirname,

    entry: entryPoints, // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

    output: {
        path: path.resolve('./static/dist/'),
        publicPath: '/static/dist/',
        chunkFilename: '[id]-[hash].chunk.js',
        filename: "[name]-[hash].js",
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            // $: 'jquery',             // bootstrap 3.x requires
            // jQuery: 'jquery',
            // Popper: ['popper.js', 'default'],      // popper
            // react: 'react',      // react
            // "window.d3": 'd3',      // d3
            // d3: 'd3',      // d3
            // techan: 'techan',     // d3
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        new CleanWebpackPlugin('./static/dist/'),
        // new webpack.optimization.splitChunks({
        //     name: 'vendor',
        //     filename: 'vendor-[hash].js',
        //     cacheGroups: {
        //         commons: {
        //             name: "commons",
        //             chunks: "initial",
        //             minChunks: 2
        //         }
        //     }
        // }),
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
                vendor: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
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