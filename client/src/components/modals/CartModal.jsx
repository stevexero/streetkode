import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import { closeCartModal } from '../../features/modals/modalSlice';

Modal.setAppElement('#root');

const CartModal = () => {
  const dispatch = useDispatch();

  const { isCartModalOpen, cartModalStyle } = useSelector(
    (state) => state.modals
  );

  const closeModal = () => {
    dispatch(closeCartModal());
  };

  return (
    <Modal
      isOpen={isCartModalOpen}
      onRequestClose={closeModal}
      //   style={{
      //     overlay: {
      //       position: 'fixed',
      //       top: 0,
      //       left: 0,
      //       right: 0,
      //       bottom: 0,
      //       backgroundColor: 'rgba(0, 0, 0, 0.75)',
      //     },
      //     content: {
      //       cartModalStyle,
      //     },
      //   }}
      //   FIXME: MODAL STYLE
      style={cartModalStyle}
      contentLabel='Cart Modal'
    >
      <h2>Cart</h2>
      <button onClick={closeModal}>close</button>

      <div>
        <p>Show cart stuffs</p>
      </div>
    </Modal>
  );
};

export default CartModal;
