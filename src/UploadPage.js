import React, { useState } from 'react';
import './UploadPage.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [action, setAction] = useState(''); // Track selected action

  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) setFile(uploaded);
  };

  const handleUploadExcel = async () => {
    if (!file) {
      alert('Please upload an Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);  // Change 'file' to 'excelFile'

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/upload/add_employee`, {
        method: 'POST',
        body: formData,  // Send the file as FormData
      });

      if (res.ok) {
        alert('Faculty data uploaded successfully!');
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file.');
    }
  };

  const handleActionChange = (e) => {
    setAction(e.target.value); // Update the selected action
  };

  const getSampleFileLink = () => {
    // Map actions to their sample file download links
    switch (action) {
      case 'add':
        return process.env.PUBLIC_URL + '/add_faculty_sample.xlsx'; // Using PUBLIC_URL to get the correct path from the public folder
      case 'delete':
        return process.env.PUBLIC_URL + '/delete_faculty_sample.xlsx';
      case 'leave':
        return process.env.PUBLIC_URL + '/leave_sample.xlsx';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1>Upload Faculty Data</h1>

      <div className="form-group">
        <label>Action</label>
        <select value={action} onChange={handleActionChange} className="custom-select">
          <option value="">Select Action</option>
          <option value="add">Add Faculty</option>
          <option value="delete">Delete Faculty</option>
          <option value="leave">Leave</option>
        </select>
      </div>

      {action && (
        <div className="form-group">
          <a href={getSampleFileLink()} download className="sample-link">
            Download Sample Excel for {action === 'add' ? 'Add Faculty' : action === 'delete' ? 'Delete Faculty' : 'Leave'}
          </a>
        </div>
      )}

      <div className="form-group">
        <label>Upload Excel File</label>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      </div>

      <div className="button-group">
        <button onClick={handleUploadExcel} className="upload-btn">
          Upload Faculty Data
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
