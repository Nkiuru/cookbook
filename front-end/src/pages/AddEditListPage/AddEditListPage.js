import React, { useState } from 'react';
import styles from './AddEditListPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_LIST, MODIFY_LIST } from '../../utils/mutations/lists';
import { GET_CATEGORIES } from '../../utils/queries/categories';
import { GET_TAGS } from '../../utils/queries/tags';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

const AddEditListPage = () => {
  const history = useHistory();
  const location = useLocation();
  const list = location.state;
  return (
    <PageContainer>
      <Toolbar />
      {list ? <EditList list={list.list} /> : <AddList />}
    </PageContainer>
  );
};

const AddList = () => {
  const [createList] = useMutation(CREATE_LIST);
  const { loading: catLoading, error: catError, data: categories } = useQuery(GET_CATEGORIES);
  const { loading: tagLoading, error: tagError, data: tags } = useQuery(GET_TAGS);

  const initialValues = {
    name: '',
    description: '',
    tags: [],
    categories: [],
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Required field'),
    description: Yup.string().required('Required field'),
  });
  const submit = ({ name, description, tags, categories }, { setSubmitting }) => {
    const variables = { variables: { name, description, tags, categories } };
    console.log(variables);
    createList(variables).then(l => {
      setSubmitting(false);
      window.alert('Saved');
    });
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Create a new list</div>
      </div>
      <div className={styles.container}>
        <Formik onSubmit={submit} initialValues={initialValues} validationSchema={validationSchema}>
          {({ isSubmitting, resetForm }) => (
            <Form className={styles.col}>
              <TextInput
                name="name"
                type="text"
                label="Name"
                placeholder="e.g. Favourite recipes"
                superClass={styles.fullWidth}
              />
              <TextInput
                name="description"
                type="text"
                label="Description"
                placeholder="Write a short description of the list"
                superClass={styles.fullWidth}
                style={{ marginTop: '16px' }}
              />
              <div className={styles.row}>
                <div style={{ flex: 1, marginRight: '16px' }}>
                  <InputLabel htmlFor="tagLabel">Tags</InputLabel>
                  <Field component={Select} name="tags" multiple inputProps={{ id: 'tag' }} style={{ width: '100%' }}>
                    {!tagLoading &&
                      !tagError &&
                      tags.getTags.map(tag => (
                        <MenuItem key={tag._id} value={tag._id}>
                          {tag.name}
                        </MenuItem>
                      ))}
                  </Field>
                </div>
                <div style={{ flex: 1, marginLeft: '16px' }}>
                  <InputLabel htmlFor="label">Categories</InputLabel>
                  <Field
                    component={Select}
                    name="categories"
                    multiple
                    inputProps={{ id: 'label' }}
                    style={{ width: '100%' }}
                  >
                    {!catLoading &&
                      !catError &&
                      categories.getCategories.map(cat => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </Field>
                </div>
              </div>
              {isSubmitting ? (
                <p>Sending</p>
              ) : (
                <div className={styles.row}>
                  <Button
                    type="button"
                    label="Cancel"
                    secondary
                    onClick={resetForm}
                    style={{ marginTop: '16px', width: '96px' }}
                  />
                  <Button type="submit" label="Save" primary filled style={{ marginTop: '16px', width: '96px' }} />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

const EditList = ({ list }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>Modify {list.name}</div>
    </div>
  );
};

EditList.propTypes = {
  list: PropTypes.object,
};

export default AddEditListPage;
