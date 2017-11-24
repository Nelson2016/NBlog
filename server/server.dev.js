import Koa from 'koa';
import path from 'path';
import views from 'koa-views';
import webpack from 'webpack';
import asset from 'koa-static';
import config from '../config/config';
import appRoutes from '../router/clientRouter';
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware';
import webpackDevConfig from '../webpack/webpack.dev.config';

const isDev = process.env.NODE_ENV === 'development';
const isPro = process.env.NODE_ENV === 'production';

const app = new Koa(),
    rootPath = path.resolve(__dirname, '..'),
    viewsPath = path.resolve(rootPath, 'views'),
    assetPath = path.resolve(rootPath, 'dist'),
    compile = webpack(webpackDevConfig),
    port = isPro ? config.port.prod : config.port.dev;

//处理试图
app.use(views(viewsPath, {map: {html: 'nunjucks'}}));
//处理静态资源
app.use(asset(assetPath));
//使用前段路由在服务端渲染Components
app.use(appRoutes);
//HMR热加载
if (isDev) {
    app.use(devMiddleware(compile, {
        noInfo: false,
        publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(hotMiddleware(compile, {}))
}
//启动服务器
app.listen(port, function () {
    console.log(`👍====Server is running at localhost:${port}====👍`);
});