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
    createMessage: async (parent, { content }, { db }) => {
      const newMessage = await db.Message.create({
        content,
        user: '5b96a925e37afa2398e30356'
      });
      console.log(newMessage);
      return newMessage;
    },
    deleteMessage: async (parent, { id }, { db }) => {

    }
  },

  Message: {
    user: async (parent, args, { db }) => {
      
    }
  }
}