import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
const Autopods = () => {
  return (
    <div className="-mt-52">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Video Section */}
        <div className="w-1/2 p-24 ml-10">
          <video
            src="/autobots.webm" // Ensure this path is correct
            autoPlay
            loop
            muted
            className="w-64 h-64 md:w-full md:h-auto"
          ></video>
        </div>

        {/* Text Section */}
        <Box className="w-1/2 ml-10">
          <Typography
            variant="h3"
            component="h3"
            color="orange"
            fontWeight="bold"
            fontFamily="Baskervville SC, serif"
            gutterBottom
            sx={{ fontSize: { xs: "3rem", md: "3rem", lg: "4rem" } }}
          >
            AutoPods
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            color="gray"
            fontWeight="medium"
            sx={{ fontSize: { xs: "1.5rem", md: "2rem", lg: "1.7rem" }, mb: 2 }}
          >
            Pods empowered with AI tools delivering exceptional performance
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            color="gray"
            fontWeight="medium"
            sx={{ fontSize: { xs: "1.5rem", md: "2rem", lg: "1.5rem" }, mb: 2 }}
          >
            Trained on AI by AI
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            color="gray"
            fontWeight="medium"
            sx={{ fontSize: { xs: "1.5rem", md: "2rem", lg: "1.2rem" }, mb: 4 }}
          >
            Trained on AI tools, our pod team members are innovative, iterative,
            and exceptionally fast in executing processes, all while maintaining
            high-quality standards. With a strong focus on automating internal
            processes, we extend this mindset to everything we do.
          </Typography>
          <Box className="flex justify-start space-x-4">
            <Link to="/visualizingai">
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderColor: "black",
                  backgroundColor: "black",
                  color: "white",
                  px: 4,
                  py: 2,
                  "&:hover": {
                    color: "white",
                    backgroundColor: "transparent",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "orange",
                    transition: "left 0.5s ease",
                    zIndex: -1,
                    border: "white",
                  },
                  "&:hover::before": {
                    left: 0,
                  },
                }}
              >
                Know More..
              </Button>
            </Link>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Autopods;
