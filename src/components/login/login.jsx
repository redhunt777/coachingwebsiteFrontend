import "./login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const Login = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${url}/auth/verify`).then((res) => {
      if (res.data.status) {
        console.log(res.data);
        navigate("/");
      }
    });
  }, []);

  const handleJoin = () => {
    navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Please wait while we log you in");
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(`${url}/auth/login`, data)
      .then((res) => {
        console.log(res.data.status);
        console.log(res.data.message);
        if (res.data.status) {
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signupBG">
      <div className="heroSection">
        <div className="heroSection__content">
          <h1>Akshay Classes</h1>
          <h2>Welcome to Akshay Classes</h2>
          <p>
            We believe in building strong foundations that propel students
            towards academic success. We are here to support you in every step
            of the way.
          </p>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleJoin}
          >
            Join now
          </button>
        </div>
      </div>
      <div className="signupContainer">
        <div className="signup">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required></input>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password"></input>
            <div style={{ width: "fit-content" }}>
              <input type="submit" value="Submit" className="btn btn-dark" />
            </div>
          </form>

          <div className="footer">
            <span>
              <Link to="/signup">New user?</Link>
            </span>
            <span>
              <Link to="/forgotpassword">Forgot Password?</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
