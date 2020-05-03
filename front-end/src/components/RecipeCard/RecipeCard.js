import React from 'react';
import styles from './RecipeCard.module.scss';
import PropTypes from 'prop-types';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const history = useHistory();

  const openProfile = () => {
    history.push(`/user/${recipe.author.userId}`);
  };
  const primaryImage = recipe.images.find(img => {
    return img.primary;
  });
  console.log(primaryImage);
  const openRecipe = () => {
    history.push(`/recipe/${recipe.id}`);
  };

  const openTag = tag => {};

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{recipe.title}</div>
          <IconButton onClick={openProfile}>
            <AccountCircle />
          </IconButton>
        </div>
        <div className={styles.description}>{recipe.description}</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {recipe.tags.map(tag => (
            <div
              key={tag._id}
              className={styles.tag}
              onClick={() => {
                openTag(tag._id);
              }}
            >
              {tag.name}
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
