import "./signup.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Signup = ({ url }) => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("english");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${url}/auth/verify`).then((res) => {
      if (res.data.status) {
        navigate("/");
      }
    });
  }, []);

  const handleJoin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Please wait while we register you");
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      class: e.target.class.value,
      board: e.target.board.value,
      medium: selectedMedium,
    };
    axios
      .post(`${url}/auth/signup`, data)
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
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
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="text">Name:</label>
            <input type="text" name="name" required></input>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required></input>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password"></input>
            <div className="class">
              <label>Which class are you studying?</label>
              <label>
                <input type="radio" name="class" value={11} required /> Class 11
              </label>
              <label>
                <input type="radio" name="class" value={12} required /> Class 12
              </label>
            </div>
            <div className="class">
              <label>Which board are you studying?</label>
              <label>
                <input
                  type="radio"
                  name="board"
                  value="rbse"
                  required
                  onChange={() => setSelectedBoard("rbse")}
                />
                Rbse
                {selectedBoard === "rbse" ? (
                  <>
                    <span className="medium">
                      <label>Medium: </label>
                      <label>
                        <input
                          type="radio"
                          name="medium"
                          value="english"
                          onChange={() => setSelectedMedium("english")}
                          required
                        />
                        English
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="medium"
                          value="hindi"
                          onChange={() => setSelectedMedium("hindi")}
                          required
                        />
                        Hindi
                      </label>
                    </span>
                  </>
                ) : null}
              </label>

              <label>
                <input
                  type="radio"
                  name="board"
                  value="cbse"
                  required
                  onChange={() => setSelectedBoard("cbse")}
                />
                Cbse
              </label>
            </div>
            <div style={{ width: "fit-content" }}>
              <input type="submit" value="Submit" className="btn btn-dark" />
            </div>
          </form>

          <span>
            <Link to="/login">Already a user?</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
