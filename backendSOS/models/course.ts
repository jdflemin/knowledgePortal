import * as mongoose from 'mongoose';

export interface Course extends mongoose.Document {
  name: string;
  isEnabled: boolean;
  icon: string;
}

let courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isEnabled: {
    type: Boolean,
    default: false,
    required: true
  },
  icon: String
});

export default mongoose.model<Course>('Course', courseSchema);
