import "./pyqs.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../navBar/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const Pyqs = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${url}/auth/verify`).then((res) => {
      if (!res.data.status) {
        navigate("/login");
      }
      axios.get(`${url}/auth/data`).then((res) => {
        if (
          res.data.class === 11 &&
          res.data.medium === "english" &&
          res.data.board === "rbse"
        ) {
          axios.get(`${url}/pyqs/rbse/english/11`).then((res) => {
            setData(res.data);
          });
        } else if (
          res.data.class === 12 &&
          res.data.medium === "english" &&
          res.data.board === "rbse"
        ) {
          axios.get(`${url}/pyqs/rbse/english/12`).then((res) => {
            setData(res.data);
          });
        } else if (
          res.data.class === 11 &&
          res.data.medium === "hindi" &&
          res.data.board === "rbse"
        ) {
          axios.get(`${url}/pyqs/rbse/hindi/11`).then((res) => {
            setData(res.data);
          });
        } else if (
          res.data.class === 12 &&
          res.data.medium === "hindi" &&
          res.data.board === "rbse"
        ) {
          axios.get(`${url}/pyqs/rbse/hindi/12`).then((res) => {
            setData(res.data);
          });
        } else if (res.data.class === 11 && res.data.board === "cbse") {
          axios.get(`${url}/pyqs/cbse/11`).then((res) => {
            setData(res.data);
          });
        } else if (res.data.class === 12 && res.data.board === "cbse") {
          axios.get(`${url}/pyqs/cbse/12`).then((res) => {
            setData(res.data);
          });
        }
      });
    });
  }, []);

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`${url}/files/${fileName}`, {
        responseType: "blob", // Important: responseType 'blob' for binary data
      });

      // Create a blob URL for the file data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url1 = window.URL.createObjectURL(blob);

      // Create a link element and click it to trigger the download
      const a = document.createElement("a");
      a.href = url1;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  return (
    <div className="dashBoard">
      <Navbar></Navbar>

      <h1 className="h11">Pyqs Chapter Wise :</h1>
      {data.length === 0 && <h1 className="h11">Loading...</h1>}

      {data.map((item) => {
        return (
          <div key={item.chapter} className="container">
            <h3>Chapter {item.chapter}</h3>
            <h4>{item.title}</h4>
            <button
              className="btn btn-primary"
              onClick={() => handleDownload(item.fileName)}
            >
              Download
            </button>
          </div>
        );
      })}
    </div>
  );
};
