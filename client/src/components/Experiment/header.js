import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Update header background based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Adjust this value based on when you want the background to change
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Only apply sticky header styling on the landing page
  const isLandingPage = location.pathname === '/';

  const handleHeaderClick = (section) => {
    navigate(`/${section}`);
    setIsMenuOpen(false); // Close mobile menu
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-20 py-4 px-8  transition-all duration-300 ease-in-out ${
        isLandingPage ? (isScrolled ? 'bg-white shadow-md' : 'bg-transparent') : 'bg-white shadow-md'
      }`}
    >
      <div className="flex justify-between items-center">
        <div
          className={`font-bold text-4xl cursor-pointer ${
            isScrolled || !isLandingPage ? 'text-orange-500' : 'text-white'
          }`}
          onClick={handleLogoClick}
        >
          THINK41
        </div>
        <div className="lg:hidden">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`text-${isScrolled || !isLandingPage ? 'black' : 'white'} focus:outline-none`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="hidden lg:flex space-x-6 items-center">
          {["about-us", "careers"].map((section) => (
            <Link
              key={section}
              to={`/${section}`}
              className={`text-${isScrolled || !isLandingPage ? 'black' : 'white'} hover:text-orange-500 text-2xl`}
              onClick={() => handleHeaderClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 text-center text-2xl"
            onClick={() => handleHeaderClick("contact")}
          >
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className={`fixed top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 lg:hidden transition-all duration-300 ease-in-out ${
            isScrolled ? 'bg-white' : 'bg-transparent'
          }`}
        >
          <div className="flex flex-col space-y-4">
            {["about-us", "careers"].map((section) => (
              <Link
                key={section}
                to={`/${section}`}
                className={`text-${isScrolled || !isLandingPage ? 'black' : 'white'} hover:text-gray-700 hover:underline text-2xl`}
                onClick={() => handleHeaderClick(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 text-center text-xl"
              onClick={() => handleHeaderClick("contact")}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
