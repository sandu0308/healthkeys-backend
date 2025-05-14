import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  username: {
    type: String
  },
  phone: {
    type: String
  },
  gender: {
    type: String
  },
  country: {
    type: String
  },
  language: {
    type: String
  },
  timezone: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
