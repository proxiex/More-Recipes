import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './helper/fake';
import db from '../src/models';

const should = chai.should();

chai.use(chaiHttp); 
import { token, userId } from './user.spec';
import { id } from './recipe.spec';

describe('Review Controller', () => {
  const reviews = {
    reviews: 'this is just a review that will be deleted!'
  };

  it('should throw an error if recipe is not found', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/30008/reviews')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(404)
      res.body.should.have.property('message').equal('Recipe Not found!')
      done();
    });
  });

  it('should throw an error for empty review', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/'+id+'/reviews')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(400)
      res.body.should.have.property('message').equal('Please enter Review')
      done();
    });
  });

  it('should message if no reiciew for a specific recipe', (done) => {
    chai.request(app)
    .get('/api/v1/recipes/'+id+'/reviews')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('reviews').equal('No reviews yet')
      done();
    });
  });


  it('should create review for specific recipe', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/'+id+'/reviews')
    .set('x-token', token)
    .send(reviews)
    .end((err, res) => {
      res.should.have.status(201)
      res.body.should.have.property('review')
      done();
    });
  });

  it('should get reviews of a specific recipe', (done) => {
    chai.request(app)
    .get('/api/v1/recipes/'+id+'/reviews')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('reviews')
      done();
    });
  });

});
