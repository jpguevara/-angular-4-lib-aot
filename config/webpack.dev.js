var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var packageRoot = path.resolve(path.join(__dirname, '/..'));
console.log('packageRoot=', packageRoot);
module.exports = {
    entry: {
        'app': './src/index.ts' // AoT compilation
    },

    output: {
        path: path.join(packageRoot, '.dist/'),
        filename: 'js/[name]-[hash:8].bundle.js',
        chunkFilename: 'js/[id]-[hash:8].chunk.js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular-router-loader?aot=true&genDir=.aot/',
                    'angular2-template-loader'
                ]
            },
            /* Embed files. */
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }),
                exclude: [
                    path.resolve(packageRoot, "src")
                ]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: [
                    path.resolve(packageRoot, "src")
                ]
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        // new FaviconsWebpackPlugin({
        //     logo: './src/icon.png',
        //     prefix: 'assets/'
        // }),
        new CleanWebpackPlugin(
            [
                path.resolve(packageRoot, ".dist/"),
                path.resolve(packageRoot, ".aot/")
            ],
            { root: packageRoot }
        ),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: false
        }),

        new ExtractTextPlugin("styles.css")
    ]
};