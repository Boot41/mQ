import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import menu and close icons from lucide-react

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();

  const handleHeaderClick = (section) => {
    navigate(`/${section}`);
    setIsMenuOpen(false); // Close mobile menu
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-20 py-4 px-8 border-b border-gray-200 bg-white"
        id="header-content"
      >
        <div className="flex justify-between items-center">
          <div
            className="text-orange-500 font-bold text-2xl cursor-pointer"
            onClick={handleLogoClick}
          >
            THINK41
          </div>
          <div className="lg:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className="hidden lg:flex space-x-6 items-center">
            <div className="relative flex space-x-6">
              {["about-us", "careers"].map((section) => (
                <div key={section}>
                  <Link
                    to={`/${section}`}
                    className="text-black hover:text-black hover:underline"
                    onClick={() => handleHeaderClick(section)}
                  >
                    {section.replace("-", " ").toUpperCase()}
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

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 lg:hidden"
        >
          <div className="flex flex-col space-y-4">
            {["about-us", "careers"].map((section) => (
              <Link
                key={section}
                to={`/${section}`}
                className="text-black hover:text-black hover:underline"
                onClick={() => {
                  handleHeaderClick(section);
                }}
              >
                {section.replace("-", " ").toUpperCase()}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
