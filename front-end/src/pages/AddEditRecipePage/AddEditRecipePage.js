import React from 'react';
import styles from './AddEditRecipePage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import PropTypes from 'prop-types';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES } from '../../utils/queries/categories';
import { GET_TAGS } from '../../utils/queries/tags';
import { CREATE_RECIPE, MODIFY_RECIPE } from '../../utils/mutations/recipes';
import { useHistory, useLocation } from 'react-router';
import TextInput from '../../components/TextInput';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../../components/Button';
import { TagCategoryRow, IngredientEquipment, DifficultySelect, InstructionsInput, ImageInput } from './RecipeInputs';

const AddEditRecipePage = () => {
  const history = useHistory();
  const location = useLocation();
  const recipe = location.state;
  return (
    <PageContainer>
      <Toolbar />
      {recipe ? <EditRecipe recipe={recipe.recipe} /> : <AddRecipe />}
    </PageContainer>
  );
};

const AddRecipe = () => {
  const [createRecipe] = useMutation(CREATE_RECIPE);
  const initialValues = {
    name: '',
    description: '',
    equipment: [{ amount: '', name: '' }],
    ingredients: [{ amount: '', name: '' }],
    instructions: [{ step: '', text: '', image: undefined }],
    images: [{ file: undefined, primary: true, altText: '' }],
    calories: undefined,
    cookingTime: '',
    difficulty: '',
    portions: undefined,
    notes: '',
    tags: [],
    categories: [],
  };
  const submit = (vars, { setSubmitting }) => {
    const variables = { variables: vars };
    console.log(vars);
    createRecipe(variables).then(r => {
      setSubmitting(false);
      window.alert('Saved');
    });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Create a new recipe</div>
      </div>
      <div className={styles.container}>
        <Formik onSubmit={submit} initialValues={initialValues} validationSchema={validationSchema}>
          {({ isSubmitting, resetForm, values }) => (
            <Form className={styles.col}>
              <div className={styles.row}>
                <TextInput
                  name="title"
                  type="text"
                  label="Title"
                  placeholder="e.g. Pizza dough"
                  superClass={styles.fullWidth}
                />
                <TextInput
                  name="description"
                  type="text"
                  label="Description"
                  placeholder="Write a short description for the recipe"
                  superClass={styles.fullWidth}
                />
              </div>
              <div className={styles.row}>
                <TextInput
                  name="calories"
                  type="number"
                  label="Calories"
                  placeholder="e.g. 200"
                  superClass={styles.fullWidth}
                />
                <TextInput
                  name="portions"
                  type="number"
                  label="Portions"
                  placeholder="e.g. 10"
                  superClass={styles.fullWidth}
                />
              </div>
              <div className={styles.row}>
                <TextInput
                  name="cookingTime"
                  type="text"
                  label="Cooking time"
                  placeholder="e.g. 30 minutes active / 2 hours inactive"
                  superClass={styles.fullWidth}
                />
                <DifficultySelect />
              </div>

              <IngredientEquipment values={values} />
              <InstructionsInput values={values} />
              <ImageInput values={values} />
              <TagCategoryRow />
              <TextInput
                name="notes"
                type="text"
                label="Notes"
                placeholder="Add extra info in here"
                superClass={styles.fullWidth}
              />
              {isSubmitting ? (
                <p>Sending</p>
              ) : (
                <div className={styles.row} style={{ justifyContent: 'space-between' }}>
                  <Button
                    type="button"
                    label="Cancel"
                    secondary
                    onClick={resetForm}
                    style={{ marginTop: '16px', width: '128px' }}
                  />
                  <Button type="submit" label="Save" primary filled style={{ marginTop: '16px', width: '128px' }} />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

const EditRecipe = ({ recipe }) => {
  const [modifyRecipe] = useMutation(MODIFY_RECIPE);
  const { loading: catLoading, error: catError, data: categories } = useQuery(GET_CATEGORIES);
  const { loading: tagLoading, error: tagError, data: tags } = useQuery(GET_TAGS);
  return (
    <div className={styles.header}>
      <div className={styles.title}>Modify {recipe.name}</div>
    </div>
  );
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required field'),
  description: Yup.string().required('Required field'),
  equipment: Yup.array().required('Required field'),
  ingredients: Yup.array().required('Required field'),
  images: Yup.array().required('Required field'),
  calories: Yup.number().required('Required field'),
  cookingTime: Yup.string().required('Required field'),
  difficulty: Yup.string().required('Required field'),
  notes: Yup.string().required('Required field'),
  tags: Yup.array(),
  categories: Yup.array(),
});

EditRecipe.propTypes = {
  recipe: PropTypes.object,
};

export default AddEditRecipePage;
