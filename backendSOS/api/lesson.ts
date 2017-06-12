import * as express from 'express';
import Lesson from '../models/lesson';

let router = express.Router();


// router.get('/:id', (req, res) => {
// DO NOT UNCOMMENT, THIS CAUSES QUESTIONS TO NOT PULL THROUGH DUE TO JS BEING ASYNC, BUT LEAVE FOR REFERENCE PLEASE
//   console.log("router1")
//   Lesson.find(req.params.id)
//   .then((matches) => res.json(matches));
// });

router.get('/', (req, res) => {
  console.log("router2")
  Lesson.find().then((lessons) => res.json(lessons));
});

router.get('/courses/:id/lessons', (req, res) => {
  console.log("router3")
  Lesson.find({courseId: req.params.id})
  .then((matches) => res.json(matches));
});

router.post('/', (req, res) => {
  let newLesson = new Lesson();
  newLesson.courseId = req.body.courseId;
  newLesson.title = req.body.title;
  newLesson.save().then((createdLesson) => res.json(createdLesson))
  .catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
  console.log("router4")
  Lesson.findOne({_id: req.params.id})
  .then((foundLessons) => res.json(foundLessons));

});

router.post('/:id', (req, res) => {
  Lesson.findById(req.params.id).then((foundLesson) => {
    foundLesson.courseId = req.body.courseId;
    foundLesson.title = req.body.title;
    foundLesson.save().then((savedLesson) => res.json(savedLesson));
  });
});

router.delete('/:id', (req, res) => {
  Lesson.remove({_id: req.params.id})
  .then((deletelesson) => res.json(deletelesson))
  .catch((err) => res.json(err));
});

export default router;
