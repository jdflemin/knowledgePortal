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

router.get('/getDate/:date', (req, res) => {
   let rightNow = new Date().toJSON();
   Comments.find({cDate: {
         $lte : rightNow,
         $gt : req.params.date
   }})
   .then((matches) => res.json(matches))
   .catch((err) => console.log(err));
});

router.get('/answers/:id/comments', (req, res) => {
  Comments.find({answerId: req.params.id})
  .then((matches) => res.json(matches));
});

export default router;
