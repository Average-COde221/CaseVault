import React, { useState, useEffect } from "react";
import { BsFillGrid3X3GapFill, BsFillBellFill } from "react-icons/bs";
import axios from "axios";

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [documentCount, setDocumentCount] = useState(0);
  const [recentDocuments, setRecentDocuments] = useState([]);

  // Fetch all documents and count on component load
  useEffect(() => {
    fetchDocuments();
    fetchDocumentCount();
    fetchRecentDocuments();
  }, []);

  // Fetch all documents
  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  // Fetch document count
  const fetchDocumentCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/documents/count"
      );
      setDocumentCount(response.data.count);
    } catch (error) {
      console.error("Error fetching document count:", error);
    }
  };

  // Fetch recent documents
  const fetchRecentDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/documents/recent"
      );
      setRecentDocuments(response.data);
    } catch (error) {
      console.error("Error fetching recent documents:", error);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setDocuments((prev) => [response.data, ...prev]);
      setDocumentCount((prev) => prev + 1);
      fetchRecentDocuments(); // Update recent documents
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <main className="main-container">
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Book Management</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>0</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Analytics/Reports</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>0</h1>
        </div>
      </div>
      
      <div className="container mt-5">

        {/* Document Statistics */}
        <div className="mt-4">
          <h2>Total Documents: {documentCount}</h2>
        </div>

        {/* Recent Documents */}
        <div className="mt-4">
          <h2>Recently Added Documents:</h2>
          <ul>
            {recentDocuments.map((doc) => (
              <li key={doc._id}>
                {doc.name} - {doc.type} ({(doc.size / 1024).toFixed(2)} KB) -
                Uploaded on: {new Date(doc.uploadDate).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>

        {/* Document List */}
        <div className="mt-4">
          <h2>All Uploaded Documents:</h2>
          <ul>
            {documents.map((doc) => (
              <li key={doc._id}>
                {doc.name} - {doc.type} ({(doc.size / 1024).toFixed(2)} KB) -
                Uploaded on: {new Date(doc.uploadDate).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>         
    </main>
  );
};

export default Home;
