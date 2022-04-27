import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser, logoutUser } from '../redux/actions/userActions';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, loginSuccess } = user;
  const [password, setPassword] = useState('');
  const [login, SetLogin] = useState('');
  const [email, setEmail] = useState('');



  const submitHandler =  (e) => {
    e.preventDefault();
    dispatch(loginUser({ password, email })).then(()=> {
      history.push('/');
      // window.location.reload();

    })
    
  };

  return (
    <div className="home_container">
      <div style={{ width: '500px' }}>
        <h1>Welcome!</h1>
        <Form size="big" onSubmit={submitHandler}>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="First Name"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>

          <Button type="submit" fluid size="large" color="violet" content="Login" />
        </Form>
      </div>
    </div>
  );
};


export default Login;
