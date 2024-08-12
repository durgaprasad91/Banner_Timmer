import React, { useState } from 'react';

const Dashboard = ({ onToggleBanner, onUpdateBanner, description, timer, link, isVisible }) => {
  const [newDescription, setNewDescription] = useState(description);
  const [newTimer, setNewTimer] = useState(timer);
  const [newLink, setNewLink] = useState(link);

  const handleUpdate = () => {
    onUpdateBanner(newDescription, newTimer, newLink);
  };

  return (
    <div className="dashboard">
      <h2>Banner Dashboard</h2>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Timer (seconds):</label>
        <input
          type="number"
          value={newTimer}
          onChange={(e) => setNewTimer(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="form-group">
        <label>Link:</label>
        <input
          type="text"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update Banner</button>
      <button
        onClick={onToggleBanner}
        className={isVisible ? 'on-button' : 'off-button'}
      >
        {isVisible ? 'On' : 'Off'}
      </button>
    </div>
  );
};

export default Dashboard;
