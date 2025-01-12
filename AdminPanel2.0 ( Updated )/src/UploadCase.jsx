import React, { useState } from "react";
import { Document, Page, pdfjs } from "@react-pdf-viewer/core";
import axios from "axios";
import "./UploadCase.css";

// Load pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadCase = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!pdfFile) {
      alert("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("author", event.target.author.value);
    formData.append("description", event.target.description.value);
    formData.append("file", pdfFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading case:", error);
      alert("Failed to upload the case.");
    }
  };

  return (
    <div className="upload-case-container">
      <header className="header">
        <h1>CaseVault</h1>
      </header>
      <div className="form-container">
        <h2>Upload New Case</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Enter title" className="form-input" required />
          <input type="file" className="form-input file-input" onChange={handleFileChange} accept=".pdf" required />
          <input type="text" name="author" placeholder="Enter author details" className="form-input" required />
          <textarea
            name="description"
            placeholder="Enter a brief paragraph about the case"
            className="form-textarea"
            required
          ></textarea>
          <div className="button-group">
            <button type="submit" className="btn publish-btn">
              Publish
            </button>
            <button type="button" className="btn cancel-btn">
              Cancel
            </button>
          </div>
        </form>
        {previewUrl && (
          <div className="pdf-preview">
            <h3>PDF Preview:</h3>
            <Document file={previewUrl}>
              <Page pageNumber={1} />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCase;
