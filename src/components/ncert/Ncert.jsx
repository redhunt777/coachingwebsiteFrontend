import "./ncert.scss";
import { Navbar } from "../navBar/navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Ncert = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${url}/auth/verify`).then((res) => {
      if (!res.data.status) {
        navigate("/login");
      }
      axios.get(`${url}/auth/data`).then((res) => {
        if (res.data.class === 11 && res.data.medium === "english") {
          axios.get(`${url}/ncert/english/11`).then((res) => {
            setData(res.data);
          });
        } else if (res.data.class === 12 && res.data.medium === "english") {
          axios.get(`${url}/ncert/english/12`).then((res) => {
            setData(res.data);
          });
        } else if (res.data.class === 11 && res.data.medium === "hindi") {
          axios.get(`${url}/ncert/hindi/11`).then((res) => {
            setData(res.data);
          });
        } else if (res.data.class === 12 && res.data.medium === "hindi") {
          axios.get(`${url}/ncert/hindi/12`).then((res) => {
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
    <div className="ncert">
      <Navbar></Navbar>
      <div className="ncertContainer">
        <h1>Physics Ncert Chapter Wise :</h1>
        {data.length === 0 && <h1>Loading...</h1>}
        <div className="ncertChapters">
          {data.map((chapter) => {
            return (
              <div key={chapter.fileName} className="chapter">
                <h3>Chapter {chapter.chapter}</h3>
                <h4>{chapter.title}</h4>
                <div style={{ width: "fit-content" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDownload(chapter.fileName)}
                  >
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
