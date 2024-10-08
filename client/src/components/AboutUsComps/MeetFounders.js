import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { FoundersData } from "../../InformationFiles/AboutUsInfo";
import "../../stylesheets/MeetFounders.css";

function MeetFounders() {
  return (
    <div>
      <div
        className="inner-container flex justify-center items-center"
        style={{
          maxWidth: "1200px",
          width: "100%",
          height: "auto",
        }}
      >
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container flex justify-center items-center"
          style={{ height: "100%" }}
        >
          {FoundersData.map((member, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  width: { xs: 300, sm: 400, md: 500, lg: 600 },
                  height: { xs: 200, sm: 250, md: 280, lg: 300 },
                  boxShadow: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: { xs: "30%", sm: "35%", md: "40%" },
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                    margin: 1,
                  }}
                  image={member.image}
                  alt={member.name}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    padding: "0 16px",
                    flexGrow: 1,
                  }}
                >
                  <div className="flex flex-col text-left h-full justify-around">
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {
                          xs: "1.2rem",
                          sm: "1.5rem",
                          md: "2rem",
                        },
                        marginBottom: "1.5rem",
                        color: "grey.800", // Updated color
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 10,
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1rem",
                          md: "1.2rem",
                        },
                        color: "grey.700", // Updated color
                      }}
                    >
                      {member.description}
                    </Typography>
                  </div>
                  <div
                    className="card-actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <div className="-mt-20">
                      <IconButton
                        component="a"
                        href={member.linkedin}
                        target="_blank"
                        aria-label="LinkedIn"
                        sx={{
                          color: "#0A66C2",
                          fontSize: {
                            xs: "2rem",   // Adjusted for smaller screens
                            sm: "2.5rem",
                            md: "3rem",
                            lg: "3.5rem", // Adjusted for larger screens
                          },
                        }}
                      >
                        <LinkedInIcon
                          sx={{ fontSize: "inherit" }}
                          onClick={() => {
                            window.open(member.linkedin, "_blank");
                          }}
                        />
                      </IconButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MeetFounders;
