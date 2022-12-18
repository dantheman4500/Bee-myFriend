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

export const ADD_INTEREST = gql`
  mutation addInterest($profileId: ID!, $interest: String!) {
    addInterest(profileId: $profileId, interest: $interest) {
      _id
      interests
    }
  }
`;
export const DELETE_INTEREST = gql`
  mutation deleteInterest($profileId: ID!, $interest: String!) {
    deleteInterest(profileId: $profileId, interest: $interest) {
      _id
      interests
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation updateUserBio($profileId: ID!, $userBio: String!) {
    updateUserBio(profileId: $profileId, userBio: $userBio) {
      _id
      userBio
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

export const CREATE_FRIENDSHIP = gql`
  mutation CreateFriendship($user1Id: ID!, $user2Id: ID!) {
    createFriendship(user1Id: $user1Id, user2Id: $user2Id) {
      id
      user1 {
        id
        firstName
      }
      user2 {
        id
        firstName
      }
      status
    }
  }
`;

export const DELETE_FRIENDSHIP = gql`
  mutation DeleteFriendship($id: ID!) {
    deleteFriendship(id: $id) {
      id
    }
  }
`;