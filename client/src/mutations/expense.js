import { gql } from "@apollo/client";

export const ADD_EXPENSE = gql`
  mutation AddExpense($name: String!, $amount: Float!, $date: Date!, $tax: Float!, $groupId: ID!) {
    addExpense(name: $name, amount: $amount, date: $date, tax: $tax, groupId: $groupId) {
      name
      amount
      date
      tax
      groupId
    }
  }
`;
export const EDIT_EXPENSE = gql`
  mutation EditExpense($id: ID!, $name: String!, $amount: Float!, $date: Date!, $tax: Float!, $groupId: ID!) {
    editExpense(id: $id, name: $name, amount: $amount, date: $date, tax: $tax, groupId: $groupId) {
      id
      name
      amount
      date
      tax
      groupId
    }
  } 
`;
export default ADD_EXPENSE