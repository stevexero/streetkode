import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Select from 'react-select';

import { addProduct } from '../features/products/productSlice';
import { getAllCategories } from '../features/categories/categorySlice';

const instance = axios.create();

const AddProduct = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);

  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([
    {
      id: '',
      value: '',
      label: '',
    },
  ]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([
    {
      value: '',
      label: '',
      parentId: '',
    },
  ]);
  const [reload, setReload] = useState(true);

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

  // Select category
  const handleCategoryChange = (e) => {
    setReload(false); // hack
    if (e !== null) {
      if (e.value === 'suggest-category') {
        const tempSubCategory = [
          { value: 'suggest-sub-category', label: 'Suggest a Sub-Category' },
        ];

        setSubCategoryOptions(tempSubCategory);

        console.log('Suggest a category');
      } else if (e.value === 'tops') {
        const tempSubCategory = [
          { value: 'suggest-sub-category', label: 'Suggest a Sub-Category' },
        ];

        setSubCategoryOptions(tempSubCategory);

        const cats = categories.filter((cat) => cat.id === e.id);

        cats[0].children.forEach((sub) => {
          tempSubCategory.push({
            value: sub.slug,
            label: sub.name,
            parentId: cats[0].id,
          });
        });

        setSubCategoryOptions(tempSubCategory);
      } else if (e.value === 'bottoms') {
        const tempSubCategory = [
          { value: 'suggest-sub-category', label: 'Suggest a Sub-Category' },
        ];

        setSubCategoryOptions(tempSubCategory);

        const cats = categories.filter((cat) => cat.id === e.id);

        cats[0].children.forEach((sub) => {
          tempSubCategory.push({
            value: sub.slug,
            label: sub.name,
            parentId: cats[0].id,
          });
        });

        setSubCategoryOptions(tempSubCategory);
      } else if (e.value === 'footwear') {
        const tempSubCategory = [
          { value: 'suggest-sub-category', label: 'Suggest a Sub-Category' },
        ];

        setSubCategoryOptions(tempSubCategory);

        const cats = categories.filter((cat) => cat.id === e.id);

        cats[0].children.forEach((sub) => {
          tempSubCategory.push({
            value: sub.slug,
            label: sub.name,
            parentId: cats[0].id,
          });
        });

        setSubCategoryOptions(tempSubCategory);
      } else {
        const tempSubCategory = [
          { value: 'suggest-sub-category', label: 'Suggest a Sub-Category' },
        ];

        setSubCategoryOptions(tempSubCategory);

        console.log('null value');
      }
    }
  };

  // Select sub-category
  const handleSubCategoryChange = (e) => {
    // if (e !== null) {
    //   if (e.value === 'suggest-category') {
    //     console.log('Suggest a category');
    //   } else if (e.value === 'tops') {
    //     console.log('Tops');
    //   } else if (e.value === 'bottoms') {
    //     console.log('Bottoms');
    //   } else {
    //     console.log('null value');
    //   }
    // }
    console.log(e);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const temp = [{ value: 'suggest-category', label: 'Suggest a Category' }];

    categories.forEach((cat) => {
      temp.push({
        id: cat.id,
        value: cat.slug,
        label: cat.name,
      });
    });

    setCategoryOptions(temp);
  }, [categories]);

  useEffect(() => {
    // Total hack to reload the select component
    // Try to fix later by setting it in it's own component
    setReload(true);
  }, [reload]);

  // useEffect(() => {
  //   console.log(categoryOptions);
  // }, [categoryOptions]);

  // useEffect(() => {
  //   console.log(subCategoryOptions);
  // }, [subCategoryOptions]);

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

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
        <br />
        {/* MAIN CATEGORIES */}
        <label htmlFor='category'>Category</label>
        <Select
          className='basic-single'
          classNamePrefix='select'
          // defaultValue={
          //   categoryOptions ? categoryOptions[0] : 'loading categories...'
          // }
          isClearable={true}
          isSearchable={true}
          name='category'
          id='category'
          options={categoryOptions}
          onChange={handleCategoryChange}
        />
        {/* SUB CATEGORIES */}
        <label htmlFor='sub-category'>Sub-category</label>
        {reload && (
          <Select
            className='basic-single'
            classNamePrefix='select'
            defaultValue={subCategoryOptions[0]}
            isClearable={true}
            isSearchable={true}
            name='sub-category'
            id='sub-category'
            options={subCategoryOptions}
            onChange={handleSubCategoryChange}
          />
        )}
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
