import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import users from './routes/users';
import recipes from './routes/recipes';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';

const app = express();
const compiler = webpack(webpackConfig);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes 
app.use('/api/v1/users', users);
app.use('/api/v1/recipes', recipes);


app.use(webpackMiddleware(compiler));

app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../client/index.html'));
});

app.use((req, res, next) => {
  const err = res.status(404).send({
    message: '404: Sorry Page Not Found!'
  });
  next(err);
});

const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port,  () => console.log('Running on localhost: '+port));

export default app;