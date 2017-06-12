import * as mongoose from 'mongoose';

export interface Comment extends mongoose.Document {
  cDate;
  answerId;
  cContent;
  userId;
  likeCount;
}

let commentSchema = new mongoose.Schema ({
  cDate: {
    type: Date,
    required: true
  },
  answerId: {
    type: String,
    required: true
  },
  cContent: {
    type: String,
    required: true
  },
  userId: {
    type: String,
  },
  likeCount: {
    type: Number
  }
});

export default mongoose.model<Comment>('Comment', commentSchema);
