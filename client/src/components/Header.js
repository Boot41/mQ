import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Link as MuiLink,
  Box,
  Container,
  Paper,
} from "@mui/material";

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
    navigate("/");
    setActiveSection("home");
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
            className="flex flex-col md:flex-row bg-transparent shadow-lg rounded-lg p-6"
          >
            <div className="md:w-2/3 pl-4">
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Subtopics</h3>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">
                    Company and Founder History
                  </h4>
                  <p className="text-gray-700">
                    Learn about the history of our company and our founder's
                    journey.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Mission and Vision</h4>
                  <p className="text-gray-700">
                    Understand our mission and the vision that drives our goals.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Team at Boot 41</h4>
                  <p className="text-gray-700">
                    Meet the dedicated team behind our innovations.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">GenAI with T41</h4>
                  <p className="text-gray-700">
                    Explore how we are integrating GenAI technology with our
                    solutions.
                  </p>
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
                  <h4 className="text-sm font-semibold">
                    Navigating the Ethical Implications of Gen AI in Business
                  </h4>
                </div>
                <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
                  <img
                    src="ai1.png"
                    alt="The Future of Finance and Risk Management"
                    className="w-full h-3/5 object-cover rounded-lg mb-2"
                  />
                  <h4 className="text-sm font-semibold">
                    The Future of Finance and Risk Management
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
      case "services":
        return (
          <div
            id="services"
            className="flex flex-col md:flex-row  shadow-lg rounded-lg p-6"
          >
            <div className="md:w-2/3 pl-4">
              <h2 className="text-2xl font-bold mb-4">Our Services</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Subtopics</h3>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Capabilities</h4>
                  <p className="text-gray-700">
                    Discover the full range of our capabilities and how they can
                    benefit you.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Partnership</h4>
                  <p className="text-gray-700">
                    Learn about our partnership opportunities and how we can
                    collaborate.
                  </p>
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
                  <h4 className="text-sm font-semibold">
                    Navigating the Ethical Implications of Gen AI in Business
                  </h4>
                </div>
                <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
                  <img
                    src="ai1.png"
                    alt="The Future of Finance and Risk Management"
                    className="w-full h-3/5 object-cover rounded-lg mb-2"
                  />
                  <h4 className="text-sm font-semibold">
                    The Future of Finance and Risk Management
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
      case "insights":
        return (
          <div
            id="insights"
            className="flex flex-col md:flex-row shadow-lg rounded-lg p-6"
          >
            <div className="md:w-2/3 pl-4">
              <h2 className="text-2xl font-bold mb-4">Thought Leadership</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Learn More</h3>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">
                    <a
                      href="#podcasts"
                      className="text-blue-500 hover:underline"
                    >
                      Podcasts
                    </a>
                  </h4>
                  <p className="text-gray-700">
                    Explore our thought leadership podcasts and insights.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">
                    <a href="#blogs" className="text-blue-500 hover:underline">
                      Blogs
                    </a>
                  </h4>
                  <p className="text-gray-700">
                    Read our latest blog posts on leadership and innovation.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">
                    <a
                      href="#visualizing-ai"
                      className="text-blue-500 hover:underline"
                    >
                      Visualizing AI
                    </a>
                  </h4>
                  <p className="text-gray-700">
                    Understand how we visualize AI concepts and their
                    applications.
                  </p>
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
                  <h4 className="text-sm font-semibold">
                    Navigating the Ethical Implications of Gen AI in Business
                  </h4>
                </div>
                <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
                  <img
                    src="ai1.png"
                    alt="The Future of Finance and Risk Management"
                    className="w-full h-3/5 object-cover rounded-lg mb-2"
                  />
                  <h4 className="text-sm font-semibold">
                    The Future of Finance and Risk Management
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
      case "careers":
        return (
          <div
            id="careers"
            className="flex flex-col md:flex-row shadow-lg rounded-lg p-6"
          >
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
                  <h4 className="text-sm font-semibold">
                    Navigating the Ethical Implications of Gen AI in Business
                  </h4>
                </div>
                <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm h-60 w-44">
                  <img
                    src="static/ai1.png"
                    alt="The Future of Finance and Risk Management"
                    className="w-full h-3/5 object-cover rounded-lg mb-2"
                  />
                  <h4 className="text-sm font-semibold">
                    The Future of Finance and Risk Management
                  </h4>
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
      <AppBar
        position="fixed"
        elevation={isOpen ? 4 : 0}
        sx={{
          top: 5,
          backgroundColor: "transparent",
          // backdropFilter: "blur(5px)",
          transition: "all 0.3s ease",
          borderRadius: "10px",
          borderColor: "black",
          // backdropFilter: "blur",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component="div"
              className="hover:text-orange-600 transition duration-300 transform hover:scale-105"
              sx={{ color: "orange", fontWeight: "bold", cursor: "pointer" }}
              onClick={handleLogoClick}
            >
              THINK 41
            </Typography>
            <Box
              component="nav"
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              {["about-us", "services", "insights", "careers"].map(
                (section) => (
                  <MuiLink
                    key={section}
                    component={Link}
                    to={`/${section}`}
                    className="relative group hover:text-orange-600 transition duration-300 "
                    sx={{
                      color: "black",
                      fontWeight: "medium",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => handleMouseEnter(section)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleHeaderClick(section)}
                  >
                    {section.replace("-", " ").toUpperCase()}
                    {/* Sliding line effect */}
                    <span className="absolute left-0 h-0.5 w-full bg-orange-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 bottom-[-4px] " />
                  </MuiLink>
                )
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "64px",
            left: 0,
            width: "100%",
            zIndex: 10,
            padding: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={handleMouseLeave}
        >
          {renderContent()}
        </Paper>
      )}
    </>
  );
};

export default Header;
