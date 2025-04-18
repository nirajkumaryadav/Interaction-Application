import React from 'react';
import './Features.scss'; // Assuming you will create a corresponding SCSS file for styles

const featuresData = [
    {
        title: 'AI-Powered Insights',
        description: 'Leverage advanced AI algorithms to gain actionable insights from your data.',
        icon: '🔍', // Placeholder for an icon
    },
    {
        title: 'Automated Reporting',
        description: 'Generate comprehensive reports automatically, saving time and resources.',
        icon: '📊', // Placeholder for an icon
    },
    {
        title: 'Customizable Solutions',
        description: 'Tailor our AI tools to meet the specific needs of your organization.',
        icon: '⚙️', // Placeholder for an icon
    },
];

const Features = () => {
    return (
        <section className="features">
            <h2 className="features__title">Our Features</h2>
            <div className="features__list">
                {featuresData.map((feature, index) => (
                    <div key={index} className="features__item">
                        <div className="features__icon">{feature.icon}</div>
                        <h3 className="features__item-title">{feature.title}</h3>
                        <p className="features__item-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;