// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = { // eslint-disable-line no-undef
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/template.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        extensions: [' ', '.tsx', '.ts', '.js'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
