import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ServiceList from '../components/services/ServiceList';

const ServicesPage = () => {
    return (
        <MainLayout>
            <div className="services-page">
                <h1>Our Services</h1>
                <p>At Eraah, we provide specialized AI solutions tailored for NGOs. Explore our range of services designed to empower your organization.</p>
                <ServiceList />
            </div>
        </MainLayout>
    );
};

export default ServicesPage;