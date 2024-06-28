import "./signup.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { calcLength, easeIn, easeOut, motion } from "framer-motion";

const varientsX = {
  bottomX: {
    x: 0,
  },
  topX: {
    x: "calc(100vw)",
    transition: {
      ease: easeIn,
      delay: 3,
      duration: 2,
    },
  },
};

const VarientY = {
  bottomY: {
    y: -10,
  },
  topY: {
    y: "calc(-100vh)",
    transition: {
      ease: easeIn,
      delay: 0.8,
      duration: 4.2,
    },
  },
};

const variants2 = {
  bottom: {
    rotate: -45,
    transition: {
      ease: easeIn,
      duration: 1,
      delay: 2,
    },
  },
  top: {
    rotate: 45,
    transition: {
      delay: 2.8,
      duration: 2,
      ease: easeOut,
    },
  },
};

export const Signup = ({ url }) => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("english");
  const [loader, setLoader] = useState(true);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${url}/auth/verify`)
      .then((res) => {
        setLoader(false);
        if (res.data.status) {
          navigate("/notes");
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  const handleJoin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
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
        setLoader(false);
        if (res.data.status) {
          navigate("/login");
        } else {
          alert(res.data.message);
          navigate("/signup");
        }
      })
      .catch((err) => {
        setLoader(false);
        alert("Something went wrong! Please try again.");
        navigate("/signup");
      });
  };

  return (
    <>
      <div className="signupBG">
        <div className="heroSection">
          {/* <motion.div className="rocketAnimation">
            <motion.div
              className="rocketContainer"
              variants={varientsX}
              initial="bottomX"
              animate="topX"
            >
              <motion.div
                variants={VarientY}
                initial="bottomY"
                animate="topY"
                className="rocketContainer1"
              >
                <motion.svg
                  version="1.1"
                  viewBox="0 0 512.016 512.016"
                  style={{
                    fill: "#000000",
                    position: "absolute",
                    height: "90%",
                    width: "90%",
                  }}
                  variants={variants2}
                  animate="top"
                  initial="bottom"
                >
                  <g stroke-width="0"></g>
                  <g
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="1.0240319999999998"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      style={{ fill: "#FFCE54" }}
                      d="M17.25,493.132c3.625-10.188,8.344-23.141,13.625-36.563c19.875-50.642,30.407-65.782,34.938-70.298 c6.781-6.797,15.188-11.375,24.313-13.266l3.156-0.656l35.344-35.75l42.312,48.875l-32.906,31.516l-0.688,3.235 c-1.875,9.125-6.469,17.531-13.25,24.344c-4.531,4.5-19.656,15.062-70.282,34.923C40.376,484.757,27.406,489.507,17.25,493.132z"
                    ></path>
                    <path
                      style={{ fill: "#F6BB42" }}
                      d="M129.158,320.943L87.97,362.584c-10.719,2.219-21.126,7.609-29.688,16.172 C36.407,400.63,0,510.366,0,510.366s109.72-36.391,131.626-58.282c8.531-8.547,13.938-18.969,16.156-29.703l37.812-36.22 L129.158,320.943z M133.064,407.005l-4.781,4.594l-1.344,6.484c-1.469,7.079-5.062,13.642-10.375,18.954 c-1.75,1.75-13.219,11.578-66.563,32.517c-5.094,1.984-10.094,3.906-14.906,5.703c1.812-4.812,3.719-9.812,5.719-14.876 c20.938-53.36,30.75-64.829,32.531-66.579c5.313-5.328,11.876-8.906,18.938-10.359l6.312-1.312l4.531-4.578l24.969-25.281 l28.156,32.516L133.064,407.005z"
                    ></path>
                    <g>
                      <path
                        style={{ fill: "#DA4453" }}
                        d="M199.909,423.397c5.969-2.797,11.938-5.767,17.875-8.876l121.501-86.781 c4.969-4.641,9.875-9.391,14.719-14.203c2.781-2.812,5.563-5.625,8.282-8.469c-0.469,55.359-25.845,115.923-74.032,164.127 c-16.062,16.047-33.469,29.562-51.625,40.484c-0.125,0.078-0.845,0.5-0.845,0.5c-4.031,2.188-9.188,1.578-12.594-1.828 c-1.125-1.141-1.938-2.469-2.438-3.875c0,0-0.375-1.109-0.469-1.594l-21.938-78.767 C198.878,423.881,199.378,423.631,199.909,423.397z"
                      ></path>
                      <path
                        style={{ fill: "#DA4453" }}
                        d="M207.534,150.269c-2.844,2.734-5.656,5.516-8.469,8.312c-4.813,4.828-9.563,9.734-14.188,14.703 c-21.281,3-86.812,121.517-86.812,121.517c-3.094,5.938-6.062,11.892-8.875,17.876c-0.25,0.516-0.469,1.031-0.719,1.547 L9.688,292.285c-0.469-0.094-1.594-0.469-1.594-0.469c-1.406-0.5-2.719-1.312-3.875-2.453c-3.406-3.406-4-8.547-1.812-12.594 c0,0,0.406-0.703,0.5-0.828c10.906-18.157,24.406-35.563,40.469-51.625C91.595,176.097,152.158,150.722,207.534,150.269z"
                      ></path>
                    </g>
                    <path
                      style={{ fill: "#E6E9ED" }}
                      d="M197.003,151.05c-60.408,60.422-103.97,129.438-128.252,196.299 c-1.281,3.75-0.469,8.031,2.531,11.016l82.907,82.938c3,2.969,7.281,3.797,11.031,2.516 c66.876-24.282,135.877-67.829,196.285-128.251c93.876-93.845,146.563-207.081,150.501-303.645c0.125-2.875-0.906-6.047-3.094-8.25 c-2.219-2.203-5.375-3.234-8.281-3.109C404.069,4.501,290.848,57.205,197.003,151.05z"
                    ></path>
                    <g>
                      <path
                        style={{ fill: "#434A54" }}
                        d="M317.598,237.535c-11.375,0-22.062-4.438-30.094-12.469c-8.031-8.047-12.469-18.735-12.469-30.11 s4.438-22.063,12.469-30.11c8.031-8.031,18.75-12.469,30.094-12.469c11.375,0,22.062,4.438,30.125,12.469 c16.595,16.61,16.595,43.625,0,60.22c-8.062,8.031-18.75,12.469-30.094,12.469C317.598,237.535,317.598,237.535,317.598,237.535z"
                      ></path>
                      <path
                        style={{ fill: "#434A54" }}
                        d="M227.284,327.849c-11.375,0-22.062-4.422-30.094-12.469c-8.032-8.031-12.47-18.735-12.47-30.095 c0-11.375,4.438-22.078,12.47-30.125c8.031-8.031,18.719-12.469,30.094-12.469c11.376,0,22.063,4.438,30.126,12.469 c16.594,16.61,16.594,43.626,0,60.22C249.347,323.427,238.66,327.849,227.284,327.849L227.284,327.849z"
                      ></path>
                    </g>
                    <g>
                      <path
                        style={{ fill: "#CCD1D9" }}
                        d="M355.254,157.331c-10.062-10.047-23.438-15.594-37.656-15.594c-14.188,0-27.562,5.547-37.625,15.594 c-10.031,10.047-15.594,23.422-15.594,37.625c0,14.219,5.562,27.579,15.594,37.641c10.062,10.046,23.438,15.578,37.625,15.578 c14.219,0,27.594-5.531,37.656-15.578C376.005,211.847,376.005,178.082,355.254,157.331z M340.192,217.535 c-6.25,6.234-14.406,9.359-22.594,9.359c-8.156,0-16.344-3.125-22.562-9.359c-12.469-12.469-12.469-32.688,0-45.157 c6.219-6.234,14.406-9.344,22.562-9.344c8.188,0,16.344,3.109,22.594,9.344C352.66,184.847,352.66,205.066,340.192,217.535z"
                      ></path>
                      <path
                        style={{ fill: "#CCD1D9" }}
                        d="M227.284,232.067c-14.219,0-27.562,5.531-37.626,15.578c-10.062,10.046-15.594,23.422-15.594,37.641 c0,14.204,5.531,27.563,15.594,37.626c10.063,10.047,23.407,15.594,37.626,15.594c14.22,0,27.595-5.547,37.658-15.594 c20.75-20.75,20.75-54.517,0-75.267C254.879,237.598,241.504,232.067,227.284,232.067z M249.879,307.849 c-6.25,6.25-14.407,9.359-22.595,9.359c-8.156,0-16.344-3.109-22.562-9.359c-12.47-12.47-12.47-32.688,0-45.157 c6.219-6.235,14.406-9.344,22.562-9.344c8.188,0,16.345,3.109,22.595,9.344C262.348,275.16,262.348,295.379,249.879,307.849z"
                      ></path>
                    </g>
                    <path
                      style={{ fill: "#DA4453" }}
                      d="M479.225,145.816L366.755,33.361c45.813-19.922,91.47-31.063,133.876-32.797 c2.906-0.125,6.062,0.906,8.281,3.109c2.188,2.203,3.219,5.375,3.094,8.25C510.287,54.361,499.131,100.003,479.225,145.816z"
                    ></path>
                  </g>
                </motion.svg>
              </motion.div>
            </motion.div>
          </motion.div> */}

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
        {loader ? (
          <div className="loader">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
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
                    <input type="radio" name="class" value={11} required />{" "}
                    Class 11
                  </label>
                  <label>
                    <input type="radio" name="class" value={12} required />{" "}
                    Class 12
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
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-dark"
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </form>

              <span>
                <Link to="/login">Already a user?</Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
