import mongoose from 'mongoose';
import user from './user';

mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

export { user };