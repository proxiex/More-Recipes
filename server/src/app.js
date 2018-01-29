import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import users from './routes/users';
import recipes from './routes/recipes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/users', users);
app.use('/api/v1/recipes', recipes);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to more recipe API'
}));

app.use((req, res, next) => {
  const err = res.status(404).send({
    message: '404: Sorry Page Not Found!'
  });
  next(err);
});

export default app;
