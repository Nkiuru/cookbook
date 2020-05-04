import React from 'react';
import styles from './ProfilePage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { Form, Formik } from 'formik';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from '../../utils/mutations/user';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {
  const history = useHistory();
  const [updateUser] = useMutation(UPDATE_USER);
  const user = JSON.parse(localStorage.getItem('user'));
  const initialValues = {
    email: user.email,
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string(),
    password: Yup.string(),
  });
  const submit = ({ email, password }, { setSubmitting }) => {
    const variables = { variables: { email, password } };
    updateUser(variables).then(u => {
      localStorage.setItem('user', JSON.stringify(u));
      setSubmitting(false);
      window.alert('Saved');
    });
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <PageContainer>
      <Toolbar />
      <div className={styles.header}>
        <div style={{ width: '48px' }} />
        <div className={styles.title}>Profile</div>
        <Tooltip title={'Log out'}>
          <IconButton onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className={styles.column}>
        <Formik onSubmit={submit} initialValues={initialValues} validationSchema={validationSchema}>
          {({ isSubmitting, resetForm }) => (
            <Form>
              <TextInput name="email" type="email" label="Email" placeholder="jane.doe@email.fi" />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                style={{ marginTop: '16px' }}
              />
              {isSubmitting ? (
                <p>Sending</p>
              ) : (
                <div className={styles.row}>
                  <Button type="button" label="Cancel" secondary onClick={resetForm} style={{ marginTop: '16px' }} />
                  <Button type="submit" label="Save" primary filled style={{ marginTop: '16px' }} />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
