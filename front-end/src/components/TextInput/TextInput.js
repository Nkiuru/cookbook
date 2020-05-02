import React from 'react';
import styles from './TextInput.module.scss';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const TextInput = ({ label, style, superClass, ...props }) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const classes = [styles.container];
  superClass && classes.push(superClass);
  touched && error && classes.push(styles.error);
  return (
    <div className={classes.join(' ')} style={style}>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input {...field} {...props} />
      {touched && error && <p>{error}</p>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['tel', 'text', 'time', 'date', 'email', 'password', 'datetime-local']).isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  superClass: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};

export default TextInput;
