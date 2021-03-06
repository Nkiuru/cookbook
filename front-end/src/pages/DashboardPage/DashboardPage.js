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
import { useHistory } from 'react-router-dom';
import { GET_MY_LISTS } from '../../utils/queries/lists';
import RecipeListCard from '../../components/RecipeListCard';

const DashboardPage = () => {
  const history = useHistory();
  const [recipeStart, setRecipeStart] = useState(0);
  const [listStart, setListStart] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const { loading, error, data } = useQuery(GET_RECIPES, {
    variables: { author: user.id },
    fetchPolicy: 'cache-and-network',
  });
  const { loading: listLoading, error: listError, data: listData } = useQuery(GET_MY_LISTS, {
    fetchPolicy: 'cache-and-network',
  });
  console.log('hmm');
  const openSearch = () => {
    history.push('/recipes/search');
  };
  const addRecipe = () => {
    history.push('/recipe/0/edit');
  };
  const addList = () => {
    history.push('/list/0/edit');
  };
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
              <div key={recipe.id} style={{ flex: '1 0 21%' }}>
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
        <div className={styles.subheader}>
          My Lists
          <Button label={'+ Add List'} onClick={addList} />
        </div>
        <div className={styles.recipes}>
          {!listLoading &&
            !listError &&
            listData.getMyLists.slice(0, listStart + 4).map(list => (
              <div key={list.id} style={{ flex: '1 0 21%' }}>
                <RecipeListCard list={list} />
              </div>
            ))}
        </div>
        <div className={styles.expandContainer}>
          <p className={styles.expand}>expand</p>
          <IconButton
            onClick={() => {
              setListStart(listStart + 4);
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
