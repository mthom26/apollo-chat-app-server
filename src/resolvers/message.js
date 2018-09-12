import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isMessageOwner } from './authorization';

export default {
  Query: {
    message: async (parent, args, { db }) => {
      const message = await db.Message.findById(id);
      //console.log(message);
      return message;
    },
    messages: async (parent, args, { db }) => {
      const messages = await db.Message.find();
      //console.log(messages);
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
        
        let user = await db.User.findById(authUser.id);
        user.messages.push(newMessage.id);
        await user.save();

        return newMessage;
      }
    ),
    deleteMessage: combineResolvers(
      isMessageOwner,
      async (parent, { id }, { db }) => {
        const message = await db.Message.findById(id); 
        // Must call .remove here instead of findByIdAndDelete() to trigger 
        // pre('remove') function in messageSchema
        await message.remove();
        return true;    
      }
    )
  },

  Message: {
    user: async (parent, args, { db }) => {
      return await db.User.findById(parent.user);
    }
  }
}