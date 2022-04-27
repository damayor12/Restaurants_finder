import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Grid, Icon, Image, Label, Modal } from 'semantic-ui-react';
import ModalWrapper from '../utils/modalWrapper';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { toast } from 'react-toastify';

import upload from '../services/uploadToCloudinary';
import axios from 'axios';
import { clearPost, createPost, editPost } from '../redux/actions/restaurantActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeModal } from '../redux/actions/modalActions';
import Rating from './Rating';
import RatingReview from './RatingReview';
import { createComment } from '../redux/actions/detailsActions';

const ReviewsModal = ({ modalProps, match }) => {
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [hover, setHover] = useState(0);
  // let id  = useParams();
  const dispatch = useDispatch();

  const [tagList, setTagList] = useState([]);
  const [bool, setBool] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    name: '',
    summary: '',
    body: '',
    nick: '',
  };

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });

 
 
  const onSubmit = (params) => {
    setLoading(true);
    
    if (rating === 0) {
      setRatingError(true);
      setLoading(false);
      return;
    }
    const payload = {
      customerName: params.nick,
      customerRating: rating,
      customerComment: params.summary,
      customerCommentBody: params.body,
      RestaurantId: modalProps,
      user: JSON.parse(localStorage.getItem('userInfo'))._id
    };

    dispatch(createComment(payload));
    reset();
    setLoading(false);
    
    toast.success('Review sent');
    dispatch(closeModal());
  };
  // dispatch(createComment(payload))
  //   "customerName": "nice guy",
  // "customerRating": 5,
  // "customerComment": "worstever",
  // "customerCommentBody": "cant understand why",
  const handleKeyDown = (e) => {
   

    // errors = {}
  };

  // const tagRegister = register('tags', { required: true });
  return (
    <ModalWrapper header="Create a Review">
      <Modal.Content image scrolling>
        <Modal.Description>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Field>
              <h3>Overall Rating</h3>
              <div style={{ display: 'flex' }}>
                <Rating
                  style={{ cursor: 'pointer' }}
                  rating={rating}
                  name="name"
                  setRating={setRating}
                  setRatingError={setRatingError}
                  setHover={setHover}
                />
                {rating >= 1 &&
                  (rating < 3 ? (
                    <div style={{ color: 'red' }}>Poor</div>
                  ) : rating === 3 ? (
                    <div style={{ color: 'green' }}>Fair</div>
                  ) : (
                    <div style={{ color: 'orange' }}>Good!</div>
                  ))}
              </div>
            </Form.Field>
            {ratingError && <p style={{ color: 'red' }}>{'Review is required.'}</p>}

            <Form.Field>
              <h3>Review Summary</h3>
              <input
                type="text"
                name="summary"
                placeholder="Summary of your experience"
                ref={register({ required: true })}
                onKeyDown={handleKeyDown}
              />
              <p style={{ color: 'red' }}>{errors.summary && 'Name is required.'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Review Body</h3>
              <input
                type="text"
                name="body"
                placeholder="Why do you like this Restaurant"
                ref={register({ required: true })}
              />
              <p style={{ color: 'red' }}>{errors.body && 'Name is required.'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Nickname</h3>
              <input
                type="text"
                name="nick"
                placeholder="Nickname"
                ref={register({ required: true })}
              />
              <p style={{ color: 'red' }}>{errors.nick && 'Address is required.'}</p>
            </Form.Field>

            <Button primary type="submit" loading={loading}>
              Submit <Icon name="chevron right" />
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button primary>
          Proceed <Icon name="chevron right" />
        </Button> */}
      </Modal.Actions>
    </ModalWrapper>
  );
};

export default ReviewsModal;
