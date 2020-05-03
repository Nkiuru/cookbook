import React from 'react';
import styles from './RecipeDetailPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useLocation } from 'react-router';
import Instruction from '../../components/Instruction';

const RecipeDetailPage = () => {
  const location = useLocation();
  const recipe = location.state.recipe;
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Recipe detail page</h1>
      <div className={styles.instructions}>
        <h2 className={styles.subtitle}>Instructions</h2>
        {recipe.instructions.map(ins => (
          <div key={ins._id}>
            <Instruction instruction={ins} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default RecipeDetailPage;
