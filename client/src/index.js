import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router, Route
} from 'react-router';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import App from './App';
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
      <App />
      {process.env.REACT_APP_ENV !== 'production' && (<GraphiQL editorTheme="solarized dark" fetcher={fetcher} />)}
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
