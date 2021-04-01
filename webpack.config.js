const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/FileBrowser.ts',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/file-browser.bundle.js',
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 9000
    }
}