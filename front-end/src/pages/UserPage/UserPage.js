import React from 'react';
import styles from './UserPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const UserPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>User page</h1>
    </PageContainer>
  );
};

export default UserPage;
