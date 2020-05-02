import React from 'react';
import styles from './RecipeDetailPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const RecipeDetailPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Recipe detail page</h1>
    </PageContainer>
  );
};

export default RecipeDetailPage;
