import React, { useState } from "react";
import axios from "axios";
import "./uploadNcert.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const FileUploaderNcert = ({ url }) => {
  const [file, setFile] = useState(null);
  const [chapter, setChapter] = useState();
  const [class_, setClass] = useState();
  const [title, setTitle] = useState();
  const [medium, setMedium] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleText = (e) => {
    setChapter(e.target.value);
  };

  const handleClass = (e) => {
    setClass(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleMedium = (e) => {
    setMedium(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chapter", chapter);
      formData.append("class", class_);
      formData.append("title", title);
      formData.append("medium", medium);

      await axios.post(`${url}/upload/ncert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.log("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="ncertUploadContainer">
      <h2>Upload Ncert book</h2>
      <div className="mb-3">
        <input
          className="form-control form-control-sm "
          id="formFileSm"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <input
        className="form-control"
        type="number"
        placeholder="Chapter number"
        onChange={handleText}
        style={{ width: "fit-content" }}
      />
      <label>
        <input
          type="radio"
          name="class"
          value={11}
          onChange={handleClass}
          required
        />
        Class 11
      </label>
      <label>
        <input
          type="radio"
          name="class"
          value={12}
          onChange={handleClass}
          required
        />
        Class 12
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Chapter Name"
        style={{ width: "fit-content" }}
        onChange={handleTitle}
      />

      <label>
        <input
          type="radio"
          name="medium"
          value="hindi"
          onChange={handleMedium}
          required
        />
        Hindi
      </label>
      <label>
        <input
          type="radio"
          name="medium"
          value="english"
          onChange={handleMedium}
          required
        />
        English
      </label>
      <button
        onClick={handleUpload}
        disabled={!file}
        className="btn btn-primary"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUploaderNcert;
