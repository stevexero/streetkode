import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  sendVerificationThankYouMail,
  verifyUser,
} from '../features/auth/authSlice';

const Verification = () => {
  const dispatch = useDispatch();

  const { verifyId } = useParams();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      verifyId &&
      user &&
      verifyId === user.verifyId &&
      user.verifiedEmail === false
    ) {
      const userData = {
        email: user.email,
        name: user.name,
      };

      dispatch(verifyUser(user));
      console.log(userData);
      dispatch(sendVerificationThankYouMail(userData));
    }
  }, [dispatch, verifyId, user]);

  return (
    <div>
      <p>Thank you for verifying your email!</p>
      <p>
        If you're interested in selling with us,{' '}
        <Link to='/register-shop'>Click here</Link>
      </p>
      <Link to='/shop'>Go shopping</Link>
    </div>
  );
};

export default Verification;
