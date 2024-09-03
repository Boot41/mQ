import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-xl text-white">Think 41</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/about-us" className="text-white hover:text-blue-300">About Us</Link>
          <Link to="/services" className="text-white hover:text-blue-300">Services</Link>
          <Link to="/insights" className="text-white hover:text-blue-300">Insights</Link>
          <Link to="/careers" className="text-white hover:text-blue-300">Careers</Link>
          <Link to="/contact" className="text-white hover:text-blue-300">Contact Us</Link>
        </div>
        <button className="bg-transparent text-white px-4 py-2 rounded-full text-sm">Experience Center</button>
      </nav>
    </header>
  );
};

export default Header;
