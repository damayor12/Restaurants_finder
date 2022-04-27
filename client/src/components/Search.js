import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Container,
  Radio,
  Grid,
  Image,
  Input,
  Menu,
  Checkbox,
  Segment,
  GridRow,
} from 'semantic-ui-react';
import { DebounceInput } from 'react-debounce-input';
import Notification from './Notification';
import Rating from './Rating';
import { toast } from 'react-toastify';

const Search = ({
  setGeoFilter,
  setCheckboxValue,
  setOpenNowCheckBox,
  setSearchTerm,
  openNowCheckBox,
  setRating,
  rating,
}) => {
  const favState = useSelector((state) => state.restaurants.favoriteList);
  const count = favState.favoriteCount;

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filterRadioBool, setFilterRadioBool] = useState(true);
  // [1,2,3,4,5]

  const getLocation = async () => {
    setLoading(true);

    const getCoords = async () => {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
      };
    };

    const coords = await getCoords();
    setGeoFilter(coords);
    setFilterRadioBool(false);
    setLoading(false);
  };

  const handleChange = (e) => {
    setCheckboxValue(e.target.value);
  };

  const handleCheckBoxChange = (e) => {
    setOpenNowCheckBox((prev) => !prev);
  };

  return (
    <>
      <Container
        style={{
          backgroundColor: 'white !important',
          // zIndex: -1000,
          // position: 'relative'
          // width: '80vw',
          position: 'absolute',
          top: '8rem',
          // display: 'flex',
          // alignItems: 'center',
          // margin: '0 auto',
          // marginBottom: '2rem',
        }}
      >
        <Grid
          columns={3}
          divided
          color="white"
          style={{
            background: 'white !important',
            zIndex: '2000',
            // width: '80vw',
            // position: 'absolute',
            // top: '7rem',
            // display: 'flex',
            // alignItems: 'center',
            // margin: '0 auto',
            // marginBottom: '2rem',
          }}
        >
          <Grid.Row style={{ border: '2px gainsboro solid', background: 'white' }}>
            <Grid.Column>
              <DebounceInput
                style={{
                  height: '100%',
                  width: '100%',
                  paddingLeft: '1rem',
                  borderRadius: '5px',
                  border: '2px gainsboro solid',
                }}
                placeholder="Search by tags or name"
                type="text"
                minLength={2}
                debounceTimeout={300}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
            >
              <Button onClick={getLocation} loading={loading}>
                Distance
              </Button>
              <div
                style={{ display: 'flex', alignItems: 'center' }}
                disabled={filterRadioBool}
                onChange={handleChange}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '.5rem' }}>
                  <input
                    style={{ cursor: 'pointer' }}
                    type="radio"
                    value="6000"
                    name="gender"
                    disabled={filterRadioBool}
                    // checked={true}
                  />{' '}
                  <p style={{ marginLeft: '.5rem' }}>{'any'}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '.5rem' }}>
                  <input
                    style={{ cursor: 'pointer' }}
                    type="radio"
                    value="50"
                    name="gender"
                    disabled={filterRadioBool}
                  />{' '}
                  <p style={{ marginLeft: '.5rem' }}>{'<50km'}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    style={{ cursor: 'pointer' }}
                    type="radio"
                    value="100"
                    name="gender"
                    disabled={filterRadioBool}
                  />{' '}
                  <p style={{ marginLeft: '.5rem' }}>{'<100km'}</p>
                </div>
              </div>
              {/*<div>
              <Input type="radio" value="20km" name="gender" /> Male
              <Input type="radio" value="20km" name="gender" /> Female
              <Input type="radio" value="20km" name="gender" /> Other
            </div>

            <Radio onChange={(e, data) => setKilometer20(data.value)} value="20km" />
            <Radio label={<p style={{ color: 'black', marginRight: '.5rem' }}>30km</p>} />
            <Radio />
            <Radio label={<p style={{ color: 'black', marginRight: '.5rem' }}>70km</p>} />
            <Radio /> */}

              {/* 
            <Radio
              style={{ marginRight: '.5rem' }}
              label={<p style={{ color: 'black', marginRight: '.5rem' }}>70km or</p>}
            />

            <Radio />
            <Radio label={<p style={{ color: 'black', marginRight: '.5rem' }}>Free Delivery</p>} /> */}

              {/* <Checkbox>
              <p>50km</p>
            </Checkbox>
            <Checkbox />
            <p>50km</p>
            <Checkbox />
            <p>50km</p> */}
            </Grid.Column>
            <Grid.Column
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                // gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              <Button disabled>Rating</Button>
              <GridRow>
                <Rating rating={rating} setRating={setRating} />
              </GridRow>
              <p></p>

              <div>
                <Checkbox toggle onChange={handleCheckBoxChange} value={openNowCheckBox} />

                <Checkbox
                  label={
                    <p style={{ color: 'black', marginRight: '.5rem', marginLeft: '.5rem' }}>
                      Open Now
                    </p>
                  }
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Menu fluid widths={3} style={{ marginTop: '3rem' }} pointing>
          <Menu.Item name="Foods" as={NavLink} to="/" />
          <Menu.Item name="Drinks" as={NavLink} to="/drinks" />
          <Menu.Item name="Favorites" as={NavLink} to="/favorites">
            Favorites
            <Notification />
          </Menu.Item>
        </Menu>
      </Container>
    </>
  );
};

export default Search;
