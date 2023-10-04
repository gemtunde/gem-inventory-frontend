import React, { useEffect } from "react";
import useRedirectLogOutUser from "../../customHook/useRedirectLogOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductList from "../../Components/product/ProductList";
import ProductSummary from "../../Components/product/ProductSummary";

const Dashboard = () => {
  useRedirectLogOutUser("/login");

  //access state
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //also use this method to access the state
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }
    //console.log("products list", products);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, message, dispatch, isError]);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
