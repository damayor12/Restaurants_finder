import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
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
  Icon,
  SegmentGroup,
} from 'semantic-ui-react';
import { logoutUser } from '../redux/actions/userActions';
import Notification from './Notification';
import Rating from './Rating';
import { toast } from 'react-toastify';
import { removeFromCart } from '../redux/actions/cartActions';

const Header = ({ history }) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const [show, setShow] = useState(true);

  const { loginSuccess } = user;

  const dispatch = useDispatch();

  const handleClick = () => {

    setShow((prev) => !prev);
  };

  const count = cart.reduce(function (acc, obj) {
    return acc + Number(obj.quantity);
  }, 0);

  return (
    <Container>
      <Grid className="header" style={{ zIndex: '-500', padding: '0 5rem' }}>
        <div className="header_first" style={{ marginBottom: 20, width: '100%' }}>
          <div style={{ cursor: 'pointer' }}>
            <Link to={'/'} style={{ marginRight: 'auto', color: 'white' }}>
              <h1>Best Restaurants</h1>
            </Link>
          </div>
          {/* <div
            className="ui toggle checkbox"
            style={{ float: 'right', marginRight: '3rem', marginLeft: 'auto' }}
          >
            <input type="checkbox" />
            <label className="label">Toggle</label>
          </div> */}
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <Icon
              name="cart"
              style={{ color: 'white', marginRight: '2rem', cursor: 'pointer' }}
              // onMouseEnter={handleBoxToggle}
              // onMouseLeave={handleBoxLeave}
              onClick={handleClick}
            />
            {count > 0 && <div
              className="dot"
              style={{ position: 'absolute', marginLeft: '.7rem', fontSize: '0.8rem' }}
            >
              {cart.reduce(function (acc, obj) {
                return acc + Number(obj.quantity);
              }, 0)}
            </div>}
          </div>

          {loginSuccess ? (
            <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
          ) : (
            <Button as={NavLink} to="/login">
              Sign In
            </Button>
          )}
        </div>
      </Grid>
      <SegmentGroup
        className={show ? 'hidebox' : 'showbox'}
        style={{
          width: '20vw',
          right: '20vw',
          top: '6rem',
          position: 'absolute',
          border: '2px solid gainsboro',
          minHeight: '10rem',
          zIndex: 1000,
          background: 'white',
        }}
      >
        <div style={{ display: 'flex', padding: '1rem' }}>
          {cart.length < 1 ? (
            <h4>Your cart is empty</h4>
          ) : (
            <h4>
              Your (
              {cart.reduce(function (acc, obj) {
                return acc + Number(obj.quantity);
              }, 0)}
              ) Cart Items{' '}
            </h4>
          )}
        </div>

        {cart.map((item, ind) => (
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Image src={item.image} rounded />
                </Grid.Column>

                <Grid.Column width={4}>{item.name}</Grid.Column>

                <Grid.Column width={3}>
                  {Number(item.quantity) > 1 ? `${item.quantity} items` : `${item.quantity} item`}
                </Grid.Column>

                <Grid.Column width={3}>${item.price}</Grid.Column>

                <Grid.Column width={2}>
                  <Icon
                    style={{ cursor: 'pointer' }}
                    name="trash"
                    onClick={() => dispatch(removeFromCart(item.productID))}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ))}
        <Segment style={{}}>
          <strong>
            Total: $
            {cart.reduce(function (acc, obj) {
              return acc + Number(obj.quantity) * obj.price;
            }, 0)}
          </strong>
        </Segment>
      </SegmentGroup>
    </Container>
  );
};

export default Header;
