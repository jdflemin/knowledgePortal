import * as express from 'express';
import Comments from '../models/comment';

let router = express.Router();

router.post('/', (req, res) => {
  let newComment = new Comments();
  newComment.cDate = req.body.cDate;
  newComment.answerId = req.body.answerId;
  newComment.cContent = req.body.cContent;
  newComment.userId = req.body.userId;
  newComment.likeCount = req.body.likeCount;
  newComment.cCodeLink = req.body.cCodeLink;
  newComment.save().then((createdComment) => res.json(createdComment));
});

router.get('/:id', (req, res) => {
  Comments.findById(req.params.id)
  .then((foundComments) => res.json(foundComments));
});

router.post('/:id', (req, res) => {
  Comments.findById(req.params.id).then((foundComment) => {
    foundComment.cDate = req.body.cDate;
    foundComment.answerId = req.body.answerId;
    foundComment.cContent = req.body.cContent;
    foundComment.userId = req.body.userId;
    foundComment.likeCount = req.body.likeCount;
    foundComment.cCodeLink = req.body.cCodeLink;
    foundComment.save().then((savedComment) => res.json(savedComment));
  });
});

router.delete('/:id', (req, res) => {
  Comments.remove({_id: req.params.id})
  .then((deletedComment) => res.json(deletedComment))
  .catch((err) => res.json(err));
});

export default router;
