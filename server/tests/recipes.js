import chai from 'chai';
import chaiHttp from 'chai-http';
//import db from '../src/models';
import app from '../src/app';
import faker from 'faker';

const should = chai.should();
chai.use(chaiHttp);

const x = {
  recipeName: 'Rice and Beans',
  mealType: 'Lunch',
  dishType: 'All',
  method: 'first of all ',
  ingredients: [ 'rice', 'beancs','oil' ]
};

describe('More Recipes', () => {
  it('shoud get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
    
  it('shoud return 404 for un defined page', (done) => {
    chai.request(app)
      .get('/xox')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('Recipes', () => {
  
  it('shoud return list of recipes', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it('shoud delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/recipes/1')
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
    
  /* const review = {
    userId: 1,
    review: 'thisis ok i like it.'
  };

  it('should add a new recipe', (done) => {
    chai.request(app)
      //.set('Content-Type', 'application/json')
      .post('/api/recipes/1/reviews')
      .send(review)
      .end((err, res) => {
        res.should.have.status(201);
        console.log(res);
        done();
      });
  }); */
});