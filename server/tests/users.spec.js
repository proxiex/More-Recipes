import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import faker from 'faker';
import fakeData from './helper/fake';

const should = chai.should();

chai.use(chaiHttp);

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
        // res.body.should.have.property('message').equal('User already Exist!');
        done();
      });
  });
    
  it('should not let user sign up with no email address', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noEmailUsers)
      .end((err, res) => {
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
      password: '1111'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(User)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Sign in Successful!');
        res.body.should.have.property('Token');
        done();
      });
  });
    
  it('should let users sign in /signin POST', (done) => {
    const User = {
      username: 'non existend',
      password: '1111'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(User)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('User does NOT exist!');
        done();
      });
  });
});
