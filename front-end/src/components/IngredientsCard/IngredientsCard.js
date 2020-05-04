import React from 'react';
import styles from './IngredientsCard.module.scss';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

const IngredientsCard = ({ ingredients, equipment }) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.title}>Ingredients</div>
        {ingredients.map(i => (
          <div key={i.ingredient}>
            <FormControlLabel
              control={<Checkbox name={i.name} classes={{ checked: styles.color }} />}
              label={`${i.amount} ${i.ingredient}`}
              classes={{ label: styles.text }}
            />
          </div>
        ))}
      </div>
      <Divider orientation="vertical" flexItem />
      <div className={styles.container}>
        <div className={styles.title}>Equipment</div>
        {equipment.map(e => (
          <div key={e.name}>
            <FormControlLabel
              control={<Checkbox name={e.name} classes={{ checked: styles.color }} />}
              label={`${e.amount} ${e.name}`}
              classes={{ label: styles.text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

IngredientsCard.propTypes = {
  ingredients: PropTypes.array,
  equipment: PropTypes.array,
};

export default IngredientsCard;
