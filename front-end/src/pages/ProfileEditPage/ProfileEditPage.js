import React from 'react';
import styles from './ProfileEditPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const ProfileEditPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Profile edit page</h1>
    </PageContainer>
  );
};

export default ProfileEditPage;
