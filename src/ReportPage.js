import React, { useState } from 'react';
import './ReportPage.css';

const ReportPage = () => {
  const [empCode, setEmpCode] = useState('');
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/duty/report/${empCode}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setFaculty(data.faculty);
      setError('');
    } catch (err) {
      setError(err.message);
      setFaculty(null);
    }
  };

  return (
    <div className="container">
      <h1>Faculty Duty Report</h1>

      <div className="form-group">
        <label>Employee Code</label>
        <div className="search-row">
          <input
            type="text"
            placeholder="Enter Employee Code"
            value={empCode}
            onChange={(e) => setEmpCode(e.target.value)}
            className="custom-select"
          />
          <button onClick={handleSearch} className="generate-btn">Search</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {faculty && (
        <div className="faculty-info">
          <h3>{faculty.title} {faculty.name}</h3>
          <p><strong>Email:</strong> {faculty.emailId}</p>
          <p><strong>Mobile:</strong> {faculty.mobNo}</p>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {faculty.lastDuty.map((duty, index) => (
                <tr key={index}>
                  <td>{new Date(duty.date).toLocaleDateString()}</td>
                  <td>{duty.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
