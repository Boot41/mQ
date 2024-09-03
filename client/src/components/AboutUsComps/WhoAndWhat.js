import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCreative, Navigation, Pagination } from "swiper/modules";
import slidesData from "./Information";
import { Box, Typography, CardMedia, Container, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function WhoAndWhat() {
  return (
    <Box sx={{ bgcolor: "background.paper", py: 8 }}>
      <Container>
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative, Navigation, Pagination]}
          className="mySwiper mt-20"
          loop={true} // Enable infinite looping
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            renderBullet: (index, className) => {
              return `<span class="${className}"></span>`;
            },
          }} // Add pagination dots and make them clickable
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <Paper
                elevation={6}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  p: { xs: 2, md: 4 },
                  borderRadius: 2,
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 8,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "100%", md: "50%" },
                    p: { md: 8 },
                    // pb: { xs: 2, md: 0 },
                    background: "linear-gradient(135deg, #ff9800, #f57c00)", // Orange gradient background
                    borderRadius: 2, // Rounded corners
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
                    "&:hover": {
                      transform: "translateY(-5px)", // Slight lift on hover
                      boxShadow: "0 6px 30px rgba(0, 0, 0, 0.2)", // Deeper shadow on hover
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "h5.fontSize",
                        sm: "h4.fontSize",
                        md: "h3.fontSize",
                      },
                      fontWeight: 600, // Bolder text
                      color: "#ffffff", // White text color for contrast
                    }}
                  >
                    {slide.header}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    color="text.secondary"
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "body1.fontSize",
                        sm: "h6.fontSize",
                        md: "h5.fontSize",
                      },
                      color: "#f5f6f7", // Light orange color for subheader
                    }}
                  >
                    {slide.header2}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "body2.fontSize", sm: "body1.fontSize" },
                      color: "#f5f6f7", // White text color for contrast
                    }}
                  >
                    {slide.body}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "body2.fontSize", sm: "body1.fontSize" },
                      color: "#f5f6f7", // White text color for contrast
                    }}
                  >
                    {slide.body2}
                  </Typography>
                </Box>

                <CardMedia
                  component="img"
                  image={slide.imgSrc}
                  alt={slide.title}
                  sx={{
                    objectFit: "cover",
                    borderRadius: 2,
                    width: { xs: "100%", md: "50%" },
                    height: { xs: 200, md: "auto" }, // Adjust image height for smaller screens
                    mt: { xs: 2, md: 0 },
                  }}
                />
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            position: "relative",
            "& .swiper-button-prev, & .swiper-button-next": {
              color: "text.primary",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              "&:hover": {
                color: "primary.main",
              },
            },
          }}
        >
          <ArrowBackIosNewIcon
            className="swiper-button-prev"
            aria-label="Previous Slide"
          />

          <ArrowForwardIosIcon
            className="swiper-button-next"
            aria-label="Next Slide"
          />
        </Box>

        {/* Centered Pagination dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            "& .swiper-pagination-bullet": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              width: { xs: "8px", sm: "10px" },
              height: { xs: "8px", sm: "10px" },
              borderRadius: "50%",
              "&.swiper-pagination-bullet-active": {
                backgroundColor: "primary.main",
              },
            },
          }}
        >
          <div className="swiper-pagination"></div>
        </Box>
      </Container>
    </Box>
  );
}
