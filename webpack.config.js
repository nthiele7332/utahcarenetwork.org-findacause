const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@config': path.resolve(__dirname, 'src/config/'),
        },
    },
};
