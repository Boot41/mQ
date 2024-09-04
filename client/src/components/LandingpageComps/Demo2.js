import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { DemoData } from "../../InformationFiles/LandingPageInfo";
import { useSection } from "../TrackUserComps/SectionContext";

const Demo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const { currentSection } = useSection();
  // console.log("this is demo page");

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === DemoData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [DemoData.length]);

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
          style={{ backgroundImage: `url(${DemoData[currentIndex].img})` }}
        >
          <Box className="w-full h-full flex DemoData-center justify-center">
            <Box className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden md:block w-full">
              <Box className="flex flex-col  bg-opacity-50 p-6 rounded-lg w-1/3 DemoData-center">
                <Box className="text-center  bg-opacity-50 p-6  bg-transparent backdrop-blur-3xl border-4 rounded-3xl">
                  <Typography
                    variant="h2"
                    className="text-orange-400 text-9xl font-bold mb-2 border-b-2"
                  >
                    {DemoData[currentIndex].name}
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
                    {DemoData[currentIndex].description}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    color: "white",
                    margin: "8px",
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
          {DemoData.map((item, index) => (
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
            {DemoData.map((_, index) => (
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
