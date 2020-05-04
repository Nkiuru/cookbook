import React from 'react';
import styles from './Category.module.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Category = ({ category }) => {
  const history = useHistory();

  const openTag = category => {
    history.push({
      pathname: '/recipes/search',
      state: { categories: [category._id] },
    });
  };
  return (
    <div
      key={category._id}
      className={styles.tag}
      onClick={() => {
        openTag(category);
      }}
    >
      {category.name}
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object,
};

export default Category;
