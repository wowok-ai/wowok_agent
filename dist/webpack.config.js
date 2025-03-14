import path from 'path';
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'this' // 兼容Node和浏览器环境
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }]
    }
};
