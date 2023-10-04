import React, { useState } from "react";
import ProductForm from "../../Components/product/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: 0,
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [ImagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  //navigation
  const navigate = useNavigate();

  //access data from the state
  const isLoading = useSelector(selectIsLoading);

  //send data to state
  const dispatch = useDispatch();

  //destructre product usestate
  const { name, category, price, quantity } = product;

  //handleinput change from form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //image change
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);

    //to preview image
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  //generate a unique number(sku) for each product
  const generateSku = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  //save product
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSku(category));
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        ImagePreview={ImagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
