import React, { useState } from "react";
import styles from "../auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../../Components/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../../redux/features/auth/authSlice";
import Loader from "../../../Components/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;
  //form input change
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //state
  const dispatch = useDispatch();

  //navigate
  const navigate = useNavigate();

  //login submit
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }
    setIsLoading(true);

    const userData = {
      email,
      password,
    };
    try {
      const response = await loginUser(userData);
      //console.log("login user name 2", response);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(response.name));
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth} `}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              value={formData.email}
              onChange={handleFormInput}
              type="email"
              placeholder="Email"
              required
              name="email"
            />
            <input
              type="password"
              placeholder="xxxxxxx"
              required
              name="password"
              value={formData.password}
              onChange={handleFormInput}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>
          <span className={styles.register}>
            Don't have an account? &nbsp; <Link to="/register"> Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
