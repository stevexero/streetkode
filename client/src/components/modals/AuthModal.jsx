import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import {
  closeAuthModal,
  switchToSignUp,
  switchToLogin,
} from '../../features/modals/modalSlice';

import Login from './Login';
import Signup from './Signup';

Modal.setAppElement('#root');

const AuthModal = () => {
  const dispatch = useDispatch();

  const { isAuthModalOpen, isOnLogin, modalStyle } = useSelector(
    (state) => state.modals
  );

  const closeModal = () => {
    dispatch(closeAuthModal());
    dispatch(switchToLogin());
  };

  const switchToLoginOrSignUpCLick = () => {
    isOnLogin ? dispatch(switchToSignUp()) : dispatch(switchToLogin());
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          modalStyle,
        },
      }}
      contentLabel='Auth Modal'
    >
      {isOnLogin ? <h2>Login</h2> : <h2>Sign up</h2>}
      <button onClick={closeModal}>close</button>
      {isOnLogin ? <Login /> : <Signup />}
      {isOnLogin ? (
        <div>
          <p>Don't have an account?</p>
          <button onClick={switchToLoginOrSignUpCLick}>Sign up here</button>
        </div>
      ) : (
        <div>
          <p>Already have an account?</p>
          <button onClick={switchToLoginOrSignUpCLick}>Login here</button>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
