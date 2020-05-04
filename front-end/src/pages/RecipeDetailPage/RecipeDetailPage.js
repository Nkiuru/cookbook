import React from 'react';
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

const RecipeDetailPage = () => {
  const location = useLocation();
  const recipe = location.state.recipe;

  const addReview = () => {};
  const openUser = () => {};
  const createdAt = date => {
    return moment(date).fromNow();
  };
  return (
    <PageContainer>
      <Toolbar />
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Recipe detail page</h1>
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
          <Button style={{ width: '148px' }} label={'+ Write review'} onClick={addReview} secondary />
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
            <div className={styles.reviewContent}>{review.content}</div>
            <Divider />
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default RecipeDetailPage;
