import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

import {
  getProduct,
  getProductVariants,
  reset,
} from '../features/products/productSlice';
import { createCart } from '../features/cart/cartSlice';

import PlaceholderImage from '../assets/placeholder_img.jpeg';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { product, productVariants, isSuccess, isLoading, isError, message } =
    useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);

  const [selectedOption, setSelectedOption] = useState([]);

  const addItemToCart = (cartId) => {
    console.log('added item to cart');

    let productToCartDetails = {};

    if (selectedOption.length > 1) {
      dispatch(getProductVariants(productId));

      productVariants.map((variants) =>
        console.log(Object.values(variants.options))
      );
      console.log(selectedOption);

      productToCartDetails = {
        cartId: cartId,
        productId: productId,
        variant_id: productVariants.id,
      };
    } else {
      const obj = {
        [selectedOption[0].parentId]: selectedOption[0].optionId,
      };
      productToCartDetails = {
        cartId: cartId,
        productId: productId,
        options: obj,
      };
    }

    console.log(productToCartDetails);
  };

  const handleAddToCart = async (e) => {
    if (Object.keys(cart).length > 0) {
      addItemToCart(cart.id);
    } else {
      const newCart = await dispatch(createCart());
      console.log('created cart');
      console.log(newCart.payload.id);
      addItemToCart(newCart.payload.id);
    }
  };

  const handleOptionsRadioClick = (e, pVarId) => {
    selectedOption &&
      selectedOption.map(
        (opt) =>
          opt.parentId === pVarId &&
          selectedOption.splice(selectedOption.indexOf(opt), 1)
      );

    setSelectedOption([
      ...selectedOption,
      {
        parentId: pVarId,
        optionId: e.currentTarget.id,
        name: e.currentTarget.value,
      },
    ]);
  };

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('error: ');
      console.log(message);
    }

    dispatch(getProduct(productId));
  }, [dispatch, isError, message, productId]);

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

  // useEffect(() => {
  //   console.log(selectedOption);
  // }, [selectedOption]);

  // useEffect(() => {
  //   console.log(productVariants);
  // }, [productVariants]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div>
      <BackButton url='/shop' />
      {Object.keys(product).length > 0 ? (
        <>
          <h1>{product.name}</h1>
          <p>By "Put shop name here"</p>
          {product.image ? (
            <img src={product.image.url} alt={product.name} width='150px' />
          ) : (
            <img src={PlaceholderImage} alt='placeholder' width='150px' />
          )}
          <h2>{product.price.formatted_with_symbol}</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
          {product.variant_groups.length > 0 &&
            product.variant_groups.map((pVar) => (
              <div key={pVar.id}>
                <h1>{pVar.name}:</h1>
                {pVar.options.map((opts) => (
                  <div key={opts.id}>
                    <input
                      type='radio'
                      name={pVar.id}
                      id={opts.id}
                      value={opts.name}
                      onChange={(e) => handleOptionsRadioClick(e, pVar.id)}
                    />
                    <label htmlFor={opts.id}>{opts.name}</label>
                  </div>
                ))}
              </div>
            ))}
          <button onClick={handleAddToCart}>Add to cart</button>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default ProductPage;
