import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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
      slug: '',
      label: '',
    },
  ]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([
    {
      id: '',
      slug: '',
      label: '',
      parentId: '',
    },
  ]);
  // const [categoryLabel, setCategoryLabel] = useState('');
  // const [subCategoryLabel, setSubCategoryLabel] = useState('');
  const [catsArray, setCatsArray] = useState([]);
  const [subCatObj, setSubCatObj] = useState({
    id: '',
    slug: '',
    name: '',
  });

  const [catObj, setCatObj] = useState({
    id: '',
    slug: '',
    name: '',
  });

  useEffect(() => {
    setCatsArray([catObj, subCatObj]);
  }, [catObj, subCatObj]);

  // Submit form - if images, upload images, else send form
  const handleSubmit = async (e) => {
    console.log('Submitting...');
    e.preventDefault();

    if (selectedImages.length > 0) {
      const imageURLS = await uploadImages(selectedImages);

      sendForm(catsArray, imageURLS);
    } else {
      sendForm(catsArray, null);
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

  const sendForm = async (arr, images) => {
    const reqBody = {
      name: productTitle,
      price: +productPrice,
      imageArray: images,
      createdBy: user._id,
      categories: arr,
    };

    // console.log(reqBody);

    dispatch(addProduct(reqBody));

    setProductTitle('');
    setProductPrice('');
    setSelectedImages([]);
  };

  // Select category
  const handleCategoryChange = (e) => {
    // console.log(e.target.value);
    const index = e.target.selectedIndex;
    const catElement = e.target.childNodes[index];
    const catId = catElement.getAttribute('id');
    const catSlug = catElement.getAttribute('value');
    const catName = catElement.getAttribute('name');

    if (e !== null) {
      setCatObj({ id: catId, name: catName, slug: catSlug });

      if (e.target.value === 'suggest-category') {
        const tempSubCategory = [
          {
            id: null,
            slug: 'suggest-sub-category',
            label: 'Suggest a Sub-Category',
          },
        ];

        setSubCategoryOptions(tempSubCategory);
      } else if (e.target.value === 'tops') {
        const tempSubCategory = [
          {
            id: null,
            slug: 'suggest-sub-category',
            label: 'Suggest a Sub-Category',
          },
        ];

        setSubCategoryOptions(tempSubCategory);

        const cats = categories.filter((cat) => cat.id === catId);

        cats[0].children.forEach((sub) => {
          tempSubCategory.unshift({
            id: sub.id,
            slug: sub.slug,
            label: sub.name,
            parentId: cats[0].id,
          });
        });

        setSubCategoryOptions(tempSubCategory);
      } else if (e.target.value === 'bottoms') {
        const tempSubCategory = [
          {
            id: null,
            slug: 'suggest-sub-category',
            label: 'Suggest a Sub-Category',
          },
        ];

        setSubCategoryOptions(tempSubCategory);

        const cats = categories.filter((cat) => cat.id === catId);

        cats[0].children.forEach((sub) => {
          tempSubCategory.unshift({
            id: sub.id,
            slug: sub.slug,
            label: sub.name,
            parentId: cats[0].id,
          });
        });

        setSubCategoryOptions(tempSubCategory);
      } else if (e.target.value === 'footwear') {
        const tempSubCategory = [
          {
            id: null,
            slug: 'suggest-sub-category',
            label: 'Suggest a Sub-Category',
          },
        ];

        setSubCategoryOptions(tempSubCategory);

        const cats = categories.filter((cat) => cat.id === catId);

        cats[0].children.forEach((sub) => {
          tempSubCategory.unshift({
            id: sub.id,
            slug: sub.slug,
            label: sub.name,
            parentId: cats[0].id,
          });
        });

        setSubCategoryOptions(tempSubCategory);
      } else {
        const tempSubCategory = [
          {
            id: null,
            slug: 'suggest-sub-category',
            label: 'Suggest a Sub-Category',
          },
        ];

        setSubCategoryOptions(tempSubCategory);

        console.log('null value');
      }
    }
  };

  // Select sub-category
  const handleSubCategoryChange = (e) => {
    const index = e.target.selectedIndex;
    const subCatElement = e.target.childNodes[index];
    const subCatId = subCatElement.getAttribute('id');
    const subCatSlug = subCatElement.getAttribute('value');
    const subCatName = subCatElement.getAttribute('name');

    setSubCatObj({ id: subCatId, name: subCatName, slug: subCatSlug });
  };

  // GET ALL CATEGORIES
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // SET CATEGORY OPTIONS
  useEffect(() => {
    const temp = [
      { id: null, slug: 'suggest-category', label: 'Suggest a Category' },
    ];

    categories.forEach((cat) => {
      temp.unshift({
        id: cat.id,
        slug: cat.slug,
        label: cat.name,
      });
    });

    setCategoryOptions(temp);
  }, [categories]);

  // LOG STUFF
  // useEffect(() => {
  //   console.log(categoryOptions);
  // }, [categoryOptions]);

  // useEffect(() => {
  //   console.log(subCategoryOptions);
  // }, [subCategoryOptions]);

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  // useEffect(() => {
  //   console.log(catObj);
  // }, [catObj]);

  // useEffect(() => {
  //   console.log(subCatObj);
  // }, [subCatObj]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* IMAGES TO BE UPLOADED */}
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
        {/* TITLE */}
        <input
          type='text'
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />
        {/* PRICE */}
        <input
          type='number'
          min='1'
          step='any'
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        {/* IMAGE */}
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
        <select name='category' id='category' onChange={handleCategoryChange}>
          <option id='select-category' value='select-category' defaultChecked>
            Select Category
          </option>
          {categoryOptions.map((cats) => (
            <option
              key={cats.id}
              id={cats.id}
              value={cats.slug}
              name={cats.label}
            >
              {cats.label}
            </option>
          ))}
        </select>
        {/* SUB CATEGORIES */}
        <label htmlFor='sub-category'>Sub-category</label>
        <select
          name='sub-category'
          id='sub-category'
          onChange={handleSubCategoryChange}
        >
          <option value='select-sub-category' defaultChecked>
            Select Sub-category
          </option>
          {subCategoryOptions.map((subCats) => (
            <option
              key={subCats.id}
              id={subCats.id}
              value={subCats.slug}
              name={subCats.label}
            >
              {subCats.label}
            </option>
          ))}
        </select>
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
