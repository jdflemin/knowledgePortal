import * as express from 'express';
import Comment from '../models/comment';

let router = express.Router();

router.get('/:id', (req, res) => {
  Comment.findById(req.params.id)
  .then((foundComments) => res.json(foundComments));
});

export default router;
