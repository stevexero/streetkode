import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import { closeCartModal } from '../../features/modals/modalSlice';

Modal.setAppElement('#root');

const CartModal = () => {
  const dispatch = useDispatch();

  const { isCartModalOpen, cartModalStyle } = useSelector(
    (state) => state.modals
  );
  const { cart } = useSelector((state) => state.cart);

  const closeModal = () => {
    dispatch(closeCartModal());
  };

  return (
    <Modal
      isOpen={isCartModalOpen}
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
          cartModalStyle,
        },
      }}
      contentLabel='Cart Modal'
    >
      <h2>Cart</h2>
      <button onClick={closeModal}>close</button>

      <div>
        {!cart.total_items ? (
          <p>Cart Empty</p>
        ) : (
          <>
            <p>
              {cart.total_items} {cart.total_items > 1 ? 'items' : 'item'}
            </p>
            <p>Shipping & taxes calculated at checkout</p>
            <p>{cart.subtotal.formatted_with_symbol}</p>
            <button>Checkout</button>
            <hr />
            {cart.line_items.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image.url}
                  alt={item.product_name}
                  width='100px'
                />
                <p>{item.name}</p>
                {item.selected_options.length > 1
                  ? item.selected_options.map((opt) => (
                      <p key={opt.id}>{opt.option_name}</p>
                    ))
                  : item.selected_options.length === 1 && (
                      <p>{item.selected_options[0].option_name}</p>
                    )}
                <p>{item.price.formatted_with_symbol}</p>
                <p>Quantity:</p>
                <button>-</button>
                <p>{item.quantity}</p>
                <button>+</button>
              </div>
            ))}
          </>
        )}
        <button>Continue Shopping</button>
      </div>
    </Modal>
  );
};

export default CartModal;
