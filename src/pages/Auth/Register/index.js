import React, { useState } from "react";
import styles from "../auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../../Components/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, validateEmail } from "../../../services/authService";
//import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { SET_LOGIN, SET_NAME } from "../../../redux/features/auth/authSlice";
import Loader from "../../../Components/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  //state
  const dispatch = useDispatch();

  //navigate
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  //onchange input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //on form submit
  const register = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (!name || !email || !password) {
      return toast.error("Please fill all fields");
    }

    //validate email
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    //validate password
    if (password.length < 6) {
      return toast.error("Password must be upto 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      name,
      email,
      password,
    };
    try {
      setIsLoading(true);
      const data = await registerUser(userData);
      //console.log("register data is ", data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.user));
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
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register </h2>
          <form onSubmit={register}>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              name="name"
            />
            <input
              value={email}
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <span className={styles.register}>
            Already have an account? &nbsp; <Link to="/login"> Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
