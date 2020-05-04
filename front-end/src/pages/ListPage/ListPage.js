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
import Tag from '../../components/Tag';
import Category from '../../components/Category';

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
        <div className={styles.row}>
          <div className={styles.subtitle}>
            Description: <div className={styles.body}>{list.description}</div>
          </div>
        </div>
        <Divider />
        <div className={styles.row}>
          <div className={styles.subtitle}>Tags:</div>
          {list.tags.map(tag => (
            <div key={tag._id} style={{ margin: '4px 4px 4px 0' }}>
              <Tag tag={tag} />
            </div>
          ))}
        </div>
        <Divider />
        <div className={styles.row}>
          <div className={styles.subtitle}>Categories:</div>
          {list.categories.map(cat => (
            <div key={cat._id}>
              <Category category={cat} />
            </div>
          ))}
        </div>
        <Divider />
        <div className={styles.subheader} style={{ marginTop: '16px' }}>
          Recipes
        </div>
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
