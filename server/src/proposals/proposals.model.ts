import * as mongoose from 'mongoose';

export const ProposalSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  teacherUsername: { type: String, required: true },
  fullname: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
});

export interface ProposalModel extends mongoose.Document {
  id: string;
  postId: string;
  teacherUsername: string;
  fullname: string;
  price: number;
  status: string;
}
