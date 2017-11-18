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

    return recipes.findById(id).then(found => {
      if (found) {
        votes.find({
          where: {
            userId: req.decoded.id,
            recipeId: found.id
          }
        }).then(foundVotes => {

          if (foundVotes) {
            let updateVotes = {};
            let updateRecipeVotes = {};
            let msg = {};

            if (req.query.vote === 'up') {
              if (foundVotes.upVotes === 1) {
                // remove form db
                updateVotes.upVotes = 0;
                updateRecipeVotes.upVotes = (found.upVotes > 0)? found.upVotes - 1: 0;

                msg.up = 'Your upVote has been Removed';

              } else if (foundVotes.upVotes === 0){

                if (foundVotes.downVotes === 1) { 
                  // remove form db
                  updateVotes.downVotes = 0;
                  updateRecipeVotes.downVotes = (found.downVotes > 0 )? found.downVotes - 1: 0;

                  msg.up = 'Removing downVote to upVote';
                } else {
                  // up vote
                  updateVotes.upVotes = 1;
                  updateRecipeVotes.upVotes = found.upVotes + 1;
                  
                  msg.up = 'Thank you for voting';
                }
                
              }
            } else if(req.query.vote === 'down') {
              if (foundVotes.downVotes === 1) {
                // remove form db
                updateVotes.downVotes = 0;
                updateRecipeVotes.downVotes = (found.downVotes > 0)? found.downVotes - 1: 0;

                msg.down = 'removing down vote';
                
              } else if (foundVotes.downVotes === 0){
                if (foundVotes.upVotes === 1) {
                  // remove from db
                  updateVotes.upVotes = 0;
                  updateRecipeVotes.upVotes = (found.upVotes > 0)? found.upVotes - 1: 0;
                  
                  msg.down = 'Removing upVote to downVote';
                } else {
                  // down vote
                  updateVotes.downVotes = 1;
                  updateRecipeVotes.downVotes = found.downVotes + 1;
                  msg.down = 'Sorry you did not like it.';
                }
                
              }
            }

            votes.update( updateVotes,
              {
                where: {
                  userId: req.decoded.id,
                  recipeId: id
                }
              }).then(() => {
              recipes.update( updateRecipeVotes,
                {
                  where: {
                    id: id
                  }
                }).then(() => {
                const voteMsg = (req.query.vote === 'up')? msg.up : msg.down;
                return res.status(200).json({
                  message: voteMsg
                });
              });             
            })
              .catch(error => {
                console.log(error),
                res.status(500).json({
                  message: 'an error occured!'
                });
              });
            
          } else {
            // create vote records
            let votings = {};
            let createVoteRecipe = {};

            if (req.query.vote === 'up') {
              votings = {
                userId: req.decoded.id,
                recipeId: id,
                upVotes:  1, 
                downVotes: 0
              };
              createVoteRecipe = {
                upVotes: found.upVotes + 1
              };
         
            } else if (req.query.vote === 'down') { 
              votings = {
                userId: req.decoded.id,
                recipeId: id,
                upVotes:  0,
                downVotes: 1
              };
              createVoteRecipe = {
                downVotes: found.downpVotes + 1
              };
            }
            votes.create(votings).then(() => {
              recipes.update( createVoteRecipe,
                {
                  where: {
                    id: id
                  }
                }).then(() => {
                const voteMsg = (req.query.vote === 'up')? 'Thank you for voting' : 'Sorry you do not like it';
                return res.status(201).json({
                  message: voteMsg
                });
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
       
      } else {
        return res.status(404).json({
          message: 'Recipe Not found!'
        });
      }
    });

  }
}

export default Votes;
/* 
  - check if recipe exsit.

    - check query.
      - if up 
        * user has voted 
          - is up
            - remove from db
          - is down or 0
            - remove down and put up

        * user has not voted
          - create vote records

      - if down
        * user has voted
          - is down
            - remove from db
          - is up or 0
            - remove up and put down

        * user has not voted
          - create vote records.

  - return 404


*/