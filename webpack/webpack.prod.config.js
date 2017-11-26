let fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    autoPrefix = require('autoprefixer'),
    root = path.resolve(__dirname, '..'),
    postCssImport = require('postcss-import'),
    extractTextPlugin = require('extract-text-webpack-plugin');


//客户端/服务端打包通用配置
const baseConfig = {
    context: path.resolve(__dirname, '..'),//设置解析入口
    output: {
        path: path.resolve(root, 'dist'),
        filename: "[name].bundle.js",
        publicPath: path.resolve(root, 'dist/'),
    },
    resolve: {
        extensions: [".js", ".jsx", '.scss']
    },
    module: {
        rules: [
            //编译js/jsx
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'env', 'stage-0'],
                        plugins: ['transform-runtime']
                    }
                },
            },
            {
                //编译通过import动态引入的scss/css
                test: /\.(css|scss)?$/,
                exclude: /node_modules/,
                use: extractTextPlugin.extract({
                    fallback: 'isomorphic-style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {importLoaders: 1, modules: true, localIdentName: '[name]-[local]-[hash:base64:8]'}
                        },
                        {
                            loader: "postcss-loader", options: {
                            plugins: () => [autoPrefix({browsers: ['last 5 versions']}), postCssImport()]//自动添加浏览器前缀
                        }
                        },
                        {loader: "sass-loader"}
                    ]
                }),
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "[hash:8].[ext]",
                            publicPath: '/',
                            outputPath: 'images/',
                        },
                    },
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                    }
                }]
            }
        ]
    },
    plugins: getPlugins()
};

//客户端打包配置
const clientConfig = Object.assign({}, baseConfig, {
    entry: {
        main: './views/app.js',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
        ]
    }
});

//服务端打包配置
const serverConfig = Object.assign({}, baseConfig, {
    entry: {
        server: './server/server.dev',
    },
    target: 'node',
    externals: getExternals(),
    node: {
        __filename: true,
        __dirname: true,
    },
});

//插件列表
function getPlugins() {
    return [
        new extractTextPlugin('style.bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    ]
}

//排除扩展包
function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`;
            return externals
        }, {})
}

module.exports = [clientConfig, serverConfig]