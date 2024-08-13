import { useState } from "react"
import { useMutation, gql } from '@apollo/client';
import ADD_GROUP from '../mutations/group';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const GroupForm = () => {
  const [name, setName] = useState('')
  let history = useHistory();
  const [addGroup] = useMutation(ADD_GROUP, {
    variables: {
        name: name
    }
  })
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const data = await addGroup();
      history.push('/');
    } catch (error) {
      throw Error('GQL error',error) 
    }
  }
  return (
    <div className="container">
      <h3>Add Group</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={name} onChange={ (e) => setName(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={ submitForm}>Submit</button>
      </form>
    </div>
  )
}

export default GroupForm