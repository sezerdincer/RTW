import { Schema, model, Document } from 'mongoose';

// Define the interface for a question
interface IQuestion {
    id:number;
    question: string;
  time: string;
}

// Define the interface for a package, which contains a list of questions
interface IPackage extends Document {
  packageName: string;
  questions: IQuestion[];
}

// Define the Question schema
const QuestionSchema = new Schema<IQuestion>({
    id: { type: Number, required: true },
    question: { type: String, required: true },
  time: { type: String, required: true },
});

// Define the Package schema, which embeds the Question schema
const PackageSchema = new Schema<IPackage>({
  packageName: { type: String, required: true },
  questions: [QuestionSchema], // Array of questions
});

// Create the Package model from the schema
export const Package = model<IPackage>('Package', PackageSchema);