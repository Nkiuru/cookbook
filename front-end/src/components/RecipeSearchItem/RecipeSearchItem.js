import React from 'react';
import styles from './RecipeSearchItem.module.scss';
import IconButton from '@material-ui/core/IconButton';
import { KeyboardArrowRight } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tag from '../Tag';

const RecipeSearchItem = ({ recipe }) => {
  const history = useHistory();
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
      <div>
        <img
          className={styles.img}
          src={`http://localhost:3000/${primaryImage.file.path}`}
          alt={primaryImage.altText}
          onClick={openRecipe}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{recipe.title}</div>
        <div className={styles.description}>{recipe.description}</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {recipe.tags.map(tag => (
            // eslint-disable-next-line react/jsx-key
            <div key={tag._id}>
              <Tag tag={tag} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.action}>
        <IconButton onClick={openRecipe}>
          <KeyboardArrowRight />
        </IconButton>
      </div>
    </div>
  );
};

RecipeSearchItem.propTypes = {
  recipe: PropTypes.object,
};

export default RecipeSearchItem;
