import React, { useEffect } from "react";
import { getLoginStatus } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirectLogOutUser = (path) => {
  //state
  const dispatch = useDispatch();

  //navigate
  const navigate = useNavigate();

  const redirectLoggedOutUser = async () => {
    const isLoggedIn = await getLoginStatus();
    dispatch(SET_LOGIN(isLoggedIn));

    if (!isLoggedIn) {
      toast.info("Session Expired, please login to continue");
      navigate(path);
      return;
    }
  };
  useEffect(() => {
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLogOutUser;
