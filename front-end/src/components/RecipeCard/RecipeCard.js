import React from 'react';
import styles from './RecipeCard.module.scss';
import PropTypes from 'prop-types';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Tag from '../Tag';

const RecipeCard = ({ recipe }) => {
  const history = useHistory();

  const openProfile = () => {
    history.push({
      pathname: `/user/${recipe.author.id}`,
      state: { user: recipe.author },
    });
  };
  const primaryImage = recipe.images.find(img => {
    return img.primary;
  });
  const openRecipe = () => {
    history.push({
      pathname: `/recipe/${recipe.id}`,
      state: { recipe },
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title} onClick={openRecipe}>
            {recipe.title}
          </div>
          <Tooltip title={recipe.author.fullName}>
            <IconButton onClick={openProfile}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.description}>{recipe.description}</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {recipe.tags.map(tag => (
            <div key={tag._id}>
              <Tag tag={tag} />
            </div>
          ))}
        </div>
        <figure className={styles.imgContainer}>
          <img
            className={styles.image}
            src={`http://localhost:3000/${primaryImage.file.path}`}
            alt={primaryImage.altText}
            onClick={openRecipe}
          />
        </figure>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object,
};

export default RecipeCard;
