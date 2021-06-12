const { gql } = require("apollo-server");

module.exports = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
    }
    type Query {
        users: [User]!
        user(id: ID): User!
    }
    type Mutation {
        register( username: String, email: String, password: String): User!
        login(email: String!, password: String!): User!
    }
  `
