import mongoose from 'mongoose';
import User from './user';

mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

export { User };