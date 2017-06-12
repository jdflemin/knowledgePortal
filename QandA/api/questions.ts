import * as express from 'express';
import Question from '../models/question';

let router = express.Router();

router.post('/', (req, res) => {
  let newQuestion = new Question();
  newQuestion.qTitle = req.body.qTitle;
  newQuestion.qContent = req.body.qContent;
  newQuestion.qDate = req.body.qDate;
  newQuestion.userID = req.body.userID;
  newQuestion.lessonID = req.body.lessonID;
  newQuestion.clickCount = req.body.clickCount;
  newQuestion.qCodeLink = req.body.qCodeLink;
  newQuestion.save().then((createdQuestion) => res.json(createdQuestion))
    .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  Question.findById(req.params.id)
  .then((foundQuestions) => res.json(foundQuestions));
});

router.post('/:id', (req, res) => {
  Question.findById(req.params.id).then((foundQuestion) => {
    foundQuestion.qTitle = req.body.qTitle;
    foundQuestion.qContent = req.body.qContent;
    foundQuestion.qDate = req.body.qDate;
    foundQuestion.userID = req.body.userID;
    foundQuestion.lessonID = req.body.lessonID;
    foundQuestion.clickCount = req.body.clickCount;
    foundQuestion.qCodeLink = req.body.qCodeLink;
    foundQuestion.save().then((savedQuestion) => res.json(savedQuestion));
  });
});

router.delete('/:id', (req, res) => {
  Question.remove({_id: req.params.id})
  .then((deletedQuestion) => res.json(deletedQuestion))
  .catch((err) => res.json(err));
});

export default router;
