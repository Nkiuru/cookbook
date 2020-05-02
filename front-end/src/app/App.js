import React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import './App.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import HomePage from '../pages/HomePage';
import { authenticated as auth } from '../utils/auth';

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
  const location = useLocation();
  const home = () => <HomePage />;
  //const dashboard =() =>  (auth() ? <Redirect to="/" /> : <DashboardPage />);
  //const profile = () => (auth() ? <Redirect to="/" /> : <ProfilePage />);
  //const recipes =() =>  (auth() ? <Redirect to="/" /> : <RecipesPage />);
  //const recipeDetail = () => (auth() ? <Redirect to="/" /> : <RecipeDetailPage />);
  //const recipeEdit = () => (auth() ? <Redirect to="/" /> : <AddEditRecipePage />);
  //const recipeSearch = () => (auth() ? <Redirect to="/" /> : <RecipeSearchPage />);
  //const listSearch = () => (auth() ? <Redirect to="/" /> : <ListSearchPage />);
  //const settings = () => (auth() ? <Redirect to="/" /> : <SettingsPage />);
  return (
    <ApolloProvider client={client}>
      <Switch location={location}>
        <Route path="/" render={home} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
