import React from 'react';
import styles from './DashboardPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
const DashboardPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Dashboard page</h1>
    </PageContainer>
  );
};

export default DashboardPage;
