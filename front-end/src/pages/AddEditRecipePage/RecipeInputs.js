import PropTypes from 'prop-types';
import styles from './AddEditRecipePage.module.scss';
import { Field, FieldArray, Form } from 'formik';
import TextInput from '../../components/TextInput';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES } from '../../utils/queries/categories';
import { GET_TAGS } from '../../utils/queries/tags';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, SimpleFileUpload, Switch } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

export const DifficultySelect = () => {
  return (
    <div style={{ flex: 1, marginLeft: '8px', alignSelf: 'end' }}>
      <InputLabel htmlFor="diff">Difficulty</InputLabel>
      <Field component={Select} name="difficulty" inputProps={{ id: 'diff' }} style={{ width: '100%' }}>
        <MenuItem key={0} value={'BEGINNER'}>
          Beginner
        </MenuItem>
        <MenuItem key={1} value={'NOVICE'}>
          Novice
        </MenuItem>
        <MenuItem key={2} value={'INTERMEDIATE'}>
          Intermediate
        </MenuItem>
        <MenuItem key={3} value={'EXPERIENCED'}>
          Experienced
        </MenuItem>
        <MenuItem key={4} value={'ADVANCED'}>
          Advanced
        </MenuItem>
      </Field>
    </div>
  );
};

export const IngredientEquipment = ({ values }) => {
  return (
    <div className={styles.card}>
      <FieldArray
        name="ingredients"
        render={arrayHelpers => (
          <div className={styles.content}>
            <div className={styles.head}>
              <div className={styles.subTitle}>Ingredients</div>
              <Tooltip title="Add Ingredient">
                <IconButton onClick={() => arrayHelpers.push({ amount: '', ingredient: '' })} className={styles.addBtn}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
            {values.ingredients.map((i, index) => (
              <div key={index} className={styles.cardRow}>
                <TextInput
                  name={`ingredients.${index}.amount`}
                  type="text"
                  placeholder="e.g. 200mL"
                  label="Amount"
                  superClass={styles.fullWidth}
                />
                <TextInput
                  name={`ingredients.${index}.ingredient`}
                  type="text"
                  placeholder="e.g. Milk"
                  label="Ingredient"
                  superClass={styles.fullWidth}
                />
                <IconButton onClick={() => arrayHelpers.remove(index)}>
                  <RemoveIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      />
      <Divider orientation="vertical" flexItem />
      <FieldArray
        name="equipment"
        render={helper => (
          <div className={styles.content}>
            <div className={styles.head}>
              <div className={styles.subTitle}>Equipment</div>
              <Tooltip title="Add Equipment">
                <IconButton onClick={() => helper.push({ amount: '', name: '' })} className={styles.addBtn}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
            {values.equipment.map((i, index) => (
              <div key={index} className={styles.cardRow}>
                <TextInput
                  name={`equipment.${index}.amount`}
                  type="text"
                  placeholder="e.g. 2"
                  label="Amount"
                  superClass={styles.fullWidth}
                />
                <TextInput
                  name={`equipment.${index}.name`}
                  type="text"
                  placeholder="e.g. Large bowls"
                  label="Ingredient"
                  superClass={styles.fullWidth}
                />
                <IconButton onClick={() => helper.remove(index)}>
                  <RemoveIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export const TagCategoryRow = () => {
  const { loading: catLoading, error: catError, data: categories } = useQuery(GET_CATEGORIES);
  const { loading: tagLoading, error: tagError, data: tags } = useQuery(GET_TAGS);
  return (
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
        <Field component={Select} name="categories" multiple inputProps={{ id: 'label' }} style={{ width: '100%' }}>
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
  );
};

export const InstructionsInput = ({ values }) => {
  const getImage = file => {
    console.log(file);
    return URL.createObjectURL(file);
  };
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.subTitle}>Instructions</div>
      </div>
      <FieldArray
        name="instructions"
        render={arrayHelpers => (
          <div>
            {values.instructions.map((i, index) => (
              <div key={index}>
                <div className={styles.cardRow}>
                  <TextInput
                    name={`instructions.${index}.step`}
                    type="number"
                    placeholder="1"
                    label="Step number"
                    superClass={styles.fullWidth}
                  />
                  <TextInput
                    name={`instructions.${index}.text`}
                    type="text"
                    placeholder="e.g. Whisk eggs"
                    label="Instructions"
                    superClass={styles.fullWidth}
                  />
                  <Field component={SimpleFileUpload} name={`instructions.${index}.image`} label="Image for the step" />
                  <IconButton onClick={() => arrayHelpers.remove(index)}>
                    <RemoveIcon />
                  </IconButton>
                </div>
                <div className={styles.imgContainer}>
                  {i.image && <img className={styles.img} src={getImage(i.image)} alt="uploaded image" />}
                </div>
              </div>
            ))}
            <IconButton
              onClick={() => arrayHelpers.push({ step: values.instructions.length + 1, text: '', image: null })}
              className={styles.addBtn}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
      />
    </div>
  );
};

export const ImageInput = ({ values }) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.subTitle}>Photos</div>
      </div>
      <FieldArray
        name="images"
        render={arrayHelpers => (
          <div>
            {values.images.map((i, index) => (
              <div key={index} className={styles.cardRow}>
                <TextInput
                  name={`images.${index}.altText`}
                  type="text"
                  placeholder="Photo caption"
                  label="Caption"
                  superClass={styles.fullWidth}
                />
                <FormControlLabel
                  control={<Field component={Switch} name="switch" type="checkbox" />}
                  label="Cover image"
                />
                <Field component={SimpleFileUpload} name={`images.${index}.file`} label="Image of the dish" />
                <IconButton onClick={() => arrayHelpers.remove(index)}>
                  <RemoveIcon />
                </IconButton>
              </div>
            ))}
            <IconButton
              onClick={() => arrayHelpers.push({ primary: false, altText: '', file: null })}
              className={styles.addBtn}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
      />
    </div>
  );
};

IngredientEquipment.propTypes = {
  values: PropTypes.object,
};

InstructionsInput.propTypes = {
  values: PropTypes.object,
};

ImageInput.propTypes = {
  values: PropTypes.object,
};
