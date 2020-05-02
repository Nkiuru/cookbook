import React, { useState, useEffect, useCallback } from 'react';
import styles from './HomePage.module.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../../utils/queries/users';
import { LOGIN, SIGNGUP } from '../../utils/mutations/auth';
import PageContainer from '../../containers/PageContainer';
import Button from '../../components/Button';
import LoginSignupDialog from '../../components/LoginModal';
import pizza from '../../assets/pizza.jpg';
import salmon from '../../assets/salmon.jpeg';

const HomePage = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { loading, error, data } = useQuery(GET_ME);
  const { login } = useMutation(LOGIN);
  const { signup } = useMutation(SIGNGUP);
  const classes = [styles.page];
  (showDialog || showLoginDialog) && classes.push(styles.blurred);
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;

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
    setShowLoginDialog(false);
  };
  const loginHandler = ({ email, password }) => {
    login({ variables: { email, password } }).then(saveCredentials);
  };
  const signupHandler = ({ email, firstName, lastName, password }) => {
    signup({ variables: { email, password, firstName, lastName } }).then(() => {
      window.alert('Account created');
      setShowDialog(false);
    });
  };
  if (loading) return <p>Loading...</p>;

  return (
    <PageContainer>
      <div className={classes.join(' ')}>
        <div className={styles.container}>
          <h2 className={styles.title}>Cookbook</h2>
          <p style={{ width: '55%' }}>
            Description of what cookbook does, its features, what it can do for users, what users can do etc.
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
