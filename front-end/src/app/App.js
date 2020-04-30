import React from 'react';
import './App.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import HomePage from '../pages/HomePage';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
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
