import * as express from 'express';
import Answer from '../models/answer';

let router = express.Router();

router.post('/', (req, res) => {
  let newAnswer = new Answer();
  newAnswer.aDate = req.body.aDate;
  newAnswer.questionId = req.body.questionId;
  newAnswer.aContent = req.body.aContent;
  newAnswer.userId = req.body.userId;
  newAnswer.usefulCount = req.body.usefulCount;
  newAnswer.bestAnswer = req.body.bestAnswer;
  newAnswer.aCodeLink = req.body.aCodeLink;
  newAnswer.save().then((createdAnswer) => res.json(createdAnswer))
  .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  Answer.findById(req.params.id)
  .then((foundAnswers) => res.json(foundAnswers));
});

router.post('/:id', (req, res) => {
  Answer.findById(req.params.id).then((foundAnswer) => {
    foundAnswer.aDate = req.body.aDate;
    foundAnswer.questionId = req.body.questionId;
    foundAnswer.aContent = req.body.aContent;
    foundAnswer.userId = req.body.userId;
    foundAnswer.usefulCount = req.body.usefulCount;
    foundAnswer.bestAnswer = req.body.bestAnswer;
    foundAnswer.aCodeLink = req.body.aCodeLink;
    foundAnswer.save().then((savedAnswer) => res.json(savedAnswer));
  });
});

router.delete('/:id', (req, res) => {
  console.log("first");
  Answer.remove({_id: req.params.id})
  .then((deletedAnswer) => res.json(deletedAnswer))
  .catch((err) => res.json(err));
  console.log("second");
});

export default router;
