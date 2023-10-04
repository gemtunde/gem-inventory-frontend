import styles from "../auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../../Components/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../../services/authService";
import Loader from "../../../Components/Loader";

const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialState);

  const { email } = formData;

  const [isLoading, setIsLoading] = useState(false);

  //handleform input
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //forgot
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please email field");
    }
    if (!validateEmail(email)) {
      return toast.error("Please use valid email");
    }
    const userData = { email };
    try {
      setIsLoading(true);
      await forgotPassword(userData);
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
            <Link to="/">
              <AiOutlineMail size={35} color="#999" />
            </Link>
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              value={email}
              onChange={handleFormInput}
              type="email"
              placeholder="Email"
              required
              name="email"
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <Link to="/">- Home</Link>
              <Link to="/login">- Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
