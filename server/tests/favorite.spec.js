import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './helper/fake';
import db from '../src/models';

const should = chai.should();

chai.use(chaiHttp); 

import { token, userId } from './user.spec';
import { id } from './recipe.spec';
/////////////////////////
/// *** Favorites *** //
///////////////////////

describe('Favorite Recipes Controller', () => { 
    
  it('should return error for invalid params', (done) => {
    chai.request(app)
      .post('/api/v1/users/x3s/recipes')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message').equal('Parameter must be a number!');
        done();
      });
  });  
    
  it('should return error for recipe that does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/users/12202/recipes')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Not found!');
        done();
      });
  });  
        
  it('should Favorite a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/users/'+id+'/favorites')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Favorited!');
        done();
      });
  }); 

  it('should get Favorited recipes', (done) => {
    chai.request(app)
      .get('/api/v1/users/'+id+'/favorites')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Favorited!');
        done();
      });
  }); 
        
  it('should remove already favorited recipe from DB', (done) => {
    chai.request(app)
      .post('/api/v1/users/'+id+'/favorites')
      .set('x-token', token)
      .end((err, res) => {
        console.log(err)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe removed from Favorites');
        done();
      });
  });
        
    
    
  it('should let authorized user delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/'+id)
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
            
        done();
      });
  });  
});