import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HomePage.css';

const HomePage = () => {
    const [hostels, setHostels] = useState(['Group 1']);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
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
        if (!startDate || !endDate || hostels.some((h) => !h)) {
            alert('Please fill all fields.');
            return;
        }
        const formatDateToYMD = (date) => {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        };

        const dutyData = {
            hostels,
            startDate: formatDateToYMD(startDate), // e.g., '2025-05-01'
            endDate: formatDateToYMD(endDate),
            hostelType,
        };


        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/duty/assign_duty`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dutyData),
            });

            if (!response.ok) throw new Error('Failed to generate duty file');

            const contentType = response.headers.get('Content-Type');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const extension = contentType === 'application/zip' ? 'zip' : 'xlsx';
            const filename = `DutySheet_${startDate.toISOString().slice(0, 10)}_to_${endDate.toISOString().slice(0, 10)}.${extension}`;

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert('Error downloading duty file');
        }
    };

    return (
        <div className="container">
            <h1>Duty Assignment System</h1>

            {/* <div className="form-group">
                <label>Groups</label>
                {hostels.map((hostel, index) => (
                    <div key={index} className="hostel-input">
                        <input
                            type="text"
                            value={hostel}
                            onChange={(e) => handleHostelChange(index, e.target.value)}
                        />
                        <button onClick={handleAddHostel} className="add-hostel-btn">
                            <i className="fas fa-plus"></i>
                        </button>
                        {index !== 0 && (
                            <button className="delete-btn" onClick={() => handleRemoveHostel(index)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        )}
                    </div>
                ))}
            </div> */}

            <div className="form-row">
                <div className="form-group half-width">
                    <label>Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="custom-select"
                        placeholderText="Select Start Date"
                    />
                </div>

                <div className="form-group half-width">
                    <label>End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="custom-select"
                        placeholderText="Select End Date"
                        minDate={startDate}
                    />
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
