import React from 'react';
import './App.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import HomePage from '../pages/HomePage';
const API_URL = 'http://localhost:3000/graphql';

const client = new ApolloClient({
  uri: API_URL,
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app</h2>
        <HomePage />
      </div>
    </ApolloProvider>
  );
}

export default App;
