import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid } from 'semantic-ui-react';
import RestaurantCard from '../components/RestaurantCard';
import { openModal } from '../redux/actions/modalActions';
import { getProducts } from '../services/getProducts';

const Drinks = () => {
  const dispatch = useDispatch();
  const newAddPost = useSelector((state) => state.restaurants.posts);
  const newEditPost = useSelector((state) => state.restaurants.newpost);
  const [drinksData, setDrinksData] = useState([]);
  useEffect(() => {
    getProducts().then((res) => setDrinksData(res.filter((data) => data.category === 'drinks')));
  }, []);

  // useEffect(() => {
  //   if (newAddPost.category === 'drinks') {
  //     setDrinksData((prev) => [...prev, newAddPost]);
  //   }
  // }, [dispatch, newAddPost]);

  useEffect(() => {
    if (newAddPost.name) {
      setDrinksData((prev) => [...prev, newAddPost]);
      return;
    } else if (newEditPost.category === 'drinks') {
      let dataMap = drinksData.map((post) => {
        if (post._id === newEditPost._id) {//
          return newEditPost;
        } else {
          return post;
        }
      });

      setDrinksData(dataMap);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAddPost, newEditPost, dispatch]);

  return (
    <Container style={{ minHeight: '80vh', padding: '10rem' }}>
      <Grid>
        <h1>Drinks</h1>
        <Button
          color="teal"
          style={{ marginLeft: 'auto' }}
          onClick={() => dispatch(openModal({ modalType: 'FormModal' }))}
        >
          Create Restaurant
        </Button>
      </Grid>

      <div style={{ marginTop: '5rem' }}>
        {drinksData.length > 0 &&
          drinksData.map((dataItem, ind) => <RestaurantCard data={dataItem} key={ind} />)}
      </div>
    </Container>
  );
};

export default Drinks;
