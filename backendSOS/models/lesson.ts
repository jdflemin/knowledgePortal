import * as mongoose from 'mongoose';

export interface Lesson extends mongoose.Document {
  courseId;
  title;
}

let lessonSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

export default mongoose.model<Lesson>('Lesson', lessonSchema);
