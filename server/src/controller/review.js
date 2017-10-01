import db from '../models/db';

class review {
 
  add(req, res) {
    //const { review, userId } = req.body;
    console.log( req.params.Id)
    if(!req.body.review) {

      res.status(400).send({
        Message: 'Please enter Review'
      });
    } else {
      let l = db.review.length;
      const id = 1 + l;
      db.review.push({
        id: id,
        revipId: req.params.Id,
        userId:  req.body.userId,
        review:  req.body.review
      });
      res.status(201).send(db.review[id-1]);
    }
  }
}

export default review;