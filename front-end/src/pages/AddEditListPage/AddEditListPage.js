import React from 'react';
import styles from './AddEditListPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const AddEditListPage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>List Add/Edit page</h1>
    </PageContainer>
  );
};

export default AddEditListPage;
