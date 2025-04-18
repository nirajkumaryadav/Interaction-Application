import React from 'react';
import './Testimonials.scss';

const testimonialsData = [
  {
    name: "John Doe",
    position: "Director, NGO",
    feedback: "Eraah's AI tools have transformed the way we generate reports. Highly recommend!",
  },
  {
    name: "Jane Smith",
    position: "Project Manager, Charity",
    feedback: "The AI-powered solutions provided by Eraah have significantly improved our efficiency.",
  },
  {
    name: "Emily Johnson",
    position: "Founder, Non-Profit",
    feedback: "Thanks to Eraah, we can focus more on our mission and less on administrative tasks.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>User Testimonials</h2>
      <div className="testimonial-list">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="feedback">"{testimonial.feedback}"</p>
            <h3 className="name">{testimonial.name}</h3>
            <p className="position">{testimonial.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;