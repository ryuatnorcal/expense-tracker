import React from 'react';
import { useQuery } from '@apollo/client';
import Card from './components/Card';
import GetGroups from './querys/Groups';
export default ({ children }) => {
  const { loading, error, data } = useQuery(GetGroups);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { groups } = data;
  return (
    <div className="container">
     <h1>Task Tracker</h1>
     <Card data={groups}/>
    </div>
  );
}