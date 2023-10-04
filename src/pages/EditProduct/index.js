import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import Loader from "../../Components/Loader";
import ProductForm from "../../Components/product/ProductForm";
const EditProduct = () => {
  const { id } = useParams();

  //access state
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [ImagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    //incase use refresh the page, data is not lost
    setProduct(productEdit);

    //check if image exist
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );
    //description
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);
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

  //save product
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("price", product?.price);
    formData.append("quantity", product?.quantity);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product - {product?.name} </h3>
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

export default EditProduct;
