import React from 'react';
import './Button.css';

const Button = ({ onClick }) => {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="create-button" onClick={handleButtonClick}>
      Create __resource.lua
    </button>
  );
};

export default Button;
