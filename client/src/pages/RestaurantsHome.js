import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, GridRow } from 'semantic-ui-react';
import RestaurantCard from '../components/RestaurantCard';
import { openModal } from '../redux/actions/modalActions';
import { getProducts } from '../services/getProducts';
import axios from 'axios';
import { setFavoritesCount } from '../redux/actions/restaurantActions';
import Search from '../components/Search';

const RestaurantsHome = () => {
  const [data, setData] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState('');
  const [openNowCheckBox, setOpenNowCheckBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rating, setRating] = useState(5);
  const [geoFilterCoords, setGeoFilter] = useState('');
  const dispatch = useDispatch();
  const newAddPost = useSelector((state) => state.restaurants.posts);
  const newEditPost = useSelector((state) => state.restaurants.newpost);

  // useEffect(() => {
  //   if (newPost) {
  //     setData((prev) => [...prev, newPost]);
  //   }
  // }, [newPost]);

  useEffect(() => {
    if (
      geoFilterCoords !== '' ||
      geoFilterCoords !== '' ||
      openNowCheckBox ||
      rating ||
      searchTerm
    ) {
      getProducts({
        ...geoFilterCoords,
        geoValue: checkboxValue,
        openNowCheckBox,
        rating,
        searchTerm,
      }).then((res) => {
        let newdata = res.filter((data) => data.category !== 'drinks');

        return setData(newdata);
      });
    } else {
      getProducts().then((res) => {
        let newdata = res.filter((data) => data.category !== 'drinks');

        return setData(newdata);
      });
    }

    dispatch(setFavoritesCount());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, checkboxValue, openNowCheckBox, rating, searchTerm]);

  useEffect(() => {
    if (newAddPost.name && newAddPost.category !== 'drinks') {
      //
      setData((prev) => [...prev, newAddPost]);
      return;
    } else if (newEditPost.name && newEditPost.category !== 'drinks') {
      let newdata = data.map((post) => {
        if (post._id === newEditPost._id) {
          return newEditPost;
        } else {
          return post;
        }
      });
      // .filter((data) => data.category !== 'drinks');

      setData(newdata);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAddPost, newEditPost, dispatch]);

  return (
    <>
      <Container>
        <Container>
          <Search
            setGeoFilter={setGeoFilter}
            setCheckboxValue={setCheckboxValue}
            setOpenNowCheckBox={setOpenNowCheckBox}
            openNowCheckBox={openNowCheckBox}
            setRating={setRating}
            rating={rating}
            setSearchTerm={setSearchTerm}
          />
        </Container>

        <Grid style={{ marginTop: '10rem' }}>
          <h1>Available Restaurants</h1>
          <Button
            // style={{ color: 'hsl(256, 69%, 39%)' }}
            style={{ marginLeft: 'auto', background: 'hsl(256, 69%, 39%)', color: 'white' }}
            onClick={() => dispatch(openModal({ modalType: 'FormModal' }))}
          >
            Create Restaurant
          </Button>
        </Grid>

        {data.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            {data.map((dataItem, ind) => (
              <RestaurantCard data={dataItem} key={ind} setData={setData} />
            ))}
          </div>
        )}

        {data.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10rem', color: 'grey' }}>
            <h2>No Restaurants found :/</h2>
          </div>
        )}
      </Container>
    </>
  );
};

export default RestaurantsHome;
