import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { closeAuthModal } from '../../features/modals/modalSlice';

// Modal.setAppElement('Nav');

const AuthModal = () => {
  const dispatch = useDispatch();

  const { isAuthModalOpen, modalStyle } = useSelector((state) => state.modals);

  function closeModal() {
    dispatch(closeAuthModal());
  }

  return (
    <Modal
      isOpen={isAuthModalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={modalStyle}
      contentLabel='Example Modal'
      ariaHideApp={false}
    >
      <h2>Hello</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
};

export default AuthModal;
