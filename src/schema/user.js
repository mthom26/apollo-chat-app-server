import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    test: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!
  }

  type User {
    username: String!
  }

  type Token {
    token: String!
  }
`;