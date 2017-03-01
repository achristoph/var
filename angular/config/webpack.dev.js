var webpack = require('webpack')

module.exports = {
    entry: {
        app: 'src/app.ts',
        vendor: 'src/vendor.ts'
    },
    output: {
        filename: '[name].js'
    },
    rules: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        },
        {
            test: /\.css$/,
            loaders: 'style-loader!css-loader'
        }
    ]
}