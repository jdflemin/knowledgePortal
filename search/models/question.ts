import * as mongoose from 'mongoose';

export interface Question extends mongoose.Document {
  qTitle;
  qContent;
  qDate;
  userID;
  lessonID;
  clickCount;
}

let questionSchema = new mongoose.Schema ({
  qTitle: {
    type: String,
    required: true
  },
  qContent: {
    type: String,
    required: true
  },
  qDate: {
    type: Date,
    required: true
  },
  userID: {
    type: String,
  },
  lessonID: {
    type: String,
    required: true
  },
  clickCount: {
    type: Number

  },
});

export default mongoose.model<Question>('Question', questionSchema);
