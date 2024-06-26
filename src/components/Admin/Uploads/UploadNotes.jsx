import React, { useState } from "react";
import axios from "axios";
import "./uploadNcert.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const FileUploaderNotes = ({ url }) => {
  const [file, setFile] = useState(null);
  const [chapter, setChapter] = useState();
  const [class_, setClass] = useState();
  const [title, setTitle] = useState();
  const [medium, setMedium] = useState();
  const [board, setBoard] = useState();
  const [content, setContent] = useState();
  const [img_name, setImg_name] = useState();

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

  const handleBoard = (e) => {
    setBoard(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleImg_name = (e) => {
    setImg_name(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chapter", chapter);
      formData.append("class", class_);
      formData.append("title", title);
      formData.append("medium", medium);
      formData.append("board", board);
      formData.append("content", content);
      formData.append("img_name", img_name);

      await axios.post(`${url}/upload/notes`, formData, {
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
      <h2>Upload Notes</h2>
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
      <label>Choose Class:</label>
      <label>
        <input
          type="radio"
          name="class"
          value={11}
          onChange={handleClass}
          required
          className="form-check-input"
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
          className="form-check-input"
        />
        Class 12
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Chapter Name"
        onChange={handleTitle}
        style={{ width: "fit-content" }}
      />
      <label>Choose Medium:</label>
      <label>
        <input
          type="radio"
          name="medium"
          value="hindi"
          onChange={handleMedium}
          className="form-check-input"
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
          className="form-check-input"
          required
        />
        English
      </label>
      <label>Choose Board:</label>
      <label>
        <input
          type="radio"
          name="board"
          value="cbse"
          onChange={handleBoard}
          className="form-check-input"
          required
        />
        CBSE
      </label>
      <label>
        <input
          type="radio"
          name="board"
          value="rbse"
          onChange={handleBoard}
          className="form-check-input"
          required
        />
        RBSE
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Content"
        onChange={handleContent}
        style={{ width: "fit-content" }}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Image name"
        onChange={handleImg_name}
        style={{ width: "fit-content" }}
      />
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

export default FileUploaderNotes;
