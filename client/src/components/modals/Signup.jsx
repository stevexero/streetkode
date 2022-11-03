import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { gapi } from 'gapi-script';

import { closeAuthModal } from '../../features/modals/modalSlice';
import {
  register,
  sendWelcomeMail,
  reset,
} from '../../features/auth/authSlice';
// import GoogleLoginButton from './GoogleLoginButton';

const Signup = () => {
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log('passwords do not match');
      return;
    }

    const signupData = {
      email,
      name,
      password,
      singupFrom: 'email',
    };

    dispatch(register(signupData));
    dispatch(sendWelcomeMail(signupData));

    setEmail('');
    setName('');
    setPassword('');
    setPassword2('');

    //
    // try {
    //   axios.post('http://localhost:8000/send_mail', { text: 'hi from signup' });
    // } catch (error) {
    //   console.log(error);
    // }
    //

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
    <form onSubmit={handleSignupSubmit}>
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
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Sign Up</button>
        </div>
        {/* <br /> */}
        {/* <Typography variant='caption' align='center'> */}
        {/* -- or -- */}
        {/* </Typography> */}
        {/* <br /> */}
        {/* <div>
          <GoogleLoginButton gText='Sign up with Google' source='signup' />
        </div> */}
      </div>
    </form>
  );
};

export default Signup;
