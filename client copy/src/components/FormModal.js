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
import { closeModal } from '../redux/actions/modalActions';

const categories = [
  { key: 1, value: 'foods' },
  { key: 2, value: 'drinks' },
  { key: 3, value: 'both' },
];

const FormModal = ({ modalProps }) => {
  console.log('yes', 'no', modalProps);
  // let modalProps = undefined
  const dispatch = useDispatch();
  // console.log('fresh data', props)
  const [tagList, setTagList] = useState([]);
  const [bool, setBool] = useState(false);
  const [loading, setLoading] = useState(false);
  let defaultValues;
  if (modalProps) {
    defaultValues = {
      name: modalProps.name,
      address: modalProps.address,
      category: modalProps.category,
      opening_time: moment(modalProps.opening_time).format('hh:mm'),
      closing_time: moment(modalProps.closing_time).format('hh:mm'),
      tags: modalProps.tags.join(','),
      image: '',
      csv: null,
      minimumOrder: modalProps.minimumOrder,
    };
  } else {
    defaultValues = {
      name: '',
      address: '',
      category: '',
      opening_time: '0:00',
      closing_time: '0:00',
      tags: '',
      image: '',
      csv: null,
      minimumOrder: 0,
    };
  }

  moment().format('hh:mm');
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });

  const onSubmit = async (passed_data) => {
    console.log('passed', passed_data);
    setLoading(true);

    let profilePicUrl;
    try {
      // console.log('picURL', profilePicUrl)

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
console.log('PaASSED DATA', passed_data.image)
      if (modalProps) {
        if (!passed_data.image) {
          profilePicUrl = await upload(passed_data.image[0]);
        }
        console.log('MODALPROPS', modalProps);
        const { data } = await axios.put(
          `api/restaurants/${modalProps._id}`,
          JSON.stringify({
            ...passed_data,
            closing_time: moment(passed_data.closing_time, 'hh:mm'),
            opening_time: moment(passed_data.opening_time, 'hh:mm'),
            tags: passed_data.tags,
            writer: JSON.parse(localStorage.getItem('userInfo'))._id,
            csv: null,
            minimumOrder: Number(passed_data.minimumOrder),
            image: profilePicUrl || modalProps.image,
          }),
          config,
        );
        console.log('DATA', data);
        if (data) {
          dispatch(clearPost());
          dispatch(editPost(data));
        }
      } else {
        profilePicUrl = await upload(passed_data.image[0]);
        const { data } = await axios.post(
          `api/restaurants`,
          JSON.stringify({
            ...passed_data,
            closing_time: moment(passed_data.closing_time, 'hh:mm'),
            opening_time: moment(passed_data.opening_time, 'hh:mm'),
            tags: passed_data.tags.split(','),
            writer: JSON.parse(localStorage.getItem('userInfo'))._id,
            csv: null,
            minimumOrder: Number(passed_data.minimumOrder),
            image: profilePicUrl,
          }),
          config,
        );

        if (data) dispatch(createPost(data));
      }

      if (modalProps) {
        console.log('edit fired');
      } else {
      }

      reset();
      setLoading(false);
      dispatch(closeModal());
    } catch (error) {
      console.log('toast error', error);
      toast.error(error.message);
    }
  };

  // useEffect(() => {}, [tagList, bool]);

  const keypressHandler = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.length > 0) {
        if (/[a-zA-Z]+/.test(e.target.value) && !bool) {
          console.log('no', bool);
          setTagList([...tagList, e.target.value]);

          setBool(true);
        } else if (/[a-zA-Z]+,[a-zA-Z]+,[a-zA-Z]+/gi.test(e.target.value) && bool) {
          setTagList([...tagList, e.target.value]);
        }
      }
    }
    // errors.tags = 'Enter tags with one comma';
  };

  return (
    <ModalWrapper header="Create a restaurant">
      <Modal.Content image scrolling>
        <Modal.Description>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Field>
              <h3>First Name</h3>
              <input
                type="text"
                name="name"
                placeholder="Restaurant name?"
                ref={register({ required: true })}
              />
              <p style={{ color: 'red' }}>{errors.name && 'Name is required.'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Address</h3>
              <input
                type="text"
                name="address"
                placeholder="Restaurant address - Street, PO Box , Country?"
                ref={register({ required: true })}
              />
              <p style={{ color: 'red' }}>{errors.address && 'Address is required.'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Minimum order</h3>
              <input
                type="number"
                name="minimumOrder"
                placeholder="minimum order?"
                ref={register({ required: true })}
              />
              <p style={{ color: 'red' }}>
                {errors.minimumOrder && 'Order as a number is required.'}
              </p>
            </Form.Field>

            <Form.Field>
              <h3>Images</h3>
              <input type="file" name="image" placeholder="Enter csv file" ref={register({})} />
              <p style={{ color: 'red' }}>{errors.image && 'Images'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Category</h3>
              <select name="category" ref={register({ required: true })}>
                {categories.map((item) => (
                  <>
                    <option key={'0'} value="" hidden>
                      Choose Category
                    </option>
                    <option key={item.key} value={item.value}>
                      {item.value}
                    </option>
                  </>
                ))}
              </select>
              <p style={{ color: 'red' }}>{errors.category && 'Address is required.'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Opening Time</h3>
              <input
                type="time"
                name="opening_time"
                placeholder="Opening Time?"
                ref={register({ required: true })}
              />
              <p style={{ color: 'red' }}>{errors.opening_time && ' OpeningTime is required.'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Closing Time</h3>
              <input
                type="time"
                name="closing_time"
                placeholder="Opening Time?"
                ref={register({ required: true })}
              />
              <p style={{ color: 'red' }}>{errors.closing_time && 'Time is required.'}</p>
            </Form.Field>

            <Form.Field>
              <h3>Tags</h3>
              <input
                type="text"
                name="tags"
                placeholder="Enter tag, click enter"
                ref={register({
                  required: true,
                })}
                onKeyPress={keypressHandler}
              />
              <p style={{ color: 'red' }}>{errors.tags && 'Enter tags with one comma'}</p>
            </Form.Field>
            <div>
              {tagList.map((tagItem, ind) => (
                <div key={ind}>{tagItem}</div>
              ))}
            </div>

            <Form.Field>
              <h3>File</h3>
              <input
                type="file"
                name="csv"
                placeholder="Enter csv file"
                ref={register({
                  required: false,
                })}
              />
              <p style={{ color: 'red' }}>{errors.csv && 'Upload csv file'}</p>
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

export default FormModal;
