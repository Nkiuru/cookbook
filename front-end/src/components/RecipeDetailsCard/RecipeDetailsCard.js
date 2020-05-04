import React, { useState } from 'react';
import styles from './RecipeDetailsCard.module.scss';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Rating from '@material-ui/lab/Rating';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import Divider from '@material-ui/core/Divider';
import PieChartIcon from '@material-ui/icons/PieChart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tag from '../Tag';
import { AccountCircle } from '@material-ui/icons';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Category from '../Category';
import Dialog from '../Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_MY_LISTS } from '../../utils/queries/lists';
import { ADD_RECIPE_TO_LIST } from '../../utils/mutations/lists';
import { ADD_RECIPE_RATING, DELETE_RECIPE } from '../../utils/mutations/recipes';

const RecipeDetailsCard = ({ recipe }) => {
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selected, setSelected] = useState('');
  const { loading: listLoading, error: listError, data: listData } = useQuery(GET_MY_LISTS);
  const [addRecipe] = useMutation(ADD_RECIPE_TO_LIST);
  const [addRating] = useMutation(ADD_RECIPE_RATING);
  const [deleteRecipeOp] = useMutation(DELETE_RECIPE);

  const user = JSON.parse(localStorage.getItem('user'));
  const primaryImage = recipe.images.find(img => {
    return img.primary;
  });
  const addToList = () => {
    addRecipe({ variables: { id: selected, recipe: recipe.id } }).then(() => {
      window.alert('Added');
      setShowDialog(false);
    });
  };
  const rateRecipe = (event, value) => {
    console.log(value);
    addRating({ variables: { recipe: recipe.id, score: value } }).then(() => {
      window.alert('Rating added');
    });
  };

  const openUser = () => {
    history.push({
      pathname: `/user/${recipe.author.id}`,
      state: { user: recipe.author },
    });
  };

  const deleteRecipe = () => {
    deleteRecipeOp({ variables: { id: recipe.id } }).then(() => {
      window.alert('Recipe deleted');
      setShowDialog(false);
      history.goBack();
    });
  };
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={`http://localhost:3000/${primaryImage.file.path}`}
          alt={primaryImage.altText}
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{recipe.title}</div>
          <Tooltip title={'Add to list'}>
            <IconButton onClick={() => setShowDialog(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.row}>
          <Rating
            name="recipe-rating"
            precision={0.5}
            defaultValue={recipe.rating}
            onChange={rateRecipe}
            style={{ marginRight: '8px' }}
          />
          <div className={styles.smallText}>{recipe.ratings.length} ratings</div>
        </div>
        <div className={styles.row}>
          <ScheduleIcon className={styles.icon} />
          <div className={styles.infoText}>{recipe.cookingTime}</div>
        </div>
        <div className={styles.row}>
          <ShowChartIcon className={styles.icon} />
          <div className={styles.infoText} style={{ textTransform: 'lowercase' }}>
            {recipe.difficulty}
          </div>
        </div>
        <div className={styles.row}>
          <BarChartIcon className={styles.icon} />
          <div className={styles.infoText}>{recipe.calories} kcal</div>
        </div>
        <div className={styles.row}>
          <PieChartIcon className={styles.icon} />
          <div className={styles.infoText}>{recipe.portions} portions</div>
        </div>
        <div className={styles.row}>
          <div className={styles.infoText}>{recipe.description}</div>
        </div>
        <div style={{ display: 'flex', height: '100%' }} />
        <div className={styles.row}>
          <div className={styles.infoText}>Notes:{recipe.notes}</div>
        </div>
        <Divider />
        <div className={styles.row}>
          {recipe.tags.map(tag => (
            <div key={tag._id} style={{ margin: '4px 4px 4px 0' }}>
              <Tag tag={tag} />
            </div>
          ))}
        </div>
        <Divider />
        <div className={styles.row}>
          {recipe.categories.map(cat => (
            <div key={cat._id} style={{ margin: '4px 4px 4px 0' }}>
              <Category category={cat} />
            </div>
          ))}
        </div>
        <Divider />
        <div className={styles.date}>
          {getMonth(recipe.createdAt)}. Last updated {getDate(recipe.updatedAt)}
        </div>
        <div className={styles.date}>
          <div className={styles.row}>
            <div>BY: </div>
            <IconButton onClick={openUser}>
              <AccountCircle />
            </IconButton>
            <div className={styles.infoText}>
              <div>{recipe.author.fullName}</div>
            </div>
            <div style={{ display: 'flex' }} />
            {recipe.author.id === user.id && (
              <Tooltip title={'Delete Recipe'}>
                <IconButton onClick={() => setShowDeleteDialog(true)} style={{ marginLeft: 'auto' }}>
                  <DeleteForeverIcon color={'error'} />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <Dialog
        header={'Add to list'}
        visible={showDialog}
        onOutsideClick={() => setShowDialog(false)}
        positiveLabel={'Add'}
        negativeLabel={'Cancel'}
        onPositiveClicked={addToList}
        onNegativeClicked={() => setShowDialog(false)}
      >
        <div className={styles.container}>
          <div>Select List</div>
          <InputLabel id="label">List</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={selected}
            style={{ width: '200px' }}
            onChange={event => setSelected(event.target.value)}
          >
            {!listLoading &&
              !listError &&
              listData.getMyLists.map(list => (
                <MenuItem key={list.id} value={list.id}>
                  {list.name}
                </MenuItem>
              ))}
          </Select>
        </div>
      </Dialog>
      <Dialog
        header={'Delete recipe'}
        visible={showDeleteDialog}
        onOutsideClick={() => setShowDeleteDialog(false)}
        positiveLabel={'Delete'}
        negativeLabel={'Cancel'}
        onPositiveClicked={deleteRecipe}
        onNegativeClicked={() => setShowDeleteDialog(false)}
      >
        <div className={styles.container}>
          <div>Are you sure you want to delete the recipe?</div>
        </div>
      </Dialog>
    </div>
  );
};

const getMonth = date => {
  return moment(date).format('MMMM YYYY');
};

const getDate = date => {
  return moment(date).format('DD.MM.YYYY');
};

RecipeDetailsCard.propTypes = {
  recipe: PropTypes.object,
};
export default RecipeDetailsCard;
