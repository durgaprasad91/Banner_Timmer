import React, { useState, useEffect } from 'react';
import Banner from './components/banner';
import Dashboard from './components/dashboard';
import './App.css';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(10);
  const [link, setLink] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchBannerData();
  }, [refreshKey]);

  const fetchBannerData = () => {
    fetch('http://localhost:3001/api/banner')
      .then(response => response.json())
      .then(data => {
        if (data) {
          setDescription(data.description);
          setTimer(data.timer);
          setLink(data.link);
          setIsVisible(true);
        }
      })
      .catch(error => console.error('Error fetching banner data:', error));
  };

  const handleToggleBanner = () => {
    setIsVisible(prevState => !prevState);
  };

  const handleUpdateBanner = (newDescription, newTimer, newLink) => {
    fetch('http://localhost:3001/api/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newDescription, timer: newTimer, link: newLink }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Banner updated:', data);
        setRefreshKey(prevKey => prevKey + 1);
      })
      .catch(error => console.error('Error updating banner:', error));
  };

  return (
    <div className="app">
      {isVisible && (
        <Banner
          description={description}
          timer={timer}
          link={link}
          onComplete={() => setIsVisible(false)}
        />
      )}
      <Dashboard
        onToggleBanner={handleToggleBanner}
        onUpdateBanner={handleUpdateBanner}
        description={description}
        timer={timer}
        link={link}
        isVisible={isVisible} 
      />
    </div>
  );
};

export default App;
