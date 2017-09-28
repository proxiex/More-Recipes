import chai from 'chai';
import chaiHttp from 'chai-http';
//import db from '../src/models';
import app from '../src/app';
import faker from 'faker';

const should = chai.should();
chai.use(chaiHttp);

describe("More Recipes", () => {
  it('shoud get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
    
    it('shoud return 404 for un defined page', (done) => {
    chai.request(app)
      .get('/xox')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
    })
})

/* describe("Recipes", () => {

  it('should add a new recipe', (done) => {
    const recipe = {
      recipeName: 'Rice and Beans',
      mealType: 'Lunch',
      dishType: 'All',
      method: 'first of all ',
      ingredients: [ 'rice', 'beancs','oil' ]

    }
    chai.request(app)
      .post('/api/recipes')
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(201)
        done()
      })
  })
}) */