import { useState } from 'react';
import { useSelector } from 'react-redux';

const CheckoutItemSummary = () => {
  const { checkout } = useSelector((state) => state.checkout);

  const [discountCode, setDiscountCode] = useState('');

  const handleDiscountCodeSubmit = (e) => {
    e.preventDefault();

    console.log(discountCode);
  };

  return (
    <div>
      {checkout &&
        checkout.line_items &&
        checkout.line_items.length > 0 &&
        checkout.line_items.map((item) => (
          <div key={item.id}>
            <img src={item.image.url} alt={item.name} width='100px' />
            <p>{item.name}</p>
            {item.selected_options.length > 1
              ? item.selected_options.map((opt) => (
                  <p key={opt.option_id}>{opt.option_name}</p>
                ))
              : item.selected_options.length === 1 && (
                  <p key={item.selected_options[0].option_id}>
                    {item.selected_options[0].option_name}
                  </p>
                )}
            <p>{item && item.price && item.price.formatted_with_symbol}</p>
          </div>
        ))}
      <br />
      <hr />
      <br />
      <form onSubmit={handleDiscountCodeSubmit}>
        <label htmlFor='discount-code'>Discount Code</label>
        <input
          type='text'
          id='discount-code'
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button type='submit'>Apply</button>
      </form>
      <br />
      <hr />
      <br />
      <label htmlFor='subtotal'>Subtotal</label>
      <p>
        {checkout &&
          checkout.subtotal &&
          checkout.subtotal.formatted_with_symbol}
      </p>
      <label htmlFor='shipping'>Shipping</label>
      <p>Calculated at next step</p>
    </div>
  );
};

export default CheckoutItemSummary;
