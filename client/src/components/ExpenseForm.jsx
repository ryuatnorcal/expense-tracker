import React, { useState, useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {ADD_EXPENSE,EDIT_EXPENSE} from '../mutations/expense';
import { GET_EXPENSE_BY_ID, GET_EXPENSES } from '../querys/Expenses';
import {GetGroups} from '../querys/Groups';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ExpenseForm = ({ isAdd }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [tax, setTax] = useState('');
  const [amount, setAmount] = useState('');
  const history = useHistory();
  const { expenseId, groupId } = useParams();
  const { loading, error, data } = useQuery(GET_EXPENSE_BY_ID, {
    variables: {
      id: expenseId
    }
  })
 
  
  // if (data) {
  const { expense } = data || {};
 
  useEffect(() => {
    if (expense) {
      const d = new Date(parseInt(expense.date));
      setName(expense.name);
      expense.date !== null && setDate(d.toISOString()?.split('T')[0]);
      setTax(expense.tax);
      setAmount(expense.amount);
    }
  }, [expense]);
  

  const [addExpense] = useMutation(ADD_EXPENSE, {
    variables: {
      name,
      date: new Date(date).getMilliseconds().toString(),
      tax,
      amount,
      groupId
    }
  })

  const [editExpense, { loading: expenseLoading, error: expenseError }] = useMutation(EDIT_EXPENSE)
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      expenseId ? editExpense({
        variables: {
          id: expenseId,
          name,
          date: new Date(date).getMilliseconds().toString(),
          tax: parseInt(tax),
          amount: parseInt(amount),
          category: 'other'
        },
        update: (cache, { data: { editExpense } }) => {
          const { groups } = cache.readQuery({ query: GetGroups }) || {};
          const newData = groups.map(group => {
            return group?.expenses?.map(expense => {
              if (expense.id === editExpense.id) {
                return editExpense
              } else {
                return expense
              }
            }) || group
          })
          cache.writeQuery({
            query: GetGroups,
            data: { groups: newData }
          })
        }
      }) : addExpense({})
      if (!expenseLoading && !expenseError) {
        history.push('/')
      }
      if (expenseError) {
        console.log(expenseError)
      }
    } catch (error) {
      console.log(error)
    }
    
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