let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('../webpack.local.config.js');
config.plugins.push(new webpack.HotModuleReplacementPlugin())

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    // hot: true,
    inline: true,
    historyApiFallback: true,
    headers: {"Access-Control-Allow-Origin": "*"}
}).listen(3000, '192.168.0.18', function (err, result) {
    if (err) {
        console.log(err)
    }
    console.log('Listening at 192.168.0.18:3000')
});