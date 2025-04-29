import React, { useState } from 'react';
import HomePage from './HomePage';
import UploadPage from './UploadPage';
import ReportPage from './ReportPage';
import SettingPage from './SettingPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      <div className="main-box">
        <div className="tab-bar">
          <button
            className={`tab-button ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Faculty Data
          </button>
          <button
            className={`tab-button ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            Report
          </button>
          <button
            className={`tab-button ${activeTab === 'setting' ? 'active' : ''}`}
            onClick={() => setActiveTab('setting')}
          >
            Setting
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'upload' && <UploadPage />}
          {activeTab === 'report' && <ReportPage />}
          {activeTab === 'setting' && <SettingPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
