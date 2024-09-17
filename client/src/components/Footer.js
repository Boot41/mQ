import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0C0E] text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* We are here */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold text-orange-500 mb-3">We are here</h3>
            <address className="text-sm text-gray-300 not-italic">
              <p>2nd Floor, Obeya Gusto</p>
              <p>367, 5th Main Rd,</p>
              <p>Sector 6 HSR Layout,</p>
              <p>Bengaluru,</p>
              <p>Karnataka 560102</p>
            </address>
          </div>

          {/* Pages */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-orange-500 mb-3">Pages</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Visualise AI</a></li>
            </ul>
          </div>

          {/* Demos */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-orange-500 mb-3">Demos</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors">R41</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">RQ</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">CQ</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Visualise AI</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold text-orange-500 mb-3">Connect with us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="hover:text-orange-500 transition-colors">
                <Linkedin className="text-orange-500" size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-orange-500 transition-colors">
                <Instagram className="text-orange-500" size={24} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-orange-500 transition-colors">
                <Facebook className="text-orange-500" size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
                {/* Bottom Section */}
                <div className="mt-8 border-t border-gray-800 pt-6 text-center sm:text-left">
          <p className="text-sm text-gray-400">
            &copy; 2024 Apply. All rights reserved. <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

