import {useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Card = ({ data }) => {
  const del = '../imgs/icons8-delete.svg'
  const edit = '../imgs/icons8-edit.svg'
  const history = useHistory();
  const renderExpenses = (expenses, groupId) => {
    const handleExpenseClick = (type, id) => {
      switch(type) {
        case 'edit':
          history.push(`/expense/${id}/${groupId}`);
          break;
        case 'delete':
          break;
      }
      
    }
    return (
      <div>
        <h4>Expenses</h4>
        <table>
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Date</th>
              <th>Tax</th>
              <th>Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.date}</td>
                <td>{expense.tax || 0} %</td>
                <td>$ {expense.amount}</td>
                <td><button className="btn btn-primary" onClick={() => handleExpenseClick('edit', expense.id)}><img src={edit} /></button></td>
                <td><button className="btn btn-danger"><img src={del} onClick={() => handleExpenseClick('delete', expense.id)} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return data.map((group) =>(
    <div key={ group.id } className="card">
      <div className="card-content">
        <h3>{group.name}</h3>
        <button className="btn btn-danger"><img src={edit} /></button>
        <button className="btn btn-danger"><img src={del}/></button>
        {group.expenses.length > 0 ? (renderExpenses(group.expenses, group.id)) : (<h4>No expenses</h4>)}
      </div>
    </div>
  ))
}

export default Card