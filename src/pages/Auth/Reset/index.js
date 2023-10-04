import styles from "../auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../../Components/Card";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../../../services/authService";

const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  //use params
  const params = useParams();
  const { resetToken } = params;

  const { password, confirmPassword } = formData;

  //handle form input
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //reset form submit
  const reset = async (e) => {
    e.preventDefault();

    //validation
    if (password.length < 6) {
      return toast.error("Password must be upto 6 characters");
    }
    if (password.length !== confirmPassword.length) {
      return toast.error("Password do not match");
    }
    const userData = { password };
    try {
      setIsLoading(true);
      await resetPassword(userData, resetToken);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth} `}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <Link to="/">
              <AiOutlineMail size={35} color="#999" />
            </Link>
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleFormInput}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleFormInput}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
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

export default ResetPassword;
