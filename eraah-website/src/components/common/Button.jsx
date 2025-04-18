import React from 'react';
import './Button.scss'; // Assuming you will create a separate SCSS file for button styles

const Button = ({ label, onClick, type = 'button', className = '' }) => {
    return (
        <button 
            type={type} 
            className={`eraah-button ${className}`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;