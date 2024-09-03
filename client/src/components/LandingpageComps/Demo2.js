import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import recruit41 from "../../assets/images/recruit41.jpg";
import podcast from "../../assets/images/podcast.webp";
import aimail from "../../assets/images/aimail.png";

const Demo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      name: "Podcast Generator",
      description:
        "Podcast Generator is an innovative AI-powered tool that enables users to create customized podcasts with ease. Users can generate podcasts on a wide range of topics, and the platform allows for the personalization of podcast characters, including voice, tone, and style. Whether for entertainment, education, or business, Podcast Generator provides a dynamic and interactive way to produce high-quality audio content that resonates with listeners.",
      img: podcast,
      // img: "https://images.unsplash.com/photo-1725020490618-de0219bc2a57?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      name: "Auto Mailer",
      description:
        "Auto Mailer is a cutting-edge AI-powered email marketing outreach tool that automates the creation and delivery of personalized email campaigns. With its advanced content generation capabilities, Auto Mailer can scrape user data, create dynamic templates, and send tailored emails to target audiences based on their interests. The platform's ability to map multiple content pieces to different users ensures that every message is relevant, increasing engagement and conversion rates.",
      img: podcast,
    },
    {
      name: "Recruit 41",
      description:
        "Recruit 41 is an AI-powered digital hiring web application designed to revolutionize the recruitment process. Leveraging advanced machine learning algorithms, Recruit 41 helps companies identify and hire the best-fitting employees by analyzing resumes, assessing skills, and matching candidates to job roles with precision. This automated recruitment agent streamlines the hiring process, reduces time-to-hire, and ensures that organizations find the most qualified talent efficiently.",
      img: podcast,
    },
  ];

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <>
      <header className="text-center my-10 p-10">
        <h1 className="text-6xl font-extrabold text-orange-400">
          Check Out Some Demos
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Discover the features and capabilities of our latest demos and see how
          they can benefit you.
        </p>
      </header>
      <Box className="relative h-[500px]  ">
        <Box
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 w-5/6 ml-20 rounded-3xl shadow-2xl"
          style={{ backgroundImage: `url(${items[currentIndex].img})` }}
        >
          <Box className="w-full h-full flex items-center justify-center">
            <Box className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden md:block w-full">
              <Box className="flex flex-col  bg-opacity-50 p-6 rounded-lg w-1/3 items-center">
                <Box className="text-center  bg-opacity-50 p-6  bg-transparent backdrop-blur-3xl border-4 rounded-3xl">
                  <Typography
                    variant="h2"
                    className="text-orange-400 text-9xl font-bold mb-2 border-b-2"
                  >
                    {items[currentIndex].name}
                  </Typography>
                  <Typography
                    variant="h5"
                    className="text-gray-400 text-3xl font-semibold mb-4"
                  >
                    Discover Our Product
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-white text-lg leading-relaxed text-justify"
                  >
                    {items[currentIndex].description}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    color: "white",
                    marginTop: "10px",
                    backgroundColor: "orange",
                    backdropFilter: "blur(10px)",
                    border: "1px solid white",
                    transform: "scale(1)",
                    transition:
                      "transform 0.3s ease, background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      transform: "scale(1.05)",
                      color: "white",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      zIndex: -1,
                      transition: "opacity 0.3s ease",
                      opacity: 0,
                    },
                    "&:hover::before": {
                      opacity: 1,
                    },
                  }}
                >
                  Experience
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="absolute bottom-20 w-full flex justify-end space-x-2 overflow-x-auto pb-4  ">
          {items.map((item, index) => (
            <Box
              key={index}
              className={`cursor-pointer border-2 rounded-3xl ${
                index === currentIndex
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[150px] h-[200px] object-cover rounded-3xl"
              />
            </Box>
          ))}
          <Box className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black">
            {items.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                className={`cursor-pointer w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Demo;
