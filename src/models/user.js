import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    default: Date.now()
  },
  dateLastLogin: {
    type: Date,
    default: Date.now()
  }
});

const user = mongoose.model('User', userSchema);

export default user;