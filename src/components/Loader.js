import React from 'react';
import '../styles/Loader.css';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className={`loader ${size}`}>
        <div className="loader-spinner"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
