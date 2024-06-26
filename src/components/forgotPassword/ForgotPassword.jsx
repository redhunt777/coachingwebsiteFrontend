import "./forgot.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = ({ url }) => {
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
    };
    axios
      .post(`${url}/auth/forgotPassword`, data)
      .then((res) => {
        if (res.data.status) {
          alert(
            "Mail sent successfully, check your email for further details !"
          );
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="forgotPassword">
      <h1>Forgot Password?</h1>
      <h2> Don't Worry Enter Your Email Here</h2>
      <form onSubmit={handlesubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email here ..."
          required
        ></input>
        <input
          type="submit"
          value="Send mail"
          className="btn btn-outline-light"
        />
      </form>

      <p>Check your email for further details !</p>

      <span>
        <Link to="/login">←prev</Link>
      </span>
    </div>
  );
};
