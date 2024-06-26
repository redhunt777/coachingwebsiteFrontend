import React, { useState } from "react";
import axios from "axios";

function FileDownload() {
  const [filename, setFilename] = useState("");

  const handleInputChange = (event) => {
    setFilename(event.target.value);
    console.log(filename);
  };

  const handleDownload = async () => {
    try {
      console.log("Downloading file:", filename);
      const response = await axios.get(
        `http://localhost:3000/files/${filename}`,
        {
          responseType: "blob", // Important: responseType 'blob' for binary data
        }
      );
      console.log("Response:", response);

      // Create a blob URL for the file data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click it to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log("File downloaded successfully");
    } catch (error) {
      console.log("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  return (
    <div>
      <h2>Download a File</h2>
      <input
        type="text"
        placeholder="Enter filename"
        value={filename}
        onChange={handleInputChange}
      />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default FileDownload;
