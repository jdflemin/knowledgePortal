import * as express from 'express';
import Question from '../models/question';

let router = express.Router();

router.get('/:id', (req, res) => {
  Question.findById(req.params.id)
  .then((foundQuestions) => res.json(foundQuestions));
});

router.get('/search/:search', (req, res) => {
  Question.find({$or: [{qContent: {"$regex": req.params.search, "$options": "i"}},
  {qTitle: {"$regex": req.params.search, "$options": "i"}}]})
  .then((matches) => res.json(matches))
  .catch((err) => res.json(err));
});

export default router;
