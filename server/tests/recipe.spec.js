import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './helper/fake';
import db from '../src/models';

import { token, userId } from './user.spec';
export let id;

const should = chai.should();

chai.use(chaiHttp); 

/////////////////////////
//// *** RECIPES *** ///
///////////////////////

describe('Recipes Controller', () => {
  const recipes = {
    recipeImage: 'http://www.url.here.com/this-cool',
    recipeName: 'recipeName',
    description: 'description',
    instructions: 'method',
    ingredients: 'ingredients, ingredients, ingredients, ingredients'
  };
  
  it('should not let unauthorized user create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });
      
  it('should not let user with un-verified Token create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .set('x-token', 'this sia bungo iasd ionoiapdif')
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
          
        done();
      });
  });
      
  it('should let authorized user create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .set('x-token', token)
      .end((err, res) => {
        console.log(res.body);
        id = res.body.id;
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
          
        done();
      });
  });
    
  it('should let authorized user Modify specific recipe', (done) => {
    const updateRecipe = {
      recipeImage: 'http://www.url.here.com/this-cool',
      recipeName: 'recipeName',
      description: 'description',
      instructions: 'method',
      ingredients: 'ingredients, ingredients, ingredients, ingredients'
    }
    chai.request(app)
      .put('/api/v1/recipes/'+id)
      .send(updateRecipe)
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
          
        done();
      });
  });
  
  it('should let authorized user Modify specific recipe', (done) => {
    const updateRecipe = {}
    chai.request(app)
      .put('/api/v1/recipes/'+id)
      .send(updateRecipe)
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
          
        done();
      });
  });

  it('should let authorized user Modify specific recipe', (done) => {
    const updateRecipe = {
      recipeImage: 'http://www.url.here.com/this-cool',
      recipeName: 'recipeName',
      description: 'description',
      instructions: 'method',
      ingredients: 'ingredients, ingredients, ingredients, ingredients'
    }
    chai.request(app)
      .put('/api/v1/recipes/34')
      .send(updateRecipe)
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
          
        done();
      });
  });

  it('should get all recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
          
        done();
      });
  });
      
  it('should not let unauthorized user delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/'+id)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
          
        done();
      });
  }); 
    
  it('should return error for invalid params', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/me')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message').equal('Parameter must be a number!');
        done();
      });
  });  
  
});