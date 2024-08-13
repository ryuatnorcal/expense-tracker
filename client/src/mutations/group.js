import { gql } from "@apollo/client";

const ADD_GROUP = gql`
  mutation AddGroup($name: String!) {
    addGroup(name: $name) {
      name
    }
  } 
`;
export default ADD_GROUP