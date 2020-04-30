import React from 'react';
import styles from './HomePage.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS } from '../../utils/queries/users';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { search: 'niklas' },
  });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }
  console.log(data);
  return data.getUsers.map(({ id, fullName, email }) => (
    <div key={id}>
      <p>
        {fullName}: {email}
      </p>
    </div>
  ));
};

export default HomePage;
