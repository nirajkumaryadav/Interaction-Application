import React from 'react';
import ServiceCard from './ServiceCard';

const servicesData = [
  {
    id: 1,
    title: 'AI-Powered Report Generation',
    description: 'Automate your reporting process with our intelligent report generation tool.',
  },
  {
    id: 2,
    title: 'Data Analysis and Insights',
    description: 'Leverage AI to analyze data and gain actionable insights for your NGO.',
  },
  {
    id: 3,
    title: 'Custom AI Solutions',
    description: 'Get tailored AI solutions designed specifically for your organization’s needs.',
  },
  {
    id: 4,
    title: 'Training and Support',
    description: 'Receive comprehensive training and ongoing support for all our AI tools.',
  },
];

const ServiceList = () => {
  return (
    <div className="service-list">
      {servicesData.map(service => (
        <ServiceCard key={service.id} title={service.title} description={service.description} />
      ))}
    </div>
  );
};

export default ServiceList;