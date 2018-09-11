import mongoose from 'mongoose';
import User from './user';
import Message from './message';

mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

export { User, Message };