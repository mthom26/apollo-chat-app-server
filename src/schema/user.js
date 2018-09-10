import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    test: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!

    signIn(username: String!, password: String!): Token!
  }

  type User {
    username: String!
    email: String!
    messages: [Message!]
  }

  type Token {
    token: String!
  }
`;