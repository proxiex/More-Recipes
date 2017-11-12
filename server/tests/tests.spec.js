import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './helper/fake';
import db from '../src/models';

const should = chai.should();

chai.use(chaiHttp);

let token;
let id;

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

/////////////////////////
//// *** USERS *** ///
///////////////////////

describe('Users', () => {
  /* db
    .users
    .destroy({
      cascade: true, 
      truncate: true
    }); */
    
/*   it('should not let user sign up with no first name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noFirstNameUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Please Enter First Name');
        done();
      });
  });
    
  it('should not let user sign up with no last name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noLastNameUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Please Enter Last Name');
        done();
      });
  }); */
  
  it('should not let user sign up with no username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noUsernameUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('username').equal('Please Enter Username');
        done();
      });
  });
  
  it('should not let user sign up with no email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noEmailUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('email').equal('Please Enter Email');
        done();
      });
  });
  
  it('should not let user sign up with no password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noPasswordUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('password').equal('Please Enter password');
        done();
      });
  });
    
  it('should not let user sign up with password less than 6', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.lessPass)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('password').equal('Password is too short!');
        done();
      });
  });
  
/*   it('should not let user sign up with password mismatch', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.passMismatchUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Password Missmatch!');
        done();
      });
  }); */
    
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
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
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
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Sign in Successful!');
        res.body.should.have.property('Token');
        done();
      });
  });
    
  it('should NOT let users sign in with wrong credentials /signin POST', (done) => {
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

/////////////////////////
//// *** RECIPES *** ///
///////////////////////

describe('Recipes', () => {
  const recipes = {
    recipeImage: 'http://www.url.here.com/this-cool',
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
        id = res.body.id;
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });
  
  it('should let authorized user Modify new recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/'+id)
      .send({
        method: 'This is a simple meal that we all need to have at the end of the day so enjoy'
      })
      .set('x-token', token)
      .end((err, res) => {
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
        res.should.have.status(200);
        res.should.be.json;
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });
    
  it('should let unauthorized user delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/'+id)
      .end((err, res) => {
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
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Not found!');
        done();
      });
  });  
    
  it('should Favorite a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/'+id+'/favorites')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe Favorited!');
        done();
      });
  }); 
    
  it('should return error for recipe already favorited', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/'+id+'/favorites')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message').equal('Recipe already Favorited');
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
        // res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });  
});