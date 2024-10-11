// models/Interview.ts
import { Schema, model, Document } from 'mongoose';

interface IInterview extends Document {
  title: string;
  packages: Schema.Types.ObjectId[];
  expireDate?: Date;
  canSkip: boolean;
  showAtOnce: boolean;
  status: string;
}

const InterviewSchema = new Schema<IInterview>({
  title: { type: String, required: true },
  packages: [{ type: Schema.Types.ObjectId, ref: 'Package', required: true }],
  expireDate: { type: Date },
  canSkip: { type: Boolean, default: false },
  showAtOnce: { type: Boolean, default: false },
  status: { type: String, default: 'Published' },
});

// Status'u kayıttan önce expireDate’e göre ayarlayan bir pre-save hook
InterviewSchema.pre('save', function (next) {
  const currentDate = new Date();
  if (this.expireDate && this.expireDate < currentDate) {
    this.status = 'Unpublished';
  } else {
    this.status = 'Published';
  }
  next();
});

export const Interview = model<IInterview>('Interview', InterviewSchema);
