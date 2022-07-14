import mongoose from 'mongoose';

interface IUser {
  name: string;
  dob: string;
  fatherName: string;
  address: string;
  docType: string;
  docNum: string;
  email: string;
  pic?: string;
  score?: number;
  responses?: [{ qId: mongoose.Types.ObjectId; answer: string }];
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Name is required'],
      minLength: 4,
    },
    dob: {
      type: String,
      trim: true,
      minlength: 8,
      required: [true, 'Date of birth is required'],
    },
    fatherName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Father Name is required'],
      minLength: 4,
    },
    address: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Address is required'],
      minLength: 4,
    },
    docType: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Document Type is required'],
    },
    docNum: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Document Number is required'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email is required'],
    },
    pic: {
      type: String,
    },
    score: {
      type: Number,
    },
    responses: [{ qId: mongoose.Schema.Types.ObjectId, answer: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const User = mongoose.model('user', UserSchema);

export default User;
