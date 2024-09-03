import React from 'react';

const WhyChooseUsSection = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="flex justify-between items-center">
          <div className="w-1/2 pr-8">
            <h3 className="text-2xl font-semibold mb-4">Expert Team</h3>
            <p className="text-gray-600 mb-6">
              Our team of experienced professionals brings a wealth of knowledge and expertise to every project.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Innovative Solutions</h3>
            <p className="text-gray-600 mb-6">
              We stay at the forefront of technology to deliver cutting-edge solutions for our clients.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Client-Focused Approach</h3>
            <p className="text-gray-600">
              Your success is our priority. We work closely with you to understand and meet your unique needs.
            </p>
          </div>
          <div className="w-1/2">
            <img src="/api/placeholder/600/400" alt="Team meeting" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;