import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    test: async (parent, args, { db }) => {
      return { username: 'Testing' };
    },
    user: async (parent, { id }, { db }) => {
      const user = await db.User.findById(id);
      //console.log(user);
      return user;
    },
    users: async (parent, args, { db }) => {
      const users = await db.User.find();
      //console.log(users);
      return users;
    }
  },

  Mutation: {
    signUp: async (parent, { username, email, password }, { db }) => {
      const hash = await bcrypt.hash(password, 10);

      const newUser = await db.User.create({
        email,
        username,
        password: hash
      });

      const token = await jwt.sign({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      }, process.env.SECRET);

      return { token };
    },
    signIn: async (parent, { username, password }, { db }) => {
      
      const user = await db.User.findOne({
        username
      });
     
      const isValid = await bcrypt.compare(password, user.password);
      
      if(isValid) {
        const token = await jwt.sign({
          id: user.id,
          email: user.email,
          username: user.username
        }, process.env.SECRET);

        return { token };
      }

      return { token: 'Nope!' };
    }
  }
}