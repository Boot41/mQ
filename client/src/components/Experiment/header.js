import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleHeaderClick = (section) => {
    navigate(`/${section}`);
    setActiveSection(section);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setActiveSection('home');
  };

  const handleMouseEnter = (section) => {
    setActiveSection(section);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!document.querySelector('#header-content:hover') && !document.querySelector('#dropdown-content:hover')) {
        setIsOpen(false);
        setActiveSection(null);
      }
    }, 100);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('#header-content') && !e.target.closest('#dropdown-content')) {
        setIsOpen(false);
        setActiveSection(null);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'about-us':
        return (
          <div id="about" className="flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-4">
            <h2 className="text-xl font-bold mb-2">About Us</h2>
            <div className="space-y-2">
              {[
                { title: 'T41 Advantage', description: 'Discover what sets us apart.' },
                { title: 'Mission and Vision', description: 'Understand our mission and vision.' },
                { title: 'Our Approach', description: 'Learn about our approach to innovation.' },
                { title: 'Impact', description: 'See the impact of our work.' },
                { title: 'Founders', description: 'Meet our founders and their story.' }
              ].map(({ title, description }) => (
                <div key={title} className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                  <h4 className="text-md font-semibold">{title}</h4>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div id="services" className="flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-4">
            <h2 className="text-xl font-bold mb-2">Our Services</h2>
            <div className="space-y-2">
              {[
                { title: 'Capabilities', description: 'Discover our capabilities and benefits.' },
                { title: 'Partnership', description: 'Learn about partnership opportunities.' }
              ].map(({ title, description }) => (
                <div key={title} className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                  <h4 className="text-md font-semibold">{title}</h4>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'careers':
        return (
          <div id="careers" className="flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-4">
            <h2 className="text-xl font-bold mb-2">Careers</h2>
            <div className="space-y-2">
              {[
                { title: 'Why Us', description: 'Why you should consider working with us.' },
                { title: 'Life at Think 41', description: 'What to expect working here.' },
                { title: 'Boot41', description: 'Our training programs.' },
                { title: 'Testimonials', description: 'Hear from our employees.' },
                { title: 'Open Positions', description: 'Current job openings.' }
              ].map(({ title, description }) => (
                <div key={title} className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                  <h4 className="text-md font-semibold">{title}</h4>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'visualizing-ai':
        return (
          <div id="visualizing-ai" className="flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-4">
            <h2 className="text-xl font-bold mb-2">Visualizing AI</h2>
            <div className="space-y-2">
              {[
                { title: 'Our Secret Sauce', description: 'What makes our AI unique.' },
                { title: 'Recruit 41', description: 'How we recruit talent.' },
                { title: 'CQ', description: 'Customer Quotient insights.' },
                { title: 'RQ', description: 'Recruitment Quotient insights.' }
              ].map(({ title, description }) => (
                <div key={title} className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                  <h4 className="text-md font-semibold">{title}</h4>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-20 py-4 px-8 border-b border-gray-200 bg-white`}
        id="header-content"
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-between items-center">
          <div
            className="text-orange-500 font-bold text-xl cursor-pointer"
            onClick={handleLogoClick}
          >
            THINK 41
          </div>
          <nav className="flex space-x-6 items-center">
            <div className="relative flex space-x-6">
              {['about-us', 'visualizing-ai', 'careers'].map((section) => (
                <div
                  key={section}
                  onMouseEnter={() => handleMouseEnter(section)}
                >
                  <Link
                    to={`/${section}`}
                    className="text-black hover:text-black hover:underline"
                    onClick={() => handleHeaderClick(section)}
                  >
                    {section.replace('-', ' ').toUpperCase()}
                  </Link>
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
      {isOpen && (
        <div
          id="dropdown-content"
          className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4"
          style={{ zIndex: 10 }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={handleMouseLeave}
        >
          {renderContent()}
        </div>
      )}
    </>
  );
};

export default Header;
