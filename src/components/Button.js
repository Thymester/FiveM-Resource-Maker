import React from 'react';
import './Button.css';

const Button = ({ onClick, label }) => {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="create-button" onClick={handleButtonClick}>
      {label}
    </button>
  );
};

export default Button;
