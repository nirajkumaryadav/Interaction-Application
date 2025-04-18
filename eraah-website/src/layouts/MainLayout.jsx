import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './MainLayout.scss'; // Assuming you have a separate SCSS file for layout styles

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;