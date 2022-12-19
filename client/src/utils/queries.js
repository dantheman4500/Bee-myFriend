import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      email
      image
      interests
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      firstName
      lastName
      email
      userBio
      interests
      image
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query Checkout($products: [Product]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;

export const QUERY_INTEREST = gql`
  query findProfileByInterest($profileInterest: String!) {
    findProfileByInterest(profileInterest: $profileInterest) {
      _id
      interests
      firstName
      lastName
    }
  }
`;