const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
    },
    module: {
        rules: [{ use: 'ts-loader', test: /\.tsx?$/, exclude: /node_modules/ }],
    },
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist'),
                },
            ],
        }),
        ...getHTMLPLugins(['popup', 'options']),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve('dist'),
    },
};

function getHTMLPLugins(chunksArray) {
    return chunksArray.map(
        chunk =>
            new HTMLPlugin({
                title: 'React Extension',
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
