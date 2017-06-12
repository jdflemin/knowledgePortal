import * as mongoose from 'mongoose';

export interface Comments extends mongoose.Document {
  cDate: string;
  answerId: string;
  aContent: string;
  userId: string;
  likeCount: number;
}

let commentSchema = new mongoose.Schema ({
  cDate: {
    type: String,
    required: true
  },
  answerId: {
    type: String,
    required: true
  },
  aContent: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  likeCount: Number

});

export default mongoose.model<Comments>('Comments', commentSchema);
