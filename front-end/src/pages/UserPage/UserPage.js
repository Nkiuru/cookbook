import React, { useState } from 'react';
import styles from './UserPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import RecipeCard from '../../components/RecipeCard';
import Divider from '@material-ui/core/Divider';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPES } from '../../utils/queries/recipes';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import { useLocation } from 'react-router-dom';
import { GET_USERS_LISTS } from '../../utils/queries/lists';
import RecipeListCard from '../../components/RecipeListCard';

const UserPage = () => {
  const location = useLocation();
  const [recipeStart, setRecipeStart] = useState(0);
  const [listStart, setListStart] = useState(0);
  const user = location.state.user;
  const { loading, error, data } = useQuery(GET_RECIPES, { variables: { author: user.id } });
  const { loading: listLoading, error: listError, data: listData } = useQuery(GET_USERS_LISTS, {
    variables: { userId: user.id },
  });
  return (
    <PageContainer>
      <Toolbar />
      <div className={styles.header}>
        <div className={styles.title}>{user.fullName}</div>
      </div>
      <div>
        <div className={styles.subheader}>{user.fullName + "'s Recipes"}</div>
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
        <div className={styles.subheader}>{user.fullName + "'s Lists"}</div>
        <div className={styles.recipes}>
          {!listLoading &&
            !listError &&
            listData.getUsersLists.slice(0, listStart + 4).map(list => (
              <div key={list.id}>
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

export default UserPage;
