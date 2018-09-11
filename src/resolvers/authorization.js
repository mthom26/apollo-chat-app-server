import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

const isAuthenticated = (parent, args, { authUser }) => {
  return authUser ? skip : new ForbiddenError('Not authenticated as user.');
};

const isMessageOwner = async (parent, { id }, { authUser, db }) => {
  const message = await db.Message.findById(id);
  
  if(!message.user.equals(authUser.id)) {
    return new ForbiddenError('Not authorized.');
  }
  skip;
};

export { isAuthenticated, isMessageOwner };