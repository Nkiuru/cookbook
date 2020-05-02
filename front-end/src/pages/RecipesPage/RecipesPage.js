import React from 'react';
import styles from './RecipesPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const RecipesPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Recipes page</h1>
    </PageContainer>
  );
};

export default RecipesPage;
