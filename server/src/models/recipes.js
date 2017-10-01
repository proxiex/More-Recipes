import request from 'supertest';
import chai from 'chai';
import app from '../src/app';

const expect = chai.expect;

describe('More-Recipes', () => {
  it('Loads the Home page', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
    
  it('Creates Recipe', (done) => {
    request(app)
      .post('/api/recipes')
      .set('Content-Type', 'application/json')
      .send({
        recipeName: 'Rice',
        mealType: 'Lunch',
        dishType: 'Indian',
        ingredients: ['rice', 'breans', 'cow']
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});