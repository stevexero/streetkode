import axios from 'axios';

const API_URL = 'https://api.chec.io/v1/products/';

// GET ALL PRODUCTS
const getAllProducts = async () => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data.data;
};

// GET SINGLE PRODUCT
const getProduct = async (productId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(API_URL + productId, config);

  return res.data;
};

// ADD PRODUCT
const addProduct = async (productInfo) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.post(
    API_URL,
    {
      product: {
        name: productInfo.name,
        price: productInfo.price,
      },
    },
    config
  );

  postImagesToChec(res.data.id, productInfo.imageArray);

  return res.data;
};

//   Posts new image(s) to chec asset library
const postImagesToChec = async (id, imageArray) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  await imageArray.map((asset) =>
    axios
      .post(
        'https://api.chec.io/v1/assets',
        {
          filename: asset.original_filename + '.' + asset.format,
          file_extension: asset.format,
          url: asset.url,
          meta: [id],
        },
        config
      )
      .then((res) => setImagesToPost(id))
  );
};

// Save images to post
const setImagesToPost = async (productId) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  //   Get all assets
  const allAssets = await axios.get('https://api.chec.io/v1/assets', config);

  const currentAssetsArray = allAssets.data.data.filter(
    (asset) => asset.meta[0] === productId
  );

  const temp = [];
  await currentAssetsArray.forEach((asset) => {
    temp.push({
      id: asset.id,
      url: asset.url,
      filename: asset.filename,
      file_extension: asset.file_extension,
    });
  });

  await axios.put(
    `https://api.chec.io/v1/products/${productId}/assets`,
    {
      assets: temp,
    },
    config
  );
};

const productService = {
  getAllProducts,
  getProduct,
  addProduct,
};

export default productService;
