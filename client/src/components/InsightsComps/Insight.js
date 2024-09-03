import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

// Inside the Insight component

const initialCards = [
  {
    title: "Maximizing the value of your data catalog",
    category: "Trends",
    image:
      "https://img.freepik.com/premium-photo/abstract-white-square-shape-with-futuristic-concept-background-generative-ai_891226-3362.jpg",
    content:
      "This article discusses how to maximize the value of your data catalog...",
  },
  {
    title: "Deliver your system of record with Collibra Data ",
    category: "Featured",
    image:
      "https://www.thetechedvocate.org/wp-content/uploads/2023/08/tr71123-ai-art-660x400@2x.jpeg",
  },
  {
    title: "Data Governance: Best Practices",
    category: "Insights",
    image:
      "https://img.freepik.com/premium-photo/robots-with-advanced-artificial-intelligence-that-can-think-themselves_410516-6834.jpg",
  },
  {
    title: "Ensuring Data Privacy in Cloud Computing",
    category: "Data Privacy",
    image:
      "https://img.freepik.com/premium-photo/robot-with-purple-blue-eyes-black-background-artificial-intelligence-ai-high-tech-chat_872754-462.jpg",
  },
  {
    title: "Improving Data Quality with AI",
    category: "Data Quality",
    image:
      "https://img.freepik.com/premium-photo/woman-with-face-head-that-says-cyberpunk-it_853177-6534.jpg",
  },
  {
    title: "Trends in Big Data and Analytics",
    category: "Trends",
    image:
      "https://img.freepik.com/premium-photo/artificial-intelligence-concept-with-image-humanoid-technology_561107-267.jpg",
  },
];

const Insight = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [itemsPerPage] = React.useState(6);
  const [tabScrollIndex, setTabScrollIndex] = React.useState(0);
  const [expandedCard, setExpandedCard] = React.useState(null);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const displayedCards = initialCards.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleScrollLeft = () => {
    setTabScrollIndex(tabScrollIndex - 1);
  };

  const handleScrollRight = () => {
    setTabScrollIndex(tabScrollIndex + 1);
  };
  const handleReadMore = (index) => {
    const selectedCard = initialCards[index];
    navigate("/readmore", { state: selectedCard });
  };

  return (
    <div>
      <div className="px-4 py-3">
        <div className="HeroSection flex flex-col justify-end overflow-hidden bg-[#FFFFFF] rounded-xl h-96 shadow-md relative">
          {/* Spline Model */}
          <iframe
            src="https://my.spline.design/aibrain-42afbab7768b2cf1303900e83a7054dc/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full"
            title="Spline Model"
          ></iframe>

          <div className="flex p-6 justify-center relative z-10">
            {/* <p className="text-white text-[32px] font-bold leading-tight text-center">
              Deliver your system of record with Collibra Data Intelligence
              Cloud
            </p> */}
            <Typography variant="h6" color="#A18249">
              Deliver your system of record with Collibra Data Intelligence
              Cloud
            </Typography>
          </div>
        </div>
      </div>

      <Container maxWidth="lg">
        <div className="flex flex-col gap-4 mb-4">
          <div className="relative">
            <div className="flex items-center absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <IconButton
                onClick={handleScrollLeft}
                disabled={tabScrollIndex === 0}
                sx={{ color: "#FFA500" }} // Orange color
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div className="overflow-x-auto">
              <div className="flex">
                <Tabs
                  value={0}
                  indicatorColor="primary"
                  textColor="primary"
                  sx={{ marginBottom: 3, flexShrink: 0, width: "max-content" }}
                  style={{
                    transform: `translateX(-${tabScrollIndex * 100}px)`,
                  }}
                >
                  <Tab label="All" />
                  <Tab label="Blog" />
                  <Tab label="Community & Webinars" />
                  <Tab label="Success Stories" />
                  <Tab label="Proof of Concepts" />
                  <Tab label="Demo Videos" />
                </Tabs>
              </div>
            </div>
            <div className="flex items-center absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <IconButton
                onClick={handleScrollRight}
                disabled={tabScrollIndex >= 2} // Change this based on the number of tabs
                sx={{ color: "#FFA500" }} // Orange color
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>

          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Grid container spacing={4}>
            {displayedCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "56.25%", // 16:9 aspect ratio
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: "bold", color: "#1C160C" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="#A18249">
                      {card.category}
                    </Typography>
                  </CardContent>
                  <Button
                    onClick={() => handleReadMore(index)}
                    sx={{ textTransform: "none", color: "#FFA500", m: 2 }}
                  >
                    Read More
                  </Button>
                  ;
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              color="warning"
              sx={{ textTransform: "none" }}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(initialCards.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Insight;
