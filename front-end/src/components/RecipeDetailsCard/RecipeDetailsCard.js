import React from 'react';
import styles from './RecipeDetailsCard.module.scss';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const RecipeDetailsCard = ({ recipe }) => {
  const primaryImage = recipe.images.find(img => {
    return img.primary;
  });
  const addToList = () => {
    //TODO: Open modal
  };

  const hasRated = () => {
    const id = localStorage.getItem('user').id;
    return recipe.ratings.find(rating => id === rating.user.id);
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
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{recipe.title}</div>
          <Tooltip title={'Add to list'}>
            <IconButton onClick={addToList}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

RecipeDetailsCard.propTypes = {
  recipe: PropTypes.object,
};
export default RecipeDetailsCard;
