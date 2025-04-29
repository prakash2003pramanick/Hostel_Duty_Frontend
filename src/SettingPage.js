import React, { useEffect, useState } from 'react';
import './SettingPage.css';

const SettingPage = () => {
    const [settings, setSettings] = useState({ boysHostel: '', girlsHostel: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/settings`);
                const data = await res.json();
                console.log('Fetched settings:', data);
                setSettings({
                    boysHostel: data.settings.boysHostel || 12,
                    girlsHostel: data.settings.girlsHostel || 5,
                });
            } catch (err) {
                setSettings({
                    boysHostel: 12,
                    girlsHostel: 5,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/settings`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                alert('Settings updated successfully!');
            } else {
                alert('Failed to update settings.');
            }
        } catch (err) {
            console.error('Error updating settings:', err);
            alert('Error updating settings.');
        }
    };

    const preventScroll = (e) => e.target.blur();

    return (
        <div className="container">
            <h1>Hostel Settings</h1>

            {loading ? (
                <p>Loading settings...</p>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="boysHostel">Boys Hostel Groups</label>
                        <input
                            type="number"
                            name="boysHostel"
                            value={settings.boysHostel}
                            onChange={handleChange}
                            onWheel={preventScroll}
                            className="custom-select"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="girlsHostel">Girls Hostel Groups</label>
                        <input
                            type="number"
                            name="girlsHostel"
                            value={settings.girlsHostel}
                            onChange={handleChange}
                            onWheel={preventScroll}
                            className="custom-select"
                        />
                    </div>

                    <div className="button-group">
                        <button className="generate-btn" onClick={handleSave}>
                            Save Settings
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SettingPage;
