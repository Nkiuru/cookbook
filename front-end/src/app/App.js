import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router';
import './App.scss';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import RecipesPage from '../pages/RecipesPage';
import RecipeDetailPage from '../pages/RecipeDetailPage';
import RecipeSearchPage from '../pages/RecipeSearchPage';
import AddEditRecipePage from '../pages/AddEditRecipePage';
import ListPage from '../pages/ListPage';
import AddEditListPage from '../pages/AddEditListPage';
import UserPage from '../pages/UserPage';
import { authenticated as auth } from '../utils/auth';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { API_URL } from '../utils/constants';

const apolloCache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const uploadLink = createUploadLink({
  uri: `${API_URL}graphql`,
  headers: {
    'keep-alive': 'true',
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: apolloCache,
});

function App() {
  const location = useLocation();
  const home = () => (auth() ? <Redirect to="/dashboard" /> : <HomePage />);
  const dashboard = () => (!auth() ? <Redirect to="/" /> : <DashboardPage />);
  const profile = () => (!auth() ? <Redirect to="/" /> : <ProfilePage />);
  const recipes = () => (!auth() ? <Redirect to="/" /> : <RecipesPage />);
  const recipeDetail = () => (!auth() ? <Redirect to="/" /> : <RecipeDetailPage />);
  const recipeEdit = () => (!auth() ? <Redirect to="/" /> : <AddEditRecipePage />);
  const recipeSearch = () => (!auth() ? <Redirect to="/" /> : <RecipeSearchPage />);
  const listEdit = () => (!auth() ? <Redirect to="/" /> : <AddEditListPage />);
  const list = () => (!auth() ? <Redirect to="/" /> : <ListPage />);
  const user = () => (!auth() ? <Redirect to="/" /> : <UserPage />);
  return (
    <ApolloProvider client={client}>
      <Switch location={location}>
        <Route path="/dashboard" render={dashboard} />
        <Route path="/profile" render={profile} />
        <Route path="/recipes/search" render={recipeSearch} />
        <Route path="/recipes" render={recipes} />
        <Route path="/recipe/:id/edit" render={recipeEdit} />
        <Route path="/recipe/:id" render={recipeDetail} />
        <Route path="/list/:id/edit" render={listEdit} />
        <Route path="/list/:id" render={list} />
        <Route path="/user/:id" render={user} />
        <Route path="/" render={home} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
