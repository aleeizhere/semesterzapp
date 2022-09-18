import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  fullname: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
});

export interface PostModel extends mongoose.Document {
  id: string;
  creator: string;
  fullname: string;
  subject: string;
  description: string;
}
