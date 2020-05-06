import React, { useState, useEffect, useCallback } from 'react';
import styles from './HomePage.module.scss';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN, SIGNGUP } from '../../utils/mutations/auth';
import PageContainer from '../../containers/PageContainer';
import Button from '../../components/Button';
import LoginSignupDialog from '../../components/LoginModal';
import pizza from '../../assets/pizza.jpg';
import salmon from '../../assets/salmon.jpeg';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNGUP);
  const classes = [styles.page];
  (showDialog || showLoginDialog) && classes.push(styles.blurred);
  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;

    if (keyCode === 27) {
      setShowDialog(false);
      setShowLoginDialog(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  const saveCredentials = ({ data }) => {
    localStorage.setItem('token', data.login.token);
    localStorage.setItem('user', JSON.stringify(data.login.user));
    history.push('/dashboard');
    setShowLoginDialog(false);
  };
  const loginHandler = ({ email, password }) => {
    login({ variables: { email, password } })
      .then(saveCredentials)
      .catch(e => {
        window.alert(e);
      });
  };
  const signupHandler = ({ email, firstName, lastName, password }) => {
    signup({ variables: { email, password, firstName, lastName } })
      .then(() => {
        window.alert('Account created');
        setShowDialog(false);
        setShowLoginDialog(true);
      })
      .catch(e => {
        window.alert(e);
      });
  };
  return (
    <PageContainer>
      <div className={classes.join(' ')}>
        <div className={styles.container}>
          <h2 className={styles.title}>Cookbook</h2>
          <p style={{ maxWidth: '60%', lineHeight: '200%' }}>
            Cookbook is a recipe database that allows users to organize, plan their meals and share their recipes. The
            application aims to help users to keep track of their recipes that they have in their head and to track
            calories in meals to encourage users to eat healthier.
          </p>
          <div className={styles.actions}>
            <Button label="Login" secondary onClick={() => setShowLoginDialog(true)} />
            <p className={styles.sep}>/</p>
            <Button label="Sign up" primary onClick={() => setShowDialog(true)} />
          </div>
        </div>
        <div className={styles.images}>
          <img src={pizza} alt="pizza" />
          <img src={salmon} alt="salmon" />
        </div>
      </div>
      {showLoginDialog && <LoginSignupDialog login={loginHandler} />}
      {showDialog && <LoginSignupDialog signup={signupHandler} />}
    </PageContainer>
  );
};

export default HomePage;
