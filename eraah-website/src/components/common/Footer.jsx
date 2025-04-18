import React from 'react';
import './Footer.scss'; // Assuming you have a separate SCSS file for footer styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Eraah. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://twitter.com/eraah" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://linkedin.com/company/eraah" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com/eraah" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;