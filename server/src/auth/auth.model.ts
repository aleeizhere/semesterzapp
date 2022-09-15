import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

export interface AuthModel extends mongoose.Document {
  id: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
}
