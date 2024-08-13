import React, { useState, useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {ADD_EXPENSE,EDIT_EXPENSE} from '../mutations/expense';
import {GET_EXPENSE_BY_ID} from '../querys/Expenses';
const ExpenseForm = ({ isAdd }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [tax, setTax] = useState('');
  const [amount, setAmount] = useState('');
  
  const { expenseId, groupId } = useParams();
  const { loading, error, data } = useQuery(GET_EXPENSE_BY_ID, {
    variables: {
      id: expenseId
    }
  })
 
  
  // if (data) {
  const { expense } = data || {};
  console.log(expense);
  useEffect(() => {
    if (expense) {
      setName(expense.name);
      setDate(expense.date);
      setTax(expense.tax);
      setAmount(expense.amount);
    }
  }, [expense]);
  

  const [addExpense] = useMutation(ADD_EXPENSE, {
    variables: {
      input: {
        name,
        date,
        tax,
        amount,
        groupId
      }
    }
  })

  const [editExpense] = useMutation(EDIT_EXPENSE, {
    variables: {
      id: expenseId,
      input: {
        name,
        date,
        tax,
        amount,
        groupId
      }
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    expenseId? editExpense() :addExpense();
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;
  return (
    <div className="container"> 
      <h3>{isAdd ? 'Add' : 'Edit'} Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={name} onChange={ (e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value) } />
        </div>
        <div className="form-group">
          <label htmlFor="tax">Tax</label>
          <input type="number" className="form-control" id="tax" name="tax" value={tax} onChange={ (e)=>setTax(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" className="form-control" id="amount" name="amount" value={amount} onChange={ (e)=>setAmount(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

}

export default ExpenseForm