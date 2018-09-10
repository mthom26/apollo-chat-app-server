import { gql } from 'apollo-server-express';

export default gql `
  extend type Query {
    message(id: ID!): Message
    messages: [Message!]
  }

  extend type Mutation {
    createMessage(content: String!): Message!

    deleteMessage(id: String!): Boolean!
  }

  type Message {
    content: String!
    user: User!
  }
`;

