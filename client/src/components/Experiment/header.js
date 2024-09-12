import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <header className="fixed top-0 left-0 w-full z-20 py-4 px-8 border-b border-gray-200 bg-white shadow-md">
      <div className="flex justify-between items-center">
        <div
          className="text-orange-500 font-bold text-4xl cursor-pointer"
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
          {["about-us", "careers"].map((section) => (
            <Link
              key={section}
              to={`/${section}`}
              className="text-black hover:text-orange-500 text-2xl"
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
          className="fixed top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 lg:hidden"
        >
          <div className="flex flex-col space-y-4">
            {["about-us", "careers"].map((section) => (
              <Link
                key={section}
                to={`/${section}`}
                className="text-black hover:text-gray-700 hover:underline text-2xl"
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
