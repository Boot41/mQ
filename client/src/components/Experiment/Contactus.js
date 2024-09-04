import React, { useState } from 'react';
import HeroContact from './Contactushero';
import App from './ContactExp';

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      {/* Hero section */}
      <HeroContact />

      {/* Main contact form section */}
      <div className="flex justify-center items-center mt-10">
        <App />
      </div>
    </div>
  );
};

export default ContactUs;
