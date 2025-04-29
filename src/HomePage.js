import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './HomePage.css';

const HomePage = () => {
  const [hostels, setHostels] = useState(['']);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hostelType, setHostelType] = useState('');
  const [file, setFile] = useState(null);

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle adding new hostels
  const handleAddHostel = () => {
    setHostels([...hostels, '']);
  };

  // Handle hostel name change
  const handleHostelChange = (index, value) => {
    const updatedHostels = [...hostels];
    updatedHostels[index] = value;
    setHostels(updatedHostels);
  };

  // Generate duty (this should integrate with your backend)
  const handleGenerateDuty = () => {
    if (!month || !year || !hostelType || hostels.some((hostel) => !hostel)) {
      alert('Please fill all the fields correctly!');
      return;
    }
    console.log('Generating duty...');
    // Here you would send the data to your backend (e.g., an API call)
  };

  // Download the duty sheet (this will be mocked for now)
  const handleDownloadExcel = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const ws = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(ws);
        console.log('Excel Data:', jsonData);
        // You can modify and export back to Excel here
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="container">
      <h1>Duty Assignment System</h1>

      <div className="form-group">
        <label>Hostels</label>
        {hostels.map((hostel, index) => (
          <div key={index} className="hostel-input">
            <input
              type="text"
              placeholder="Enter Hostel"
              value={hostel}
              onChange={(e) => handleHostelChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddHostel} className="add-hostel-btn">
          Add Hostel
        </button>
      </div>

      <div className="form-group">
        <label>Month</label>
        <input
          type="text"
          placeholder="Enter Month (MM)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Year</label>
        <input
          type="text"
          placeholder="Enter Year (YYYY)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Hostel Type</label>
        <input
          type="text"
          placeholder="Enter Hostel Type"
          value={hostelType}
          onChange={(e) => setHostelType(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Upload Excel File</label>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>

      <div className="button-group">
        <button onClick={handleGenerateDuty} className="generate-btn">
          Generate Duty
        </button>
        <button onClick={handleDownloadExcel} className="download-btn">
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default HomePage;
