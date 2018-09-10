export default {
  Query: {
    test: async (parent, args, context) => {
      return { username: 'Testing' };
    }
  }
}