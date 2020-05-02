import React, { useState } from 'react';
import styles from './LoginModal.module.scss';
import PropTypes from 'prop-types';
import Button from '../Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextInput from '../TextInput';

const LoginModal = ({ onLogin, onSignup }) => {
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().required('Required field'),
    password: Yup.string().required('Required field'),
  });
  return (
    <div>
      <Formik onSubmit={onLogin} initialValues={initialValues} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form className={styles.login}>
            <TextInput name="email" type="email" label="Email" placeholder="jane.doe@email.fi" />
            <TextInput
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              style={{ marginTop: '16px' }}
            />
            {isSubmitting ? <p>Sending</p> : <Button type="submit" label="Login" style={{ marginTop: '16px' }} />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginModal.propTypes = {
  onLogin: PropTypes.func,
  onSignup: PropTypes.func,
};

export default LoginModal;
