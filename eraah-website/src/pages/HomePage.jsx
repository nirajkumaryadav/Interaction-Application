import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import MainLayout from '../layouts/MainLayout';

const HomePage = () => {
    return (
        <MainLayout>
            <Hero />
            <Features />
            <Testimonials />
        </MainLayout>
    );
};

export default HomePage;