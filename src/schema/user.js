import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    test: User
  }

  type User {
    username: String!
  }
`;