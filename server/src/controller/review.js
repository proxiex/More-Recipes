import db from '../models/db';

class review {
  static add(req, res) {
    const { review, userId } = req.body;
    if(!review) {
      res.status(400).send({
        Message: 'Please enter Review'
      });
    } else {
      let l = db.review.length;
      const id = 1 + l;
      db.review.push({
        id: id,
        userId: userId,
        review: review
      });
      res.status(200).send(db.review[id-1]);
    }
  }
}

export default review;