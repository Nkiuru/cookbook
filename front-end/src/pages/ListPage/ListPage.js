import React from 'react';
import styles from './ListPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const ListPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>List page</h1>
    </PageContainer>
  );
};

export default ListPage;
