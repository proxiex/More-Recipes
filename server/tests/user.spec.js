import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './helper/fake';

const should = chai.should();

chai.use(chaiHttp); 

export let token;
export let userId;

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

describe('Users Controller', () => {
  /* db
    .users
    .destroy({
      cascade: true, 
      truncate: true
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
    
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.newUsers)
      .end((err, res) => {
        res.should.be.json;
        userId = res.body.newUser.id;
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
        res.should.have.status(409);
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

  it('should not let users signin with wrong password', (done) => {
    const User = {
      username: fakeData.newUsers.email,
      password: '11110000x'
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

  it('should user profile', (done) => {
    chai.request(app)
      .get('/api/v1/users/me')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
// end of user describe
});