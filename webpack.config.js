const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: { popup: path.resolve('src/popup/popup.tsx') },
    module: {
        rules: [{ use: 'ts-loader', test: /\.tsx?$/, exclude: /node_modules/ }],
    },
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/manifest.json'),
                    to: path.resolve('dist'),
                },
            ],
        }),
        new HTMLPlugin({
            title: 'React Extension',
            filename: 'popup.html',
            chunk: ['popup'],
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve('dist'),
    },
};
