import "./Profile.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Profile = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [board, setBoard] = useState("");
  const [class_, setClass] = useState("");
  const [medium, setMedium] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [nameChange, setNameChange] = useState("");
  const [boardChange, setBoardChange] = useState("");
  const [classChange, setClassChange] = useState("");
  const [mediumChange, setMediumChange] = useState("");

  useEffect(() => {
    axios.get(`${url}/auth/verify`).then((res) => {
      if (!res.data.status) {
        navigate("/login");
      }
      axios.get(`${url}/auth/data`).then((res) => {
        setEmail(res.data.email);
        setName(res.data.name);
        setBoard(res.data.board);
        setClass(res.data.class);
        setMedium(res.data.medium);
      });
    });
  }, []);

  const handleClose = () => {
    navigate("/");
  };

  const handleLogout = () => {
    axios.get(`${url}/auth/logout`).then((res) => {
      console.log(res.data);
      if (res.data.status) {
        navigate("/login");
      } else {
        console.log(res.data.message);
        alert("Something went wrong");
      }
    });
  };

  const handleEdit = () => {
    setDisabled(!disabled);

    if (!disabled) {
      const data = {
        name: nameChange || name,
        board: boardChange || board,
        class: classChange || class_,
        medium: mediumChange || medium,
        email: email,
      };

      axios.patch(`${url}/auth/update`, data).then((res) => {
        console.log(res.data.data);
        if (res.data.status) {
          setName(res.data.data.name);
          setBoard(res.data.data.board);
          setClass(res.data.data.class);
          setMedium(res.data.data.medium);
        } else {
          console.log(res.data.message);
          alert("Something went wrong");
        }
      });
    }
  };

  return (
    <div className="profileContainer">
      <div className="closeB" data-bs-theme="dark">
        <button
          type="button"
          className="btn-close closeB"
          onClick={handleClose}
        ></button>
      </div>
      <div className="profile">
        <div className="imageContainer">
          <img src="/person.png" alt="demo profile image" />
          <div className="mb-3">
            <input
              className="form-control form-control-sm "
              id="formFileSm"
              type="file"
            />
          </div>
        </div>
        <div className="d-flex vL">
          <div className="vr"></div>
        </div>
        <div className="textContainer">
          <div className="heading">
            <h1 className="h21">Profile</h1>
          </div>
          <div className="inputField">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control "
              type="text"
              placeholder={name}
              disabled={disabled}
              onChange={(e) => setNameChange(e.target.value)}
            ></input>
          </div>
          <div className="inputField">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="text"
              placeholder={email}
              disabled
            ></input>
          </div>

          <div className="inputField">
            <label>Class:</label>
            {disabled && (
              <input
                className="form-control"
                type="text"
                placeholder={class_}
                disabled
              ></input>
            )}
            {!disabled && (
              <select
                className="form-select"
                onChange={(e) => setClassChange(e.target.value)}
                defaultValue={class_}
              >
                <option value={11}>11</option>
                <option value={12}>12</option>
              </select>
            )}
          </div>

          <div className="inputField">
            <label>Board:</label>
            {disabled && (
              <input
                className="form-control"
                type="text"
                placeholder={board}
                disabled
              ></input>
            )}
            {!disabled && (
              <select
                className="form-select"
                onChange={(e) => setBoardChange(e.target.value)}
                defaultValue={board}
              >
                <option value="cbse">Cbse</option>
                <option value="rbse">Rbse</option>
              </select>
            )}
          </div>

          <div className="inputField">
            <label>Medium:</label>
            {disabled && (
              <input
                className="form-control"
                type="text"
                placeholder={medium}
                disabled
              ></input>
            )}
            {!disabled && (
              <select
                className="form-select"
                onChange={(e) => setMediumChange(e.target.value)}
                defaultValue={medium}
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
            )}
          </div>

          <div className="buttonContainer">
            <button className="btn btn-primary" onClick={() => handleEdit()}>
              {disabled == true ? "Edit" : "Save"}
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleLogout()}
            >
              Logout?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
