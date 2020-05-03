import React from 'react';
import styles from './ListPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useHistory, useLocation } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPES } from '../../utils/queries/recipes';
import RecipeCard from '../../components/RecipeCard';
import Divider from '@material-ui/core/Divider';
import Button from '../../components/Button';

const ListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const list = location.state.list;
  const { loading, error, data } = useQuery(GET_RECIPES, { variables: { list: list.id } });
  const editList = () => {
    history.push({
      pathname: `/list/${list.id}/edit`,
      state: list,
    });
  };
  return (
    <PageContainer>
      <Toolbar />
      <div className={styles.header}>
        <div style={{ width: '128px' }} />
        <div className={styles.title}>List: {list.name}</div>
        <Button label={'Edit List'} onClick={editList} />
      </div>
      <div>
        <div className={styles.subheader}>Recipes</div>
        <div className={styles.recipes}>
          {!loading &&
            !error &&
            data.getRecipes.map(recipe => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
        </div>
        <Divider />
      </div>
    </PageContainer>
  );
};

export default ListPage;
