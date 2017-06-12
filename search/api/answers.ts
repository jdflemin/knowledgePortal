import * as express from 'express';
import Answer from '../models/answer';

let router = express.Router();

router.get('/:id', (req, res) => {
  Answer.findById(req.params.id)
  .then((foundAnswers) => res.json(foundAnswers));
});

router.get('/search/:search', (req, res) => {
  Answer.find({aContent: {"$regex": req.params.search, "$options": "i"}})
  .then((matches) => res.json(matches));
});

export default router;
