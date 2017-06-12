import * as express from 'express';
import Comments from '../models/comments';

let router = express.Router();


router.get('/', (req, res) => {
  Comments.find().then((comments) =>
  res.json(comments));
});

router.get('/:id', (req, res) => {
  Comments.findById(req.params.id)
  .then((foundComment) => res.json(foundComment));
});

router.get('/:date', (req, res) => {
  Comments.find({aDate: {$where: "Comments.cDate > req.params.date"}})
  .then((matches) => res.json(matches));
});

router.get('/answers/:id/comments', (req, res) => {
  Comments.find({answerId: req.params.id})
  .then((matches) => res.json(matches));
});

export default router;
