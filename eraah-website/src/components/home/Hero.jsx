import React from 'react';
import './Hero.scss'; // Assuming you will create a Hero.scss for styling

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Empowering NGOs with AI</h1>
                <p className="hero-description">
                    Discover how Eraah's AI-powered tools can transform your organization's impact.
                </p>
                <button className="hero-button">Get Started</button>
            </div>
        </div>
    );
};

export default Hero;