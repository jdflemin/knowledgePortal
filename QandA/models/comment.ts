import * as mongoose from 'mongoose';

export interface Comments extends mongoose.Document {
  cDate;
  answerId;
  cContent;
  userId;
  likeCount;
  cCodeLink;
}

let commentsSchema = new mongoose.Schema ({
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

  },
  userId: {
    type: String
  },
  likeCount: {
    type: Number
  },
  cCodeLink: String
});

export default mongoose.model<Comments>('Comments', commentsSchema);
