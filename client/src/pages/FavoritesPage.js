import React, { useEffect, useState } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import { getFavorites, setFavoritesCount } from '../redux/actions/restaurantActions';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantCard from '../components/RestaurantCard';
import axios from 'axios';
import Search from '../components/Search';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();

  const [checkboxValue, setCheckboxValue] = useState('');
  const [openNowCheckBox, setOpenNowCheckBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rating, setRating] = useState(5);
  const [geoFilterCoords, setGeoFilter] = useState('');
  // const favoritesObj = useSelector((state) => state.restaurants.favoriteList);
  const fetchFavorites = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let payload = { _id: JSON.parse(localStorage.getItem('userInfo'))._id };

    try {
      const { data } = await axios.post(`/api/restaurants/favorites/all`, payload, config);

      if (data) {
        setFavorites(data.docs);
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(setFavoritesCount());
    fetchFavorites();
  }, [dispatch]);

  return (
    <>
      {
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
            <h1>Favorites</h1>
          </Grid>

          {favorites && (
            <div style={{ marginTop: '3rem' }}>
              {favorites.map((dataItem, ind) => (
                <RestaurantCard
                  data={dataItem.restaurantID}
                  key={ind}
                  setData={setFavorites}
                  favPageFlag={true}
                />
              ))}
            </div>
          )}
        </Container>
      }
    </>
  );
};

export default Favorites;
