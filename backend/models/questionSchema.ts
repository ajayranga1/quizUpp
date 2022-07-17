import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Statement is required'],
    },
    answer: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'answer is required'],
    },
    options: [
      {
        value: {
          type: String,
          trim: true,
          lowercase: true,
          required: [true, 'Option is required'],
        },
        text: {
          type: String,
          trim: true,
          lowercase: true,
          required: [true, 'Option is required'],
        },
        _id: { id: false },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Question = mongoose.model('question', questionSchema);

export default Question;
