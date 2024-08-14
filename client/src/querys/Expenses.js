import { gql } from '@apollo/client';

export const GET_EXPENSE_BY_ID = gql`
  query GetExpenseById($id: ID!) {
    expense(id: $id) {
        id
        name
        amount
        date
        category
        tax
        
    }
  }`;

  export const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      id
      name
      amount
      date
      category
      tax
    }
  }`;