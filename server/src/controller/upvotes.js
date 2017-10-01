import db from '../models/db';

class UpVotes {
  vote(req,  res) {
    const id = req.params.Id;

    for (let i of db.recipes) {
      if (db.recipes[i].id === parseInt(id, 10)){
        const upVotes = db.recipes[i].upVote;
        db.recipes.push({
          upVote: upVotes + 1
        });
        return res.status(200).send({
          message: 'Voted!'
        });
      }
    }
  }

  getUpvotesRecipe(req, res) {
    if (req.query.sort === 'upvotes' && req.query.order === 'des')  {
      const compareFunc = ((a, b ) => b.upVotes - a.upVotes);
      const up = db.recipes.sort(compareFunc);
      console.log(db.recipes.sort('Ok: '+compareFunc));
      return res.status(200).send('ook');
    }
  }

}

export default UpVotes;