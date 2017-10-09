import db from '../models';

const votes = db.votes;
const recipes = db.recipes;

class Votes {

  votes(req, res) {
    // check if user has voted
    const id = req.params.recipeId;
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }

    votes.find({
      where: {
        userId: 1,//req.decoded.id,
        recipeId: id
      }
    }).then(found => {
      // collect queries
      //if found, update else create
      // console.log(found.upVotes)
      if (found) {
        if (req.query.vote === 'up' && found.upVotes === 0) {
          votes.update({
            upVotes: found.upVotes + 1,
            downVotes: 0,
          },
          {
            where: {
              userId: 1,//req.decoded.id,
              recipeId: id
            }
          }).then(() => {
            return res.status(200).send({
              message: 'Thanks for Voting!'
            });
          });
          // and update recipes up vtes
          /*  recipes.update({
              
          }); */
        } else  if (req.query.vote === 'down' && found.dataValues.downVotes === 0) {
          votes.update({
            upVotes: 0,
            downVotes: found.downVotes + 1,
          },
          {
            where: {
              userId: 1,//req.decoded.id,
              recipeId: id
            }
          }).then(() => {
            return res.status(200).send({
              message: 'You have Down Voted!'
            });
          });
        } else if (!req.query.vote) {
          return res.status(400).json({
            message: 'No Query'
          });
        } else {
          const vote = (req.query.vote === 'up')? 'down': 'up';
          return res.status(200).json({
            message: 'you have already voted for this recipe, you can only '+ vote +' vote'
          });
        }
       
      } else {
        let votings = {};
        if (req.query.vote === 'up') {
          votings = {
            userId: 1,//req.decoded.id,
            recipeId: id,
            upVotes:  1,
            downVotes: 0
          };
         
        } else if (req.query.vote === 'down') { 
          votings = {
            userId: 1,//req.decoded.id,
            recipeId: id,
            upVotes:  1,
            downVotes: 0
          };
        }
        votes.create(votings).then(() => {
          const voteMsg = (req.query.vote === 'up')? 'Thank you for voting' : 'Sorry you do not like it';
          return res.status(201).json({
            message: voteMsg
          });
        }).catch(err => {
          if (err.name === 'SequelizeForeignKeyConstraintError'){
            return res.status(400).json({
              message: 'Recipe does not exists!'
            });
          }
        });
      } 
    });
  }
}

export default Votes;