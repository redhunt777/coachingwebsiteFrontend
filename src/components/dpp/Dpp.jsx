import "./Dpp.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navBar/navbar";

export const Dpp = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const verifyRes = await axios.get(`${url}/auth/verify`);
        if (!verifyRes.data.status) {
          setLoading(false);
          navigate("/login");
          return;
        }
        const { class: userClass, medium, board } = verifyRes.data;

        let endpoint = "";

        if (board === "rbse") {
          if (userClass === 11) {
            endpoint =
              medium === "english"
                ? "/dpp/rbse/english/11"
                : "/dpp/rbse/hindi/11";
          } else if (userClass === 12) {
            endpoint =
              medium === "english"
                ? "/dpp/rbse/english/12"
                : "/dpp/rbse/hindi/12";
          }
        } else if (board === "cbse") {
          endpoint = userClass === 11 ? "/dpp/cbse/11" : "/dpp/cbse/12";
        }

        if (endpoint) {
          const dppRes = await axios.get(`${url}${endpoint}`);
          setLoading(false);
          setData(dppRes.data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDownload = async (fileName) => {
    try {
      alert("Downloading file...");
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
      <Navbar url={url}> </Navbar>

      {loading ? (
        <div className="loader">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h1 className="h112">Dpp Chapter Wise :</h1>

          {data.length === 0 && (
            <h1 className="h112">
              There is no content uploaded yet, to display here.
            </h1>
          )}

          {data.map((item) => (
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
          ))}
        </>
      )}
    </div>
  );
};
