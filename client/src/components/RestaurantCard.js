import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import { openModal } from '../redux/actions/modalActions';
import {Link, NavLink} from 'react-router-dom'
import {
  addToFavorites,
  decreaseFavoritesCount,
  editPost,
  increaseFavoritesCount,
  removeFromFavorites,
} from '../redux/actions/restaurantActions';
import axios from 'axios';
import { hoursToMinutesConverter } from '../utils/timeConverter';
const RestaurantCard = ({ data, setData, favPageFlag }) => {
  // const favState = useSelector((state) => state.restaurants.favoriteList);
  // const favorites = favState.favorites;

  const dispatch = useDispatch();

  const toggleFavorite = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let payload = {
      _id: JSON.parse(localStorage.getItem('userInfo'))._id,
      restaurantID: data._id,
    };

    const newFavorites = await axios.post(`api/restaurants/favorites`, payload, config);
    if (newFavorites.status === 201) {
      if (newFavorites.data.added) {
        // setcolorBool(true);
        dispatch(increaseFavoritesCount());
        setData((prev) =>
          prev.map((prev_data) => {
            if (prev_data._id === data._id) {
              prev_data.isFavorited = true;
              return prev_data;
            } else {
              return prev_data;
            }
          }),
        );

        // data.isFavorited = true
      } else {
        dispatch(decreaseFavoritesCount());
        setData((prev) =>
          prev.map((prev_data) => {
            if (prev_data._id === data._id) {
              prev_data.isFavorited = false;
              return prev_data;
            } else {
              return prev_data;
            }
          }),
        );

        // setcolorBool(false);

        //  data.isFavorited = false
      }
    }
  };

  const [colorBool, setcolorBool] = useState(data.isFavorited);
  return (
    <Grid className="prod_card" style={{ marginBottom: '1rem' }}>
      <Grid.Column width={4} className="img_container">
        <Image
          src={data.image}
          // size= 'big'
          fluid
          style={{ height: '10rem'}}
        />
      </Grid.Column>
      <Grid.Column width={12} className="prod_con">
        <div className="prod_header">
          <NavLink style={{ marginRight: '.5rem', color:'black' }} to={`/restaurants/${data._id}`}>
            <h2>{data.name}</h2>
          </NavLink>
          <div style={{ height: '2rem' }}>
            {hoursToMinutesConverter() < data.closing_time ? (
              <div
                style={{
                  display: 'flex',
                  fontSize: '.7rem',
                  background: 'hsl(122, 54%, 63%)',
                  padding: '.05rem .5rem',
                }}
              >
                Open Now
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  fontSize: '.7rem',
                  background: 'pink',
                  padding: '.05rem .5rem',
                }}
              >
                Closed Now
              </div>
            )}
          </div>
          <Icon
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
            name="heart"
            color={data.isFavorited ? 'red' : 'black'}
            size="big"
            onClick={toggleFavorite}
          />
        </div>
        <div className="prod_tags" style={{ marginBottom: '1rem' }}>
          {data.tags && data.tags.join(', ')}
        </div>
        <div className="prod_details_row">
          <Icon name="star" color="orange" size="large" />
          <div style={{ fontSize: '1.5rem' }}>{data.rating}</div>
          <div>({data.totalReviews} reviews)</div>
          <div>Minimum delivery: $ {data.minimumOrder}</div>
          {favPageFlag ? (
            <div></div>
          ) : (
            <Button
              floated="right"
              style={{ marginLeft: 'auto' }}
              onClick={() => dispatch(openModal({ modalType: 'FormModal', modalProps: data }))}
            >
              Edit
            </Button>
          )}
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default RestaurantCard;
