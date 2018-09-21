import { gql } from 'apollo-server-express';

export default gql `
  extend type Query {
    message(id: ID!): Message
    messages(cursor: String, limit: Int): MessageBlock!
  }

  extend type Mutation {
    createMessage(content: String!): Message!
    deleteMessage(id: String!): Boolean!
  }

  type MessageBlock {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: String!
    hasNextPage: Boolean!
  }

  type Message {
    id: ID!
    content: String!
    user: User!
    createdAt: String!
  }
`;

