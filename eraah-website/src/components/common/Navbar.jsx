import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'; // Assuming you will create a separate SCSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/">Eraah</Link>
            </div>
            <ul className="navbar__links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;