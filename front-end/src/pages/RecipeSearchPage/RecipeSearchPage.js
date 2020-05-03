import React from 'react';
import styles from './RecipeSearchPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useLocation } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPES } from '../../utils/queries/recipes';

const RecipeSearchPage = () => {
  const location = useLocation();
  const params = location.state;
  console.log(params);
  const { loading, error, data } = useQuery(GET_RECIPES, {
    variables: params,
  });
  console.log(data);
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Recipe search page</h1>
    </PageContainer>
  );
};

export default RecipeSearchPage;
