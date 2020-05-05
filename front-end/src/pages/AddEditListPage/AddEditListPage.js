import React from 'react';
import styles from './AddEditListPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIST, MODIFY_LIST } from '../../utils/mutations/lists';
import { TagCategoryRow } from '../AddEditRecipePage/RecipeInputs';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import RecipeSearchItem from '../../components/RecipeSearchItem';

const AddEditListPage = () => {
  const location = useLocation();
  const list = location.state;
  return (
    <PageContainer>
      <Toolbar />
      {list ? <EditList list={list} /> : <AddList />}
    </PageContainer>
  );
};

const AddList = () => {
  const [createList] = useMutation(CREATE_LIST);

  const initialValues = {
    name: '',
    description: '',
    tags: [],
    categories: [],
  };

  const submit = ({ name, description, tags, categories }, { setSubmitting }) => {
    const variables = { variables: { name, description, tags, categories } };
    console.log(variables);
    createList(variables)
      .then(l => {
        setSubmitting(false);
        window.alert('Saved');
      })
      .catch(e => {
        window.alert(e);
      });
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Create a new list</div>
      </div>
      <ListForm initialValues={initialValues} submit={submit} />
    </>
  );
};
const validationSchema = Yup.object({
  name: Yup.string().required('Required field'),
  description: Yup.string().required('Required field'),
});
const ListForm = ({ initialValues, submit }) => {
  return (
    <div className={styles.container}>
      <Formik onSubmit={submit} initialValues={initialValues} validationSchema={validationSchema}>
        {({ isSubmitting, resetForm, values }) => (
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
            <TagCategoryRow />
            {initialValues.recipes && (
              <FieldArray
                name="recipes"
                render={arrayHelpers => (
                  <div>
                    <div className={styles.header}>
                      <div className={styles.title}>Recipes</div>
                    </div>
                    {values.recipes.map((i, index) => (
                      <div key={index} className={styles.row}>
                        {i.images && (
                          <>
                            <RecipeSearchItem recipe={i} />
                            <Tooltip title="Remove from list">
                              <IconButton onClick={() => arrayHelpers.remove(index)}>
                                <RemoveIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              />
            )}
            {isSubmitting ? (
              <p>Sending</p>
            ) : (
              <div className={styles.row}>
                <Button
                  type="button"
                  label="Reset"
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
  );
};

const EditList = ({ list }) => {
  const [modifyList] = useMutation(MODIFY_LIST);
  const initialValues = {
    name: list.name,
    description: list.description,
    tags: list.tags.map(t => {
      return t._id;
    }),
    categories: list.categories.map(t => {
      return t._id;
    }),
    recipes: list.recipes,
  };
  const submit = (vars, { setSubmitting }) => {
    vars.recipes = vars.recipes.map(e => {
      return e.id;
    });
    vars.id = list.id;
    const variables = { variables: vars };
    console.log(variables);
    modifyList(variables)
      .then(l => {
        setSubmitting(false);
        window.alert('Saved');
      })
      .catch(e => {
        window.alert(e);
      });
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>Modify list: {list.name}</div>
      <ListForm initialValues={initialValues} submit={submit} />
    </div>
  );
};

ListForm.propTypes = {
  initialValues: PropTypes.array,
  submit: PropTypes.func,
};

EditList.propTypes = {
  list: PropTypes.object,
};

export default AddEditListPage;
