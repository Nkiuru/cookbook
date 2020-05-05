import React from 'react';
//import styles from './ListSearchPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const ListSearchPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>List search page</h1>
    </PageContainer>
  );
};

export default ListSearchPage;
