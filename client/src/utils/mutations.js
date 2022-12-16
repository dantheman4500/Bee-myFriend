import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $userBio: String!
    $interests: [String]!
  ) {
    createProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userBio: $userBio
      interests: $interests
    ) {
      token
      profile {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      products{
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const DELETE_PROFILE = gql`
mutation deleteProfile(
  $profileId: ID!
) {
  deleteProfile(
    profileId: $profileId
  ) {
    email
    _id
    firstName
    lastName
  }
}
`