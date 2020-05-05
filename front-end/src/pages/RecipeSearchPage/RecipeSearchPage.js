import React from 'react';
import styles from './RecipeSearchPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useLocation } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPES } from '../../utils/queries/recipes';
import RecipeSearchItem from '../../components/RecipeSearchItem';

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
      <div className={styles.header}>
        <div className={styles.title}>{!loading && data.getRecipes.length} Search results</div>
      </div>
      <div className={styles.results}>
        {!loading &&
          !error &&
          data.getRecipes.map(recipe => (
            <div key={recipe.id} style={{ margin: '12px 0' }}>
              <RecipeSearchItem recipe={recipe} />
            </div>
          ))}
      </div>
    </PageContainer>
  );
};

export default RecipeSearchPage;
