import React from 'react';
import {createRoot} from 'react-dom/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import App from './App';
import ExpenseForm from './components/ExpenseForm';
import GroupForm from './components/GroupForm';
import 'graphiql/graphiql.css';


const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  uri: process.env.REACT_APP_GQL_URI,
  cache: new InMemoryCache()
});

const fetcher = createGraphiQLFetcher({
  url: process.env.REACT_APP_GQL_URI
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/graphiql">
            {process.env.REACT_APP_ENV !== 'production' && (<GraphiQL editorTheme="solarized dark" fetcher={fetcher} />)} 
          </Route>
          <Route path="/group">
            <GroupForm />
          </Route>
          <Route path="/group/:groupId">
            <App />
          </Route>
          <Route path="/expense/:expenseId/:groupId">
            <ExpenseForm isAdd={false} />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};
const root = createRoot(document.getElementById('root'));

root.render(<Root />);
