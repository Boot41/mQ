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
    setIsOpen(false);
    setActiveSection(null);
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
    <div id="about" className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">
      <div className="md:w-2/3 pl-4">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Subtopics</h3>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Company and Founder History</h4>
            <p className="text-gray-700">Learn about the history of our company and our founder's journey.</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Mission and Vision</h4>
            <p className="text-gray-700">Understand our mission and the vision that drives our goals.</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Team at Boot 41</h4>
            <p className="text-gray-700">Meet the dedicated team behind our innovations.</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">GenAI with T41</h4>
            <p className="text-gray-700">Explore how we are integrating GenAI technology with our solutions.</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 pl-4">
        <h3 className="text-xl font-semibold mb-4">Recent Blog Posts</h3>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
            <img
              src="ai4.jpeg"
              alt="Navigating the Ethical Implications of Gen AI in Business"
              className="w-full h-3/5 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-semibold">Navigating the Ethical Implications of Gen AI in Business</h4>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
            <img
              src="ai1.png"
              alt="The Future of Finance and Risk Management"
              className="w-full h-3/5 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-semibold">The Future of Finance and Risk Management</h4>
          </div>
        </div>
      </div>
    </div>
  );

  case 'services':
    return (
      <div id="services" className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">
        <div className="md:w-2/3 pl-4">
          <h2 className="text-2xl font-bold mb-4">Our Services</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Subtopics</h3>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Capabilities</h4>
              <p className="text-gray-700">Discover the full range of our capabilities and how they can benefit you.</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Partnership</h4>
              <p className="text-gray-700">Learn about our partnership opportunities and how we can collaborate.</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 pl-4">
          <h3 className="text-xl font-semibold mb-4">Recent Blog Posts</h3>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
              <img
                src="ai4.jpeg"
                alt="Navigating the Ethical Implications of Gen AI in Business"
                className="w-full h-3/5 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-semibold">Navigating the Ethical Implications of Gen AI in Business</h4>
            </div>
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
              <img
                src="ai1.png"
                alt="The Future of Finance and Risk Management"
                className="w-full h-3/5 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-semibold">The Future of Finance and Risk Management</h4>
            </div>
          </div>
        </div>
      </div>
    );
  
    case 'insights':
      return (
        <div id="insights" className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">
          <div className="md:w-2/3 pl-4">
            <h2 className="text-2xl font-bold mb-4">Thought Leadership</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Learn More</h3>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">
                  <a href="#podcasts" className="text-blue-500 hover:underline">Podcasts</a>
                </h4>
                <p className="text-gray-700">Explore our thought leadership podcasts and insights.</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">
                  <a href="#blogs" className="text-blue-500 hover:underline">Blogs</a>
                </h4>
                <p className="text-gray-700">Read our latest blog posts on leadership and innovation.</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">
                  <a href="#visualizing-ai" className="text-blue-500 hover:underline">Visualizing AI</a>
                </h4>
                <p className="text-gray-700">Understand how we visualize AI concepts and their applications.</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 pl-4">
            <h3 className="text-xl font-semibold mb-4">Recent Blog Posts</h3>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
                <img
                  src="ai4.jpeg"
                  alt="Navigating the Ethical Implications of Gen AI in Business"
                  className="w-full h-3/5 object-cover rounded-lg mb-2"
                />
                <h4 className="text-sm font-semibold">Navigating the Ethical Implications of Gen AI in Business</h4>
              </div>
              <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
                <img
                  src="ai1.png"
                  alt="The Future of Finance and Risk Management"
                  className="w-full h-3/5 object-cover rounded-lg mb-2"
                />
                <h4 className="text-sm font-semibold">The Future of Finance and Risk Management</h4>
              </div>
            </div>
          </div>
        </div>
      );
    
  case 'Careers':
    return (
    <div id="careers" className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">
      <div className="md:w-2/3 pl-4">
        <h2 className="text-2xl font-bold mb-4">Careers</h2>
        <div className="mb-6">
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Who are we</h4>
            <p className="text-gray-700">About Think 41.</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Life at Think41</h4>
            <p className="text-gray-700">What to expect.</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Boot41</h4>
            <p className="text-gray-700">Our training.</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Work with us</h4>
            <p className="text-gray-700">Get in touch.</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 pl-4">
        <h3 className="text-xl font-semibold mb-4">Recent Blog Posts</h3>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
            <img
              src="static/ai4.jpeg"
              alt="Navigating the Ethical Implications of Gen AI in Business"
              className="w-full h-3/5 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-semibold">Navigating the Ethical Implications of Gen AI in Business</h4>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
            <img
              src="static/ai1.png"
              alt="The Future of Finance and Risk Management"
              className="w-full h-3/5 object-cover rounded-lg mb-2"
            />
            <h4 className="text-sm font-semibold">The Future of Finance and Risk Management</h4>
          </div>
        </div>
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
        className={`absolute top-0 left-0 w-full z-20 py-4 px-8 border-b border-gray-200 transition-all duration-300 ${isOpen ? 'bg-white shadow-lg' : 'bg-transparent'}`}
        id="header-content"
      >
        <div className="flex justify-between items-center">
          <div
            className="text-orange-500 font-bold text-xl cursor-pointer"
            onClick={handleLogoClick}
          >
            THINK 41
          </div>
          <nav className="flex space-x-6">
            <div className="relative group flex space-x-6">
              {['about-us', 'services', 'insights', 'careers'].map((section) => (
                <div
                  key={section}
                  onMouseEnter={() => handleMouseEnter(section)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/${section}`}
                    className={`text-black group-hover:text-black hover:underline`}
                    onClick={() => handleHeaderClick(section)}
                  >
                    {section.replace('-', ' ').toUpperCase()}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>
      {isOpen && (
        <div
          id="dropdown-content"
          className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-6"
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