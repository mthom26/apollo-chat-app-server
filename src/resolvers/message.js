import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
  Query: {
    message: async (parent, args, { db }) => {
      const message = await db.Message.findById(id);
      console.log(message);
      return message;
    },
    messages: async (parent, args, { db }) => {
      const messages = await db.Message.find();
      console.log(messages);
      return messages;
    }
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { content }, { db, authUser }) => {
        const newMessage = await db.Message.create({
          content,
          user: authUser.id
        });
        console.log(newMessage);
        return newMessage;
      }
    ),
    deleteMessage: async (parent, { id }, { db }) => {

    }
  },

  Message: {
    user: async (parent, args, { db }) => {
      
    }
  }
}