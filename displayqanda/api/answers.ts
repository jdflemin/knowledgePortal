import * as express from 'express';
import Answer from '../models/answers';

let router = express.Router();

router.get('/', (req, res) => {
  Answer.find().then((answers) => res.json(answers));
});

router.get('/:id', (req, res) => {
  Answer.findById(req.params.id)
  .then((foundanswer) => res.json(foundanswer));
});

router.get('/getDate/:date', (req, res) => {
   console.log("here 1");
   let rightNow = new Date().toJSON();
   Answer.find({aDate: {
         $lte : rightNow,
         $gt : req.params.date
   }})
   .then((matches) => {
     console.log("here 2")
     res.json(matches)
     console.log(matches)
   })
   .catch((err) => console.log(err));
});

router.get('/questions/:id/answers', (req, res) => {
  Answer.find({questionId: req.params.id})
  .then((matches) => res.json(matches));
});

export default router;
