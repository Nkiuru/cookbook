import React from 'react';
import styles from './HomePage.module.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../../utils/queries/users';
import { LOGIN } from '../../utils/mutations/auth';
import LoginModal from '../../components/LoginModal';
import PageContainer from '../../containers/PageContainer';

const HomePage = () => {
  let login = '';
  let { loading, error, data } = useQuery(GET_ME);
  [login, error] = useMutation(LOGIN);
  if (loading) return <p>Loading...</p>;
  const func = ({ data }) => {
    localStorage.setItem('token', data.login.token);
    localStorage.setItem('user', JSON.stringify(data.login.user));
  };
  return (
    <PageContainer>
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
      <LoginModal
        onLogin={(email, password) => {
          console.log(email);
          console.log(password);
          login({ variables: { email, password } }).then(func);
        }}
      />
    </PageContainer>
  );
};

export default HomePage;
