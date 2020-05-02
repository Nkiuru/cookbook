import React from 'react';
import styles from './AddEditRecipePage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';

const AddEditRecipePage = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Recipe add/edit page</h1>
    </PageContainer>
  );
};

export default AddEditRecipePage;
