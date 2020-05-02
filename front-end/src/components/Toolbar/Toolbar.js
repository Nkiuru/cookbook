import React, { useState } from 'react';
import styles from './Toolbar.module.scss';
import Button from '../Button';
import TextInput from '../TextInput';
import { Formik, Form } from 'formik';
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, Link } from 'react-router-dom';

const Toolbar = () => {
  const [showBrowse, setShowBrowse] = useState(false);
  const history = useHistory();
  const handleSubmit = ({ search }) => {
    // TODO: SEARCH & navigate to recipe search page
    console.log(search);
  };
  const openProfile = () => {
    const route = '/profile';
    if (history.location.pathname !== route) {
      history.push(route);
    }
  };
  return (
    <div className={styles.toolbar}>
      <div className={styles.content}>
        <h1 className={styles.title}>cookbook</h1>
        <Button label="Browse" secondary filled onClick={() => setShowBrowse(!showBrowse)} />
        <Formik onSubmit={handleSubmit} initialValues={{ search: '' }} enableReinitialize={false}>
          <Form className={styles.search}>
            <TextInput type="text" placeholder="SEARCH" name="search" superClass={styles.input} />
            <Button type="submit" label={''} style={{ display: 'none' }} />
          </Form>
        </Formik>
        <IconButton className={styles.icon} onClick={openProfile}>
          <PersonIcon />
        </IconButton>
      </div>
      {showBrowse && <ExpandedToolbar />}
    </div>
  );
};

const ExpandedToolbar = () => {
  const history = useHistory();
  const addRecipe = () => {
    const route = '/recipe/0/edit';
    if (history.location.pathname !== route) {
      history.push(route);
    }
  };

  return (
    <div className={styles.expandedContent}>
      <div>
        <Link to="/dashboard">
          <p className={styles.link}>Dashboard</p>
        </Link>
        <Link to="/recipes">
          <p className={styles.link}>My Recipes</p>
        </Link>
      </div>
      <div>
        <Button label="+ Add Recipe" onClick={addRecipe} secondary superClass={styles.btn} />
      </div>
    </div>
  );
};
export default Toolbar;
