// TableComponent.jsx
import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from './firebaseConfig'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs } from "firebase/firestore"; // Import Firestore functions
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Auth

const TableComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [composer, setComposer] = useState('');
  const [date, setDate] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch uploaded files' metadata from Firestore
    const fetchFiles = async () => {
      const querySnapshot = await getDocs(collection(db, 'files'));
      const filesList = querySnapshot.docs.map(doc => doc.data());
      setFiles(filesList);
    };

    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const storageRef = ref(storage, `uploads/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle progress, success, and errors
        console.log(snapshot);
      }, 
      (error) => {
        console.error('Upload failed:', error);
      }, 
      async () => {
        const fileURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at:', fileURL);

        // Store metadata in Firestore
        try {
          await addDoc(collection(db, 'files'), {
            name,
            id,
            composer,
            date,
            fileURL
          });
          console.log('Document successfully written!');
        } catch (e) {
          console.error('Error adding document: ', e);
        }

        // Optionally, navigate back to the login page or another component
        navigate('/');
      }
    );
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} required />
      <input type="text" placeholder="Composer" value={composer} onChange={(e) => setComposer(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="file" onChange={handleFileChange} required />
      <button onClick={handleUpload}>Upload File</button>
      <div>
        <h3>Uploaded Files</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <p>Name: {file.name}</p>
              <p>ID: {file.id}</p>
              <p>Composer: {file.composer}</p>
              <p>Date: {file.date}</p>
              <a href={file.fileURL} target="_blank" rel="noopener noreferrer">View File</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableComponent;
