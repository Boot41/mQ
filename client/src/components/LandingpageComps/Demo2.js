import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { DemoData } from "../../InformationFiles/LandingPageInfo";
import { useSection } from "../TrackUserComps/SectionContext";
import axios from "axios";
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

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: "Tell me More About AutoPods",
          current_page: DemoData[currentIndex].name, // Dynamically set current page title
          model_name: "4o-mini",
        }
      );

      // Handle the response as needed
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error making API call:", error);
    }
    // console.log(DemoData[currentIndex].name);
  };

  const handleKnowMoreClick = () => {
    console.log("button clicked");
  };
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
        </Box>
        <div className="flex justify-center mt-20 bottom-0">
          <Button
            variant="contained"
            onClick={handleClick}
            className="bottom-0 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-2 px-6 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Know More
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Demo;
