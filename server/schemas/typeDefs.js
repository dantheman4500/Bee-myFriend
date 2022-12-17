const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    image: String
    userBio: String
    interests: [String]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    findProfileByInterest(profileInterest: String!): [Profile]
    checkout(products: [Product]!): Checkout
  }

  type Checkout {
    session: ID
  }

  input Product{
    name: String
    description: String
    price: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createProfile(firstName: String!, lastName: String!, email: String!, password: String!, userBio: String!, interests: [String]!): Auth
    deleteProfile(profileId: ID!): Profile
    addInterest(profileId: ID!, interest: String!): Profile
    deleteInterest(profileId: ID!, interest: String!): Profile
    updateUserBio(profileId: ID!, userBio: String!): Profile
  }
`;

module.exports = typeDefs;
