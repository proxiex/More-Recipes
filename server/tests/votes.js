import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './helper/fake';
import db from '../src/models';

const should = chai.should();

chai.use(chaiHttp); 
import { token, userId } from './user.spec';
import { id } from './recipe.spec';

describe('Vote Controller', () => {

  it('should return error for recipe not found', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/44444/votes?vote=up')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(404)
      res.body.should.have.property('message').equal('Recipe Not found!')
      done();
    })
  });

  it('should return error for invalid query', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/'+id+'/votes?vote=xup')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(400)
      res.body.should.have.property('message').equal('Invalid query')
      done();
    })
  });

  it('should up vote a specific recipe', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/'+id+'/votes?vote=up')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(201)
      res.body.should.have.property('userVotes');
      res.body.should.have.property('recipeDetails');
      res.body.should.have.property('message').equal('You liked this recipe')
      done();
    })
  });

  it('should up vote a specific recipe', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/'+id+'/votes?vote=up')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('userVotes');
      res.body.should.have.property('recipeDetails');
      done();
    })
  });

  it('should up vote a specific recipe', (done) => {
    chai.request(app)
    .post('/api/v1/recipes/'+id+'/votes?vote=down')
    .set('x-token', token)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('userVotes');
      res.body.should.have.property('recipeDetails');
      res.body.should.have.property('message').equal('Sorry you did not like it')
      done();
    })
  });

  


})
