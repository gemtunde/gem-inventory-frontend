import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import {
  SET_LOGIN,
  SET_NAME,
  selectName,
} from "../../redux/features/auth/authSlice";
import Loader from "../Loader";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  //state
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  //or use this
  //const name = useSelector(selectName)

  //navigate
  const navigate = useNavigate();

  //logout
  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      await dispatch(SET_LOGIN(false));
      await dispatch(SET_NAME(""));
      navigate("/login");
    } catch (error) {
      console.log(error.mesage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="--pad header">
      {isLoading && <Loader />}
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name} </span>
        </h3>
        <button className="--btn --btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
