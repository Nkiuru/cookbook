import React from 'react';
import styles from './RecipeSearchPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const RecipeSearchPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Recipe search page</h1>
    </PageContainer>
  );
};

export default RecipeSearchPage;
