export default {
  Query: {
    test: async (parent, args, { db }) => {
      return { username: 'Testing' };
    }
  },

  Mutation: {
    signUp: async (parent, { username, email, password }, { db }) => {
      const newUser = await db.User.create({
        email,
        username,
        password 
      });
      console.log(newUser);
      return { token: 'Success!' };
    }
  }
}