import React, { useState, useEffect } from 'react';
import '../App.css'

const Banner = ({ description, timer, link, onComplete }) => {
  const [countdown, setCountdown] = useState(timer);

  useEffect(() => {
    setCountdown(timer); 
  }, [timer]);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown > 1) {
            return prevCountdown - 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              onComplete(); 
            }, 0);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown, onComplete]);

  return (
    <div className="banner">
      <p>{description}</p>
      <p>Time remaining: {countdown} seconds</p>
      <a href={link}>Click here</a>
    </div>
  );
};

export default Banner;
