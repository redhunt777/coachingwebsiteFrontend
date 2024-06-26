import "./Mainsection.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";

export const MainSection = ({
  chapNum,
  chapName,
  content,
  img_name,
  fileName,
  url1,
}) => {
  const handleDownload = async (fileName) => {
    try {
      alert("Downloading file...");
      const response = await axios.get(`${url1}/files/${fileName}`, {
        responseType: "blob", // Important: responseType 'blob' for binary data
      });

      // Create a blob URL for the file data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click it to trigger the download
      const a = document.createElement("a");
      a.href = url;
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
    <div className="main">
      <div className="imageContainer">
        <img src={img_name} className="object-fit-cover" alt="img" />
      </div>
      <div className="textContainer">
        <h1>Chapter {chapNum}</h1>
        <h2>{chapName}</h2>
        <p>{content}</p>
        <div>
          <button
            className="btn btn-outline-light"
            onClick={() => handleDownload(fileName)}
          >
            Download now
          </button>
        </div>
      </div>
    </div>
  );
};
