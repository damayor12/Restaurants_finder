import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, GridRow } from 'semantic-ui-react';
import RestaurantCard from '../components/RestaurantCard';
import { openModal } from '../redux/actions/modalActions';
import { getProducts } from '../services/getProducts';

const RestaurantsHome = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const newAddPost = useSelector((state) => state.restaurants.posts);
  const newEditPost = useSelector((state) => state.restaurants.newpost);

  // useEffect(() => {
  //   if (newPost) {
  //     setData((prev) => [...prev, newPost]);
  //   }
  // }, [newPost]);

  useEffect(() => {
    getProducts().then((res) => {
      console.log('the response', res);
      let newdata = res.filter((data) => data.category !== 'drinks');
      return setData(newdata);
    });
  }, []);

  useEffect(() => {
    if (newAddPost.name) {//
      setData((prev) => [...prev, newAddPost]);
      return;
    } else if (newEditPost.name && newEditPost.category !== 'drinks') {
      let ndata = data.map((post) => {
        if (post._id === newEditPost._id) {
          return newEditPost;
        } else {
          return post;
        }
      });
      // .filter((data) => data.category !== 'drinks');

      setData(ndata);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAddPost, newEditPost, dispatch]);

  console.log('data', data);

  return (
    <Container style={{ minHeight: '80vh', padding: '10rem' }}>
      <Grid>
        <h1>RestaurantsHome</h1>
        <Button
          color="teal"
          style={{ marginLeft: 'auto' }}
          onClick={() => dispatch(openModal({ modalType: 'FormModal' }))}
        >
          Create Restaurant
        </Button>
      </Grid>

      <div style={{ marginTop: '5rem' }}>
        {data.length > 0 &&
          data.map((dataItem, ind) => <RestaurantCard data={dataItem} key={ind} />)}
      </div>
    </Container>
  );
};

export default RestaurantsHome;
