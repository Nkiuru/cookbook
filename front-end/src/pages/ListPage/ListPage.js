import React, { useState } from 'react';
import styles from './ListPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useHistory, useLocation } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_RECIPES } from '../../utils/queries/recipes';
import RecipeCard from '../../components/RecipeCard';
import Divider from '@material-ui/core/Divider';
import Button from '../../components/Button';
import Tag from '../../components/Tag';
import Category from '../../components/Category';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '../../components/Dialog';
import { DELETE_LIST } from '../../utils/mutations/lists';

const ListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const list = location.state.list;
  const user = JSON.parse(localStorage.getItem('user'));
  const { loading, error, data } = useQuery(GET_RECIPES, { variables: { list: list.id } });
  const [deleteListOp] = useMutation(DELETE_LIST);

  const editList = () => {
    history.push({
      pathname: `/list/${list.id}/edit`,
      state: list,
    });
  };
  const deleteList = () => {
    deleteListOp({ variables: { id: list.id } }).then(({ data }) => {
      window.alert(data.deleteList);
      setShowDeleteDialog(false);
      history.goBack();
    });
  };
  return (
    <PageContainer>
      <Toolbar />
      <div className={styles.header}>
        {list.owner.id === user.id && (
          <Tooltip title={'Delete Recipe'}>
            <IconButton onClick={() => setShowDeleteDialog(true)}>
              <DeleteForeverIcon color={'error'} />
            </IconButton>
          </Tooltip>
        )}
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
      <Dialog
        header={'Delete list'}
        visible={showDeleteDialog}
        onOutsideClick={() => setShowDeleteDialog(false)}
        positiveLabel={'Delete'}
        negativeLabel={'Cancel'}
        onPositiveClicked={deleteList}
        onNegativeClicked={() => setShowDeleteDialog(false)}
      >
        <div style={{ margin: '16px' }}>
          <div>Are you sure you want to delete the list?</div>
        </div>
      </Dialog>
    </PageContainer>
  );
};

export default ListPage;
