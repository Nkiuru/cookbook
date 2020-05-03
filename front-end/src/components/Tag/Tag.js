import React from 'react';
import styles from './Tag.module.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Tag = ({ tag }) => {
  const history = useHistory();

  const openTag = tag => {
    history.push({
      pathname: '/recipes/search',
      state: { tags: [tag._id] },
    });
  };
  return (
    <div
      key={tag._id}
      className={styles.tag}
      onClick={() => {
        openTag(tag);
      }}
    >
      {tag.name}
    </div>
  );
};

Tag.propTypes = {
  tag: PropTypes.object,
};

export default Tag;
