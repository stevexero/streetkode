import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { addProduct } from '../features/products/productSlice';

const instance = axios.create();

const AddProduct = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  // Submit form - if images, upload images, else send form
  const handleSubmit = async (e) => {
    console.log('Submitting...');
    e.preventDefault();

    if (selectedImages.length > 0) {
      const imageURLS = await uploadImages(selectedImages);

      sendForm(e, imageURLS);
    } else {
      sendForm(e, null);
    }
  };

  // Upload to Cloudinary if images
  const uploadImages = async (files) => {
    console.log('Uploading images...');
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

    return urls;
  };

  const sendForm = async (e, images) => {
    console.log('sending form...');
    const reqBody = {
      name: productTitle,
      price: +productPrice,
      imageArray: images,
      createdBy: user._id,
    };

    dispatch(addProduct(reqBody));

    setProductTitle('');
    setProductPrice('');
    setSelectedImages([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Display Images to be uploaded */}
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
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
