import "./resetpassword.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ResetPassword = ({ url }) => {
  const navigate = useNavigate();
  const { token } = useParams();
  const handlesubmit = (e) => {
    e.preventDefault();
    const data = {
      password: e.target.password.value,
    };
    axios
      .post(`${url}/auth/resetPassword/${token}`, data)
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
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
      <h1>Enter Your New Password!</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="password"
          name="password"
          placeholder="Enter your password here ..."
          required
        ></input>
        <input
          type="submit"
          value="Reset Password"
          className="btn btn-outline-light"
        />
      </form>

      <span>
        <Link to="/login">←prev</Link>
      </span>
    </div>
  );
};
