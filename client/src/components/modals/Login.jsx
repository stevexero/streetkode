import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { gapi } from 'gapi-script';

import { closeAuthModal } from '../../features/modals/modalSlice';
import { login, reset } from '../../features/auth/authSlice';

// import GoogleLoginButton from './GoogleLoginButton';

const Login = () => {
  const dispatch = useDispatch();

  const { user, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    dispatch(login(loginData));

    setEmail('');
    setPassword('');

    dispatch(closeAuthModal());
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch]);

  //   useEffect(() => {
  //     function start() {
  //       gapi.client.init({
  //         clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //         scope: '',
  //       });
  //     }

  //     gapi.load('client:auth2', start);
  //   });

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <div>
          <label htmlFor='email'>Email address</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
        {/* <br /> */}
        {/* <p> */}
        {/* -- or -- */}
        {/* </p> */}
        {/* <br /> */}
        {/* <div> */}
        {/* <GoogleLoginButton gText='Login with Google' source='login' /> */}
        {/* </div> */}
      </div>
    </form>
  );
};

export default Login;
