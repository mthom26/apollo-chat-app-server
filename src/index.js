import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import schema from './schema';
import resolvers from './resolvers';
import * as db from './models';

const app = express();
app.use(cors());

const getAuthUser = async (req) => {
  const token = req.headers.authorization;
  // Token is assumed to be of the form "Bearer tokenStringHere"
  if(token) {
    try {
      return await jwt.verify(token.split(' ')[1], process.env.SECRET);
    } catch(err) {
      throw new AuthenticationError('Your session has expired. Please Sign In.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  },
  context: async ({ req }) => {
    const authUser = await getAuthUser(req);
    
    return {
      db,
      authUser
    }
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});