import React from 'react';
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
import Tag from '../Tag';
import { AccountCircle } from '@material-ui/icons';
import moment from 'moment';

const RecipeDetailsCard = ({ recipe }) => {
  const primaryImage = recipe.images.find(img => {
    return img.primary;
  });
  const addToList = () => {
    //TODO: Open modal
  };
  console.log(recipe);
  const hasRated = () => {
    const id = localStorage.getItem('user').id;
    return recipe.ratings.find(rating => id === rating.user.id);
  };
  const rateRecipe = (event, value) => {
    //TODO: add recipe rating
    console.log(value);
  };

  const openUser = () => {};

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={`http://localhost:3000/${primaryImage.file.path}`}
          alt={primaryImage.altText}
        />
      </div>
      <Divider orientation={'vertical'} />
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{recipe.title}</div>
          <Tooltip title={'Add to list'}>
            <IconButton onClick={addToList}>
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
          <div className={styles.infoText}>{recipe.description}</div>
        </div>
        <div style={{ display: 'flex', height: '100%' }} />
        <div className={styles.row}>
          <div className={styles.infoText}>Notes:{recipe.notes}</div>
        </div>
        <Divider />
        <div className={styles.row}>
          {recipe.tags.map(tag => (
            <div key={tag._id} style={{ margin: '4px' }}>
              <Tag tag={tag} />
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
          </div>
        </div>
      </div>
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
