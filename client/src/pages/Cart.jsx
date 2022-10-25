import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import {
  decrementItem,
  deleteItemFromCart,
  incrementItem,
} from '../features/cart/cartSlice';

Modal.setAppElement('#root');

const Cart = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const handleDeleteClick = (item) => {
    const cartData = {
      cartId: cart.id,
      itemData: item,
    };

    dispatch(deleteItemFromCart(cartData));
  };

  const handleItemQuantityDecrement = (item) => {
    if (item.quantity === 1) {
      handleDeleteClick(item);
    } else {
      const cartData = {
        cartId: cart.id,
        itemData: item,
        quantity: item.quantity - 1,
      };

      dispatch(decrementItem(cartData));
    }
  };

  const handleItemQuantityIncrement = (item) => {
    const cartData = {
      cartId: cart.id,
      itemData: item,
      quantity: item.quantity + 1,
    };

    dispatch(incrementItem(cartData));
  };

  return (
    <div>
      <h2>Cart</h2>

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
            <Link to='/checkout'>Checkout</Link>
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
                      <p key={item.selected_options[0].id}>
                        {item.selected_options[0].option_name}
                      </p>
                    )}
                <p>{item.price.formatted_with_symbol}</p>
                <p>Quantity:</p>
                <button onClick={() => handleItemQuantityDecrement(item)}>
                  -
                </button>
                <p>{item.quantity}</p>
                <button onClick={() => handleItemQuantityIncrement(item)}>
                  +
                </button>
                <button onClick={() => handleDeleteClick(item)}>x</button>
              </div>
            ))}
          </>
        )}
        <Link to='/shop'>Continue Shopping</Link>
      </div>
    </div>
  );
};

export default Cart;
