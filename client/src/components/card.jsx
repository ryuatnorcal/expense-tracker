
const Card = ({data}) => {
  console.log(data)
  return data.map((group) =>(
    <div key={ group.id } className="card">
      <div className="card-content">
        <h3>{group.name}</h3>
        {group.expenses.length > 0 ? (<h4>Expenses</h4>) : (<h4>No expenses</h4>)}
        {group.expenses.map((expense) => (
          <p key={expense.id}>here will be expenses</p>  
        ))}
      </div>
    </div>
  ))
}

export default Card