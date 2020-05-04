import React from 'react';
import styles from './RecipeListCard.module.scss';
import PropTypes from 'prop-types';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Tag from '../Tag';

const RecipeListCard = ({ list }) => {
  const history = useHistory();
  const openProfile = () => {
    history.push({
      pathname: `/user/${list.owner.id}`,
      state: { user: list.owner },
    });
  };
  const primaryImages = list.recipes
    .filter(recipe => {
      return recipe.images.find(img => {
        return img.primary;
      });
    })
    .slice(0, 3);
  let width = primaryImages.length === 2 ? '50%' : '25%';
  if (primaryImages.length === 1) {
    width = '100%';
  }
  const openList = () => {
    history.push({
      pathname: `/list/${list.id}`,
      state: { list },
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{list.name}</div>
          <Tooltip title={list.owner.fullName}>
            <IconButton onClick={openProfile}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.description}>{list.description}</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {list.tags.map(tag => (
            <div key={tag._id}>
              <Tag tag={tag} />
            </div>
          ))}
        </div>
        <figure className={styles.imgContainer}>
          {primaryImages &&
            primaryImages.map(img => (
              <img
                key={img.images[0].file._id}
                style={{ width }}
                className={styles.image}
                src={`http://localhost:3000/${img.images[0].file.path}`}
                alt={img.images[0].altText}
                onClick={openList}
              />
            ))}
          <div className={styles.overlayText}>{list.recipes.length} recipes</div>
        </figure>
      </div>
    </div>
  );
};

RecipeListCard.propTypes = {
  list: PropTypes.object,
};

export default RecipeListCard;
