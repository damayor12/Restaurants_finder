import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Grid, Icon, Image, Label, Modal } from 'semantic-ui-react';
import ModalWrapper from '../utils/modalWrapper';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

import upload from '../services/uploadToCloudinary';
import axios from 'axios';
import { clearPost, createPost, editPost } from '../redux/actions/restaurantActions';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/actions/modalActions';

const categories = [
  { key: 0, value: '' },
  { key: 1, value: 'food' },
  { key: 2, value: 'drinks' },
  { key: 3, value: 'both' },
];

const hoursToMinutesConverter = (hours) => {
  const arrSplit = hours.split(':');
  return +arrSplit[0] * 60 + +arrSplit[1];
};

const convertMinsToHrsMins = (minutes) => {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return h + ':' + m;
};

const FormModal = ({ modalProps }) => {
  const dispatch = useDispatch();

  const [tagList, setTagList] = useState([]);
  const [bool, setBool] = useState(false);
  const [error, setError] = useState(false);
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [csvName, setCsvName] = useState('');

  const [loading, setLoading] = useState(false);
  let defaultValues;
  if (modalProps) {
    defaultValues = {
      name: modalProps.name,
      address: modalProps.address,
      category: modalProps.category,
      opening_time: convertMinsToHrsMins(modalProps.opening_time),
      closing_time: convertMinsToHrsMins(modalProps.closing_time),
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

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setParsedCsvData(results.data);
      },
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      setCsvName(acceptedFiles[0].name);
      parseFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });

  const onSubmit = async (passed_data) => {
    setLoading(true);

    let profilePicUrl;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (modalProps) {
        if (!passed_data.image) {
          profilePicUrl = await upload(passed_data.image[0]);
        }

        const { data } = await axios.put(
          `api/restaurants/${modalProps._id}`,
          JSON.stringify({
            ...passed_data,
            closing_time: hoursToMinutesConverter(passed_data.closing_time),
            opening_time: hoursToMinutesConverter(passed_data.opening_time),
            writer: JSON.parse(localStorage.getItem('userInfo'))._id,
            csv: null,
            minimumOrder: Number(passed_data.minimumOrder),
            image: profilePicUrl || modalProps.image,
          }),
          config,
        );

        if (data) {
          dispatch(clearPost());
          dispatch(editPost(data));
        }
      } else {
        if (tagList.length < 2) {
          setError(true);

          setTimeout(() => {
            setError(false);
          }, 3000);
          setLoading(false);
          return;
        }

        profilePicUrl = await upload(passed_data.image[0]);

        const { data } = await axios.post(
          `api/restaurants`,

          JSON.stringify({
            restaurantObj: {
              ...passed_data,
              closing_time: hoursToMinutesConverter(passed_data.closing_time),
              opening_time: hoursToMinutesConverter(passed_data.opening_time),
              tags: tagList.slice(0, 3),
              writer: JSON.parse(localStorage.getItem('userInfo'))._id,
              csv: null,
              minimumOrder: Number(passed_data.minimumOrder),
              image: profilePicUrl,
            },
            productsObj: {
              parsedCsvData,
              writer: JSON.parse(localStorage.getItem('userInfo'))._id,
            },
          }),
          config,
        );

        if (data) dispatch(createPost(data));
      }

      reset();
      setLoading(false);

      toast.success('sucessfully created');
      dispatch(closeModal());
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {}, [tagList, bool]);

  const keypressHandler = (e) => {
    if (e.code === 'Space') {
      if (e.target.value.split(',').length < 3) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else {
        setTagList(e.target.value.split(','));
      }
    }
  };

  return (
    <ModalWrapper header={modalProps ? 'Edit the restaurant' : 'Create a restaurant'}>
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
                {categories.map((item, ind) => (
                  <>
                    {ind === 0 ? (
                      <option key={ind} value="" hidden>
                        Choose Category
                      </option>
                    ) : (
                      <option key={ind} value={item.value}>
                        {item.value}
                      </option>
                    )}
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
                onKeyPress={(e) => {
                  keypressHandler(e);
                }}
              />
              <p style={{ color: 'red' }}>{errors.tags && 'Enter tags seperated by a comma'}</p>
            </Form.Field>
            {error && <div style={{ color: 'red' }}>At least 3 tags seperated by commas</div>}
            <div style={{ display: 'flex' }}>
              {tagList &&
                tagList.map((tagItem, ind) => (
                  <h3
                    key={ind}
                    style={{
                      fontSize: '.7rem',
                      background: 'hsl(122, 54%, 63%)',
                      height: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '.05rem .5rem',
                      color: 'white',
                      margin: '0 .2rem',
                    }}
                  >
                    {tagItem}
                  </h3>
                ))}
            </div>

            <Form.Field>
              <h3>Your Drinks or Foods</h3>
              <div
                {...getRootProps({
                  className: `dropzone 
          ${isDragAccept && 'dropzoneAccept'} 
          ${isDragReject && 'dropzoneReject'}`,
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop your spreadsheet file here ...</p>
                ) : (
                  <p>Drag 'n' drop your spreadsheet here, or click to select files</p>
                )}
              </div>
            </Form.Field>
            {csvName.length > 0 && (
              <p style={{ background: 'gainsboro', display: 'inline-block', color: 'green' }}>
                {' '}
                <Icon name="file"></Icon>
                {csvName}
              </p>
            )}

            <Button primary type="submit" loading={loading} style={{ display: 'block' }}>
              Submit <Icon name="chevron right" />
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </ModalWrapper>
  );
};

export default FormModal;
