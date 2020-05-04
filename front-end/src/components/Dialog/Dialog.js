import React from 'react';
import styles from './Dialog.module.scss';

import PropTypes from 'prop-types';

const Dialog = ({
  children,
  visible,
  header,
  onOutsideClick,
  positiveLabel,
  onPositiveClicked,
  negativeLabel,
  onNegativeClicked,
}) => {
  const handleBackgroundClick = ({ target }) => {
    if (target.id === 'bg' && onOutsideClick) onOutsideClick();
  };
  return (
    <div
      id="bg"
      className={styles.container}
      onClick={handleBackgroundClick}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div className={styles.dialog}>
        <div className={styles.header}>{header}</div>
        {children}
        <div className={styles.buttonContainer}>
          {onNegativeClicked && (
            <div className={`${styles.button} ${styles.negative}`} onClick={onNegativeClicked}>
              {negativeLabel}
            </div>
          )}
          {onPositiveClicked && (
            <div className={`${styles.button} ${styles.positive}`} onClick={onPositiveClicked}>
              {positiveLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  header: PropTypes.string,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  onOutsideClick: PropTypes.func,
  positiveLabel: PropTypes.string,
  onPositiveClicked: PropTypes.func,
  negativeLabel: PropTypes.string,
  onNegativeClicked: PropTypes.func,
};

export default Dialog;
