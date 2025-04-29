import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [hostels, setHostels] = useState(['Group 1']);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [hostelType, setHostelType] = useState("BOY'S");

    const handleAddHostel = () => setHostels([...hostels, `Group ${hostels.length + 1}`]);
    const handleHostelChange = (index, value) => {
        const updated = [...hostels];
        updated[index] = value;
        setHostels(updated);
    };
    const handleRemoveHostel = (index) => {
        const updated = hostels.filter((_, i) => i !== index);
        setHostels(updated);
    };

    const handleGenerateDuty = async () => {
        if (!month || !year || hostels.some((h) => !h)) {
            alert('Please fill all fields.');
            return;
        }

        const dutyData = { hostels, month, year, hostelType };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/duty/assign_duty`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dutyData),
            });

            if (!response.ok) throw new Error('Failed to generate duty file');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'DutySheet.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert('Error downloading duty file');
        }
    };

    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3];

    return (
        <div className="container">
            <h1>Duty Assignment System</h1>

            <div className="form-group">
                <label>Groups</label>
                {hostels.map((hostel, index) => (
                    <div key={index} className="hostel-input">
                        <input
                            type="text"
                            value={hostel}
                            onChange={(e) => handleHostelChange(index, e.target.value)}
                        />
                        {/* Show the Add button only for the first hostel */}
                        <button onClick={handleAddHostel} className="add-hostel-btn">
                            <i className="fas fa-plus"></i>
                        </button>
                        {/* Show the Delete button for all except the first input */}
                        {index !== 0 && (
                            <button className="delete-btn" onClick={() => handleRemoveHostel(index)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="form-row">
                <div className="form-group half-width">
                    <label>Month</label>
                    <select value={month} onChange={(e) => setMonth(e.target.value)} className="custom-select">
                        <option value="">Select Month</option>
                        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((val, i) => (
                            <option key={val} value={val}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group half-width">
                    <label>Year</label>
                    <select value={year} onChange={(e) => setYear(e.target.value)} className="custom-select">
                        <option value="">Select Year</option>
                        {years.map((yr) => (
                            <option key={yr} value={yr}>{yr}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group half-width">
                    <label>Type</label>
                    <select value={hostelType} onChange={(e) => setHostelType(e.target.value)} className="custom-select">
                        <option value="BOY'S">BOY'S</option>
                        <option value="GIRL'S">GIRL'S</option>
                    </select>
                </div>
            </div>

            <div className="button-group">
                <button onClick={handleGenerateDuty} className="generate-btn">
                    Generate Duty
                </button>
            </div>
        </div>
    );
};

export default HomePage;
