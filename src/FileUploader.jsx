// FileUploader.jsx
import React from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from './firebaseConfig'; // Adjust the import path as necessary

const FileUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onUpload(file);
  };

  return (
    <input type="file" onChange={handleFileChange} />
  );
};

export default FileUploader;
