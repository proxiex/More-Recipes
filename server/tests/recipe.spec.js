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
    method: 'method',
    ingredients: 'ingredients, ingredients, ingredients, ingredients'
  };
  
  it('should return message if no recipe has been created', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message').equal('No recipes have yet been created!')
        done();
      });
  });

  it('should not let unauthorized user create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });
      
  it('should not let user with un-verified Token create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .set('x-token', 'this sia bungo iasd ionoiapdif')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Token could not be authenticated');
        done();
      });
  });
      
  it('should let authorized user create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .set('x-token', token)
      .end((err, res) => {
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
      method: 'method',
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
  
  it('should return message if there is nothing to update', (done) => {
    const updateRecipe = {}
    chai.request(app)
      .put('/api/v1/recipes/'+id)
      .send({})
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Nothing to update!');
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
        res.body.should.have.property('recipeDetails')
        res.body.should.have.property('message').equal('Succesfully Updated Recipe');
        done();
      });
  });

  describe('GET', () => {
    it('should get all recipe', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
            
          done();
        });
    });

    it('should get popular recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/popular')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('popularRecipes')
          done();
        });
    });
        

    it('should return message if search result of recipes not found', (done) => {
      const search = 'this is good'
      chai.request(app)
        .get('/api/v1/recipes?search='+search)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('message').equal('Your search - '+search+' - did not matched any recipe')
          done();
        });
    });

    it('should return search result of recipes found', (done) => {
      const search = 'recipeName'
      chai.request(app)
        .get('/api/v1/recipes?search='+search)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('totalCount');
          res.body.should.have.property('pageCount');
          res.body.should.have.property('recipes');
          done();
        });
    });

    it('should get all recipe sorted by upvotes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upVotes&order=des')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('recipe');
          done();
        });
    });
    
    it('should get all recipe', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('totalCount');
          res.body.should.have.property('pageCount');
          res.body.should.have.property('recipes');
          done();
        });
    });

    
    it('should get details of a specifc reicpe', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/'+id)
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('recipeDetails')
        res.body.should.have.property('reviews')
        res.body.should.have.property('userVotes')
        done();
      });
    });

    it('should return error for reicpe that does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/23232')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe not found')
        done();
      });
    });
    

    it('should get details of a specifc reicpe for unauthenticated users', (done) => {
      chai.request(app)
      .get('/api/v1/recipes/'+id)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('recipeDetails')
        res.body.should.have.property('reviews')
        res.body.should.have.property('userVotes')
        done();
      });
    });

    it('should get recipes created by user', (done) => {
      chai.request(app)
      .get('/api/v1/users/recipe')
      .set('x-token', token)      
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('totalCount');
        res.body.should.have.property('pageCount');
        res.body.should.have.property('recipes');
        done();
      });
    });
  });
  
  it('should return message if no recipes have been created by user', (done) => {
    chai.request(app)
    .get('/api/v1/users/recipe?userId=3')
    .set('x-token', token)      
    .end((err, res) => {
      res.should.have.status(404);
      res.body.should.have.property('message').equal('This user has not created any recipes yet!')
      done();
    });
  });

  // Delete Recipe

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

  it('should return error for recipe not found', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/323332')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Not found!');
        done();
      });
  });

});