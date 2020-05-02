import React from 'react';
import styles from './ProfilePage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const ProfilePage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Profile page</h1>
    </PageContainer>
  );
};

export default ProfilePage;
