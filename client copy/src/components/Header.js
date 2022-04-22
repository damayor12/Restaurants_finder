import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Container, Grid, Image, Input, Menu } from 'semantic-ui-react';
import { logoutUser } from '../redux/actions/userActions';

const Header = ({ history }) => {
  const user = useSelector((state) => state.user);
  const { loginSuccess } = user;

  const dispatch = useDispatch();
  return (
    <div className="header" style={{ zIndex: '50 !important', position: 'relative' }}>
      <div className="header_first" style={{ marginBottom: 20 }}>
        <h1 style={{ marginRight: 'auto' }}>Best Restaurants</h1>
        <div className="ui toggle checkbox" style={{ float: 'right', marginRight: '3rem' }}>
          <input type="checkbox" />
          <label className="label">Toggle</label>
        </div>
        {loginSuccess ? (
          <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
        ) : (
          <Button as={NavLink} to="/login">
            Sign In
          </Button>
        )}
      </div>
      <Grid columns={3} divided style={{ background: 'white', height: '5rem' }}>
        <Grid.Row style={{ border: '2px gainsboro solid' }}>
          <Grid.Column>
            <Input
              style={{ height: '100%', width: '100%' }}
              placeholder="Search by tags or name"
              type="text"
            />
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>

      <Menu fluid widths={3} style={{ marginTop: '3rem' }}>
        <Menu.Item
          name="Foods"
          as={NavLink}
          to="/"
        
        />
        <Menu.Item
          name="Drinks"
          as={NavLink}
          to="/drinks"
          
        />
        <Menu.Item
          name="Favorites"
          as={NavLink}
          to="/favorites"
          // activeStyle={({ isActive }) => ({
          //   color: isActive ? '#fff !important' : '#545e6f !important',
          //   background: isActive ? '#7600dc!important' : '#f0f0f0 !important',
          // })}
        >
          
          Favorites
          <span className="dot">1</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
