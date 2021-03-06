import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isMessageOwner } from './authorization';
import pubsub, { EVENTS } from '../subscription';

export default {
  Query: {
    message: async (parent, args, { db }) => {
      const message = await db.Message.findById(id);
      //console.log(message);
      return message;
    },
    messages: async (parent, { limit, cursor }, { db }) => {
      const pointer = cursor
        ? { createdAt: { $lte: cursor } }
        : null;

      const messages = await db.Message.find(pointer)
        .sort({ createdAt: 'desc' })
        .limit(limit + 1);

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      //console.log(messages);
      return {
          edges,
          pageInfo: {
            endCursor: messages[messages.length - 1].createdAt,
            hasNextPage
          }
        };
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

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: {
            message: newMessage
          } 
        });

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

  Subscription: {
    messageCreated: {
      subscribe: (parent, args, context) => {
        return pubsub.asyncIterator(EVENTS.MESSAGE.CREATED);
      }
    }
  },

  Message: {
    user: async (parent, args, { db }) => {
      return await db.User.findById(parent.user);
    }
  }
}