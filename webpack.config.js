const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScript/contentScript.ts'),
    },
    module: {
        rules: [
            { use: 'ts-loader', test: /\.tsx?$/, exclude: /node_modules/ },
            { use: ['style-loader', 'css-loader'], test: /\.css$/i },
            { type: 'asset/resource', test: /\.(jpg|png|woff|eot|ttf|svg)$/ },
        ],
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
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
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
