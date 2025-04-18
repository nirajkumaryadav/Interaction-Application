import React from 'react';
import './ServiceCard.scss'; // Assuming you will create a corresponding SCSS file for styles

const ServiceCard = ({ title, description, icon }) => {
    return (
        <div className="service-card">
            <div className="service-icon">
                <img src={icon} alt={`${title} icon`} />
            </div>
            <h3 className="service-title">{title}</h3>
            <p className="service-description">{description}</p>
        </div>
    );
};

export default ServiceCard;