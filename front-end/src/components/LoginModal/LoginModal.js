import React from 'react';
import styles from './LoginModal.module.scss';
import PropTypes from 'prop-types';
import Button from '../Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextInput from '../TextInput';

const LoginSignupDialog = ({ login, signup }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {login && <LoginModal onLogin={login} />}
        {signup && <SignupModal onSignup={signup} />}
      </div>
    </div>
  );
};

const LoginModal = ({ onLogin }) => {
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().required('Required field'),
    password: Yup.string().required('Required field'),
  });
  return (
    <div className={styles.inputs}>
      <h2 className={styles.title}>Login</h2>
      <Formik onSubmit={onLogin} initialValues={initialValues} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form>
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

const SignupModal = ({ onSignup }) => {
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required field'),
    lastName: Yup.string().required('Required field'),
    email: Yup.string().required('Required field'),
    password: Yup.string().required('Required field'),
  });
  return (
    <div className={styles.inputs}>
      <h2 className={styles.title}>Sign up</h2>
      <Formik onSubmit={onSignup} initialValues={initialValues} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form>
            <TextInput name="email" type="email" label="Email" placeholder="jane.doe@email.fi" />
            <TextInput name="firstName" type="text" label="First name" placeholder="First name" />
            <TextInput name="lastName" type="text" label="Last name" placeholder="Last name" />
            <TextInput
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              style={{ marginTop: '16px' }}
            />
            {isSubmitting ? (
              <p>Sending</p>
            ) : (
              <Button type="submit" label="Sign in" style={{ marginTop: '16px' }} primary filled />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginSignupDialog.propTypes = {
  login: PropTypes.func,
  signup: PropTypes.func,
};

LoginModal.propTypes = {
  onLogin: PropTypes.func,
};

SignupModal.propTypes = {
  onSignup: PropTypes.func,
};

export default LoginSignupDialog;
