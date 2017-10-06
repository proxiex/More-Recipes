import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import users from './routes/users';
import recipes from './routes/recipes';

/*
import upvote from './routes/upvotes'; */

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

process.env.SECRET_KEY;


app.use('/api/v1/users', users);
app.use('/api/v1/recipes', recipes);
//app.use('/api', upvote);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to More Recipes!'
  });
});

app.use((req, res, next) => {
  const err = res.status(404).send({
    message: '404: Sorry Page Not Found!'
  });
  next(err);
});

export default app;