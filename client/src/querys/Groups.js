import { gql } from '@apollo/client';

export const GetGroups = gql`
  query GetGroups {
    groups {
      id
      name
      expenses {
        id
        name
        amount
        date
        category
        tax
      }
    }
  }`;

export const GetGroupById = gql`
  query GetGroupById($id: ID!) {
    group(id: $id) {
      id
      name
      expenses {
        id
        name
        amount
        date
        category
        tax
      }
    }
  }`;

export default GetGroups;