import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './helper/fake';
import db from '../src/models';

const should = chai.should();

chai.use(chaiHttp);

let token;

describe('More Recipes', () => {
  it('should get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.be.json;
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });
  });
  
  it('should get 404 page', (done) => {
    chai.request(app)
      .get('/ssammi')
      .end((err, res) => {
        res.should.be.json;
        res.body.should.be.a('object');
        res.should.have.status(404);
        done();
      });
  });
});


describe('Users', () => {
  db
    .users
    .destroy({
      cascade: true, 
      truncate: true
    });
  
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.newUsers)
      .end((err, res) => {
        res.should.be.json;
        res.body.should.be.a('object');
        res.should.have.status(201);
        done();
      });
  });

  it('should not let user sign up with the same email twice', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.newUsers)
      .end((err, res) => {
        //console.log(err)
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('message').equal('User already Exist!');
        done();
      });
  });
    
  it('should not let user sign up with no email address', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noEmailUsers)
      .end((err, res) => {
        //console.log(err)
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Please Enter Email');
        done();
      });
  });
     
  it('should let users sign in /signin POST', (done) => {
    const User = {
      username: fakeData.newUsers.email,
      password: '11110000'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(User)
      .end((err, res) => {
        token = res.body.Token;
        // console.log(token);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Sign in Successful!');
        res.body.should.have.property('Token');
        done();
      });
  });
    
  it('should NOT let users sign in /signin POST', (done) => {
    const User = {
      username: 'non existend',
      password: '11110000'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(User)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Incorrect signin credentials!');
        done();
      });
  });

});

describe('Recipes', () => {
  const recipes = {
    recipeName: 'recipeName',
    mealType: 'mealType',
    description: 'description',
    method: 'method',
    ingredients: 'ingredients, ingredients, ingredients, ingredients'
  };

  it('should not let unauthorized user create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });
    
  it('should not let user with un-verified Token create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .set('x-token', 'this sia bungo iasd ionoiapdif')
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });
    
  it('should let authorized user create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipes)
      .set('x-token', token)
      .end((err, res) => {
        console.log(err);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });
  
  it('should let authorized user Modify new recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .send({
        method: 'This is a simple meal that we all need to have at the end of the day so enjoy'
      })
      .set('x-token', token)
      .end((err, res) => {
        console.log(err);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });

  it('should get all recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(200);
        res.should.be.json;
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });
    
  it('should let unauthorized user delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(401);
        res.should.be.json;
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  }); 
  
  it('should return error for invalid params', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/me')
      .set('x-token', token)
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message').equal('Parameter must be a number!');
        done();
      });
  });  

});

describe('Favorite Recipes', () => { 
  it('should return error for recipe that does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/12202/favorites')
      .set('x-token', token)
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Not found!');
        done();
      });
  });  
    
  it('should Favorite a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/favorites')
      .set('x-token', token)
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Favorited!');
        done();
      });
  }); 
    
  it('should return error for recipe already favorited', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/favorites')
      .set('x-token', token)
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe already Favorited');
        done();
      });
  });
    


  it('should let authorized user delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .set('x-token', token)
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(200);
        res.should.be.json;
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });  
});