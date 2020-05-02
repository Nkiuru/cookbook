import React, { useState, useEffect, useCallback } from 'react';
import styles from './HomePage.module.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../../utils/queries/users';
import { LOGIN, SIGNGUP } from '../../utils/mutations/auth';
import LoginModal from '../../components/LoginModal';
import PageContainer from '../../containers/PageContainer';
import Button from '../../components/Button';
import LoginSignupDialog from '../../components/LoginModal';

const HomePage = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { loading, error, data } = useQuery(GET_ME);
  const { login } = useMutation(LOGIN);
  const { signup } = useMutation(SIGNGUP);
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
  };
  const loginHandler = ({ email, password }) => {
    login({ variables: { email, password } }).then(saveCredentials);
  };
  const signupHandler = ({ email, firstName, lastName, password }) => {
    signup({ variables: { email, password, firstName, lastName } }).then(() => {
      window.alert('Account created');
    });
  };
  if (loading) return <p>Loading...</p>;

  return (
    <PageContainer>
      <div className={(showDialog || showLoginDialog) && styles.blurred}>
        <div>
          {data && (
            <div key={data.me.id}>
              <p>
                {data.me.fullName}: {data.me.email}
              </p>
            </div>
          )}
          {error && <p>{error.message}</p>}
        </div>
        <div>
          <Button label="Login" secondary onClick={() => setShowLoginDialog(true)} />
          /
          <Button label="Sign up" primary onClick={() => setShowDialog(true)} />
        </div>
        <div style={{ flexDirection: 'row', display: 'flex', margin: '16px' }}>
          <Button onClick={() => {}} primary label="Primary outline" />
          <Button onClick={() => {}} primary filled label="Primary filled" />
        </div>
        <div style={{ flexDirection: 'row', display: 'flex', margin: '16px' }}>
          <Button onClick={() => {}} secondary label="secondary outline" />
          <Button onClick={() => {}} secondary filled label="secondary filled" />
        </div>
      </div>
      {showLoginDialog && <LoginSignupDialog login={loginHandler} />}
      {showDialog && <LoginSignupDialog signup={signupHandler} />}
    </PageContainer>
  );
};

export default HomePage;
