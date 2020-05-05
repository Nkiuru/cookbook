import React, { useState } from 'react';
import styles from './RecipeDetailPage.module.scss';
import PageContainer from '../../containers/PageContainer';
import Toolbar from '../../components/Toolbar';
import { useLocation } from 'react-router';
import Instruction from '../../components/Instruction';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Button from '../../components/Button';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import RecipeDetailsCard from '../../components/RecipeDetailsCard';
import IngredientsCard from '../../components/IngredientsCard';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW, DELETE_REVIEW } from '../../utils/mutations/reviews';
import Dialog from '../../components/Dialog';
import { TextField as TextInput } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const RecipeDetailPage = () => {
  const location = useLocation();
  const history = useHistory();
  const recipe = location.state.recipe;
  const [showDialog, setShowDialog] = useState(false);
  const [review, setReview] = useState('');
  const [createReview] = useMutation(CREATE_REVIEW);
  //const [modifyReview] = useMutation(MODIFY_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCreateReview = () => {
    createReview({ variables: { recipe: recipe.id, content: review } })
      .then(e => {
        recipe.reviews.push(e.data.createReview);
        setShowDialog(false);
        window.alert('Created');
      })
      .catch(error => {
        window.alert(error);
      });
  };
  const handleDeleteReview = id => {
    deleteReview({ variables: { id } }).then(e => {
      recipe.reviews = recipe.reviews.filter(r => r.id !== id);
      console.log(recipe.reviews);
      setShowDialog(false);
      window.alert('Deleted');
    });
  };
  const openUser = () => {
    history.push({
      pathname: `/user/${recipe.author.id}`,
      state: { user: recipe.author },
    });
  };
  const createdAt = date => {
    return moment(date).fromNow();
  };
  return (
    <PageContainer>
      <Toolbar />
      <div className={styles.cardContainer}>
        <RecipeDetailsCard recipe={recipe} />
        <IngredientsCard ingredients={recipe.ingredients} equipment={recipe.equipment} />
      </div>
      <div className={styles.instructions}>
        <h2 className={styles.subtitle}>Instructions</h2>
        {recipe.instructions.map(ins => (
          <div key={ins.step}>
            <Instruction instruction={ins} />
          </div>
        ))}
      </div>
      <div className={styles.photos}>
        <h2 className={styles.subtitle}>Photos</h2>
        <Carousel className={styles.carousel}>
          {recipe.images.map(img => (
            <div key={img.file._id}>
              <img src={`http://localhost:3000/${img.file.path}`} alt={img.altText} />
              <p className="legend">{img.altText}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.reviews}>
        <div className={styles.header}>
          <div style={{ width: '148px' }} />
          <h2 className={styles.subtitle}>Reviews</h2>
          <Button style={{ width: '148px' }} label={'+ Write review'} onClick={() => setShowDialog(true)} secondary />
        </div>
        {recipe.reviews.map(review => (
          <div key={review.id} className={styles.review}>
            <div className={styles.row}>
              <IconButton onClick={openUser}>
                <AccountCircle />
              </IconButton>
              <div className={styles.acc}>
                <p>{review.user.fullName}</p>
                <div className={styles.time}>{createdAt(review.created)}</div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.reviewContent}>{review.content}</div>
              {review.user.id === user.id && (
                <Tooltip title={'Delete Recipe'}>
                  <IconButton
                    onClick={() => {
                      handleDeleteReview(review.id);
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    <DeleteForeverIcon color={'error'} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <Divider />
          </div>
        ))}
      </div>
      <Dialog
        header={'Add review'}
        visible={showDialog}
        onOutsideClick={() => setShowDialog(false)}
        positiveLabel={'Post'}
        negativeLabel={'Cancel'}
        onPositiveClicked={handleCreateReview}
        onNegativeClicked={() => setShowDialog(false)}
      >
        <div className={styles.container}>
          <TextInput
            type="text"
            placeholder="Write your review here"
            label="Review content"
            value={review}
            onChange={e => setReview(e.target.value)}
          />
        </div>
      </Dialog>
    </PageContainer>
  );
};

export default RecipeDetailPage;
