import { gql } from "@apollo/client";

export const ADD_EXPENSE = gql`
  mutation AddExpense($name: String!, $amount: Float!, $date: Date!, $tax: Float!, $groupId: ID!) {
    addExpense(name: $name, amount: $amount, date: $date, tax: $tax, groupId: $groupId) {
      name
      amount
      date
      tax
    }
  }
`; 

export const EDIT_EXPENSE = gql`
  mutation EditExpense($id: ID!, $name: String!, $amount: Int!, $date: String, $category: String, $tax: Int!) {
    editExpense(id: $id, name: $name, amount: $amount, date: $date, category: $category, tax: $tax) {
      id
      name
      amount
      date
      tax
    }
  }  
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;

export default ADD_EXPENSE