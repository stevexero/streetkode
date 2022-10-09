import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { addProduct } from '../features/products/productSlice';

const instance = axios.create();

const AddProduct = () => {
  const dispatch = useDispatch();

  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImages = async (files) => {
    const uploader = files.map((image) => {
      const formData = new FormData();

      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME
      );

      return instance.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
    });

    const resArr = await Promise.all(uploader);

    const urls = resArr.map((res) => res.data);

    console.log(urls);

    return urls;
  };

  const sendForm = async (e, images) => {
    // const form = e.target;
    // const formElements = form.elements;

    const reqBody = {
      name: productTitle,
      price: +productPrice,
      assets: images,
    };
    // await postMessage(reqBody);
    // console.log(reqBody);
    dispatch(addProduct(reqBody));

    setProductTitle('');
    setProductPrice('');
    setSelectedImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImages.length > 0) {
      const imageURLS = await uploadImages(selectedImages);

      sendForm(e, imageURLS);
    } else {
      sendForm(e, null);
    }
  };

  // Images
  // useEffect(() => {
  //   if (selectedImage !== undefined) {
  //     const formData = new FormData();
  //     formData.append('file', selectedImage);
  //     // formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
  //   }
  // }, [selectedImage]);

  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // Submit
  // const handleProductSubmit = (e) => {
  //   e.preventDefault();

  //   const productInfo = {
  //     name: productTitle,
  //     price: +productPrice,
  //     // image: selectedImage,
  //   };

  //   console.log(productInfo);

  //   dispatch(addProduct(productInfo));

  //   alert(`Woohoo! You added ${productTitle} at a price of ${productPrice}`);

  //   setProductTitle('');
  //   setProductPrice(0);
  //   // setSelectedImage('');
  // };

  return (
    <div>
      {/* <form onSubmit={handleProductSubmit}> */}
      <form onSubmit={handleSubmit}>
        {selectedImages && (
          <div>
            {selectedImages.map((image) => (
              <div key={image.name}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={image}
                  width='100px'
                />
              </div>
            ))}
          </div>
        )}
        {/* Title */}
        <input
          type='text'
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />
        {/* Price */}
        <input
          type='number'
          min='1'
          step='any'
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        {/* Image */}
        <input
          type='file'
          label='Image'
          name='myFile'
          accept='.jpeg, .png, .jpg'
          onChange={(e) =>
            setSelectedImages([...selectedImages, e.target.files[0]])
          }
        />
        {/* <input
          id='profile-image'
          type='file'
          // hidden
          onChange={(e) => setSelectedImage(e.target.files[0])}
        /> */}
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
