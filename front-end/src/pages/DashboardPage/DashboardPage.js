import React, { useState } from 'react';
import styles from './DashboardPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import Button from '../../components/Button';
import RecipeCard from '../../components/RecipeCard';
import Divider from '@material-ui/core/Divider';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPES } from '../../utils/queries/recipes';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';

const DashboardPage = () => {
  const [recipeStart, setRecipeStart] = useState(0);
  const [listStart, setListStart] = useState(0);
  const user = localStorage.getItem('user');
  const { loading, error, data } = useQuery(GET_RECIPES, { variables: { author: user.id } });
  const { loading: listLoading, error: listError, data: listData } = useQuery(GET_RECIPES, {
    variables: { author: user.id },
  });
  const openSearch = () => {};
  const addRecipe = () => {};
  return (
    <PageContainer>
      <Toolbar />
      <div className={styles.header}>
        <Button label="See all" secondary onClick={openSearch} />
        <div className={styles.title}>Dashboard</div>
        <Button label={'+ Add Recipe'} onClick={addRecipe} />
      </div>
      <div>
        <div className={styles.subheader}>My recipes</div>
        <div className={styles.recipes}>
          {!loading &&
            !error &&
            data.getRecipes.slice(0, recipeStart + 4).map(recipe => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
        </div>
        <div className={styles.expandContainer}>
          <p className={styles.expand}>expand</p>
          <IconButton
            onClick={() => {
              setRecipeStart(recipeStart + 4);
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <Divider />
      </div>
      <div style={{ marginTop: '16px' }}>
        <div className={styles.subheader}>My Lists</div>
        <div className={styles.recipes}>
          {!listLoading &&
            !listError &&
            listData.getRecipes.slice(0, listStart + 4).map(recipe => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
        </div>
        <div className={styles.expandContainer}>
          <p className={styles.expand}>expand</p>
          <IconButton
            onClick={() => {
              setRecipeStart(recipeStart + 4);
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <Divider />
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
