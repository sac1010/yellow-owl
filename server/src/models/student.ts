import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  phone: number;
  enrollment: number;
  date: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  enrollment: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
