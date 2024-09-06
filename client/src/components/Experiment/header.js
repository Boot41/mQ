import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import menu and close icons from lucide-react

const Header = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();

  const handleHeaderClick = (section) => {
    navigate(`/${section}`);
    setActiveSection(section);
    setIsOpen(false);
    setIsMenuOpen(false); // Close mobile menu
  };

  const handleLogoClick = () => {
    navigate("/");
    setActiveSection("home");
    setIsMenuOpen(false); // Close mobile menu
  };

  const handleMouseEnter = (section) => {
    setActiveSection(section);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (
        !document.querySelector("#header-content:hover") &&
        !document.querySelector("#dropdown-content:hover")
      ) {
        setIsOpen(false);
        setActiveSection(null);
      }
    }, 100);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest("#header-content") &&
        !e.target.closest("#dropdown-content")
      ) {
        setIsOpen(false);
        setActiveSection(null);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "about-us":
        return (
          <div
            id="about"
            className="flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-4"
          >
            <h2 className="text-xl font-bold mb-2">About Us</h2>
            <div className="space-y-2">
              {[
                {
                  title: "T41 Advantage",
                  description: "Discover what sets us apart.",
                },
                {
                  title: "Mission and Vision",
                  description: "Understand our mission and vision.",
                },
                {
                  title: "Our Approach",
                  description: "Learn about our approach to innovation.",
                },
                { title: "Impact", description: "See the impact of our work." },
                {
                  title: "Founders",
                  description: "Meet our founders and their story.",
                },
              ].map(({ title, description }) => (
                <div
                  key={title}
                  className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                >
                  <h4 className="text-md font-semibold">{title}</h4>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "careers":
        return (
          <div
            id="careers"
            className="flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-4"
          >
            <h2 className="text-xl font-bold mb-2">Careers</h2>
            <div className="space-y-2">
              {[
                {
                  title: "Why Us",
                  description: "Why you should consider working with us.",
                },
                {
                  title: "Life at Think 41",
                  description: "What to expect working here.",
                },
                { title: "Boot41", description: "Our training programs." },
                {
                  title: "Testimonials",
                  description: "Hear from our employees.",
                },
                {
                  title: "Open Positions",
                  description: "Current job openings.",
                },
              ].map(({ title, description }) => (
                <div
                  key={title}
                  className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                >
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
        className={`fixed top-0 left-0 w-full z-20 py-4 px-8 border-b border-gray-200 transition-all duration-300 ${
          isOpen ? "bg-white shadow-lg" : "bg-white"
        }`}
        id="header-content"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={handleMouseLeave}
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
                <div
                  key={section}
                  onMouseEnter={() => handleMouseEnter(section)}
                >
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

      {isOpen && (
        <div
          id="dropdown-content"
          className="fixed top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4"
          style={{ zIndex: 100 }}
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
