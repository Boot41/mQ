import React from "react";
import { VisionData } from "../../InformationFiles/AboutUsInfo";
import { Box, Typography, CardMedia, Container, Paper } from "@mui/material";
import { grey } from "@mui/material/colors"; // Import grey color palette

export default function WhoAndWhat2() {
  return (
    <Box sx={{ bgcolor: "background.paper", py: 8, margin: 4 }}>
      <Container>
        {VisionData.map((slide, index) => (
          <Paper
            key={index}
            elevation={0} // Remove shadow
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: index % 2 === 0 ? "row" : "row-reverse", // Alternate layout
              },
              justifyContent: "space-between",
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 2,
              mb: 4, // Add margin between cards
              height: { xs: "auto", md: 400 }, // Adjust height for responsiveness
              maxWidth: "100%", // Ensure full width for the container
              mx: "auto", // Center the cards
              fontFamily: "inherit", // Ensure font family is inherited
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: { xs: "100%", md: "50%" },
                p: { md: 3, xs: 2, sm: 3 }, // Adjust padding for responsiveness
                backgroundColor: "slate", // Plain background color
                borderRadius: 2, // Rounded corners
                height: "100%", // Ensure content box fills the card height
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontSize: "2.5rem", // Equivalent to '5xl' in Material-UI
                  fontWeight: 600, // Bolder text
                  color: grey[800], // Use grey.800 for the title
                  fontFamily: "inherit", // Ensure the same font family
                }}
              >
                {slide.header}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontSize: "1.5rem", // Equivalent to '2xl' in Material-UI
                  color: grey[700], // Use grey.400 for the body text
                  textAlign: "justify", // Justify the text
                  fontFamily: "inherit", // Ensure the same font family
                }}
              >
                {"  " + slide.body}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.5rem", // Equivalent to '2xl' for body2 text
                  color: grey[700], // Use grey.400 for the second body text
                  textAlign: "justify", // Justify the text
                  fontFamily: "inherit", // Ensure the same font family
                }}
              >
                {"  " + slide.body2}
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
                height: { xs: 200, md: "100%" }, // Adjust height for responsiveness
              }}
            />
          </Paper>
        ))}
      </Container>
    </Box>
  );
}
