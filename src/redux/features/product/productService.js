import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`;

//create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//delete a products
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
//get a single products
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
//update a products
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProduct,
};
export default productService;
