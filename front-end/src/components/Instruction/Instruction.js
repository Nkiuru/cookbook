import React from 'react';
import styles from './Instruction.module.scss';
import PropTypes from 'prop-types';
/*
      instructions {
        step
        text
        image {
          _id
          filename
          mimetype
          path
        }
      }
 */
const Instruction = ({ instruction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.stepNo}>
          <p>{instruction.step}</p>
        </div>
        <div className={styles.text}>{instruction.text}</div>
      </div>
      <div className={styles.imgContainer}>
        {instruction.image && (
          <img
            className={styles.img}
            src={`http://localhost:3000/${instruction.image.path}`}
            alt={instruction.image.altText}
          />
        )}
      </div>
    </div>
  );
};

Instruction.propTypes = {
  instruction: PropTypes.object,
};

export default Instruction;
