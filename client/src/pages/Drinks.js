import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid } from 'semantic-ui-react';
import RestaurantCard from '../components/RestaurantCard';
import Search from '../components/Search';
import { openModal } from '../redux/actions/modalActions';
import { setFavoritesCount } from '../redux/actions/restaurantActions';
import { getProducts } from '../services/getProducts';

const Drinks = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState('');
  const [openNowCheckBox, setOpenNowCheckBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rating, setRating] = useState(5);
  const [geoFilterCoords, setGeoFilter] = useState('');
  const dispatch = useDispatch();
  const newAddPost = useSelector((state) => state.restaurants.posts);
  const newEditPost = useSelector((state) => state.restaurants.newpost);

  // useEffect(() => {
  //   getProducts().then((res) => setDrinksData(res.filter((data) => data.category === 'drinks')));

  //   dispatch(setFavoritesCount());
  // }, []);

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
        let newdata = res.filter((data) => data.category === 'drinks');

        return setDrinksData(newdata);
      });
    } else {
      getProducts().then((res) => {
        let newdata = res.filter((data) => data.category === 'drinks');

        return setDrinksData(newdata);
      });
    }

    dispatch(setFavoritesCount());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, checkboxValue, openNowCheckBox, rating, searchTerm]);

  useEffect(() => {
    if (newAddPost.name && newAddPost.category === 'drinks') {
      setDrinksData((prev) => [...prev, newAddPost]);
      return;
    } else if (newEditPost.name && newEditPost.category === 'drinks') {
      let newdata = drinksData.map((post) => {
        if (post._id === newEditPost._id) {
          //
          return newEditPost;
        } else {
          return post;
        }
      });

      setDrinksData(newdata);
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
          <h1>Drinks Home</h1>
          <Button
            style={{ marginLeft: 'auto', background: 'hsl(256, 69%, 39%)', color: 'white' }}
            onClick={() => dispatch(openModal({ modalType: 'FormModal' }))}
          >
            Create Restaurant
          </Button>
        </Grid>
        {drinksData.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            {drinksData.map((dataItem, ind) => (
              <RestaurantCard data={dataItem} key={ind} setData={setDrinksData} />
            ))}
          </div>
        )}

        {drinksData.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10rem',
              color: 'grey',
            }}
          >
            <h2>No Restaurants found :/</h2>
          </div>
        )}
      </Container>
    </>
  );
};

export default Drinks;
