import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
// import users from './routes/users';

import recipes from './routes/recipes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/api/users', users);
app.use('/api/recipes', recipes);

app.get('/', (req, res) => {
  res.status(200).send({
    Message: 'Welcome to More Recipes!'
  });
});

app.use((req, res, next) => {
  const err = res.status(404).send({
    ERrOR: '404: Sorry Page Not Found!'
  });
  next(err);
});

export default app;