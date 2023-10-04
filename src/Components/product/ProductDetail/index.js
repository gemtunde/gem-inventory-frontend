import React, { useEffect } from "react";
import "./ProductDetail.scss";
import useRedirectLogOutUser from "../../../customHook/useRedirectLogOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  selectIsLoading,
} from "../../../redux/features/product/productSlice";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { SpinnerImg } from "../../Loader";
import Card from "../../Card";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  //logout out if user not loggin
  useRedirectLogOutUser("/login");

  const { id } = useParams();

  //access state
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //also use this method to access the state coz i have multiple values to extract
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }
    //console.log("products list", products);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, message, dispatch, isError]);

  //check if product in stock and color it
  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
