import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ReadMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, content, image } = location.state;

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Container maxWidth="md" sx={{ mt: 20 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        sx={{ mb: 2 }}
        variant="outlined"
        color="primary"
      >
        Back to Insights
      </Button>
      <Card>
        <CardMedia
          component="img"
          alt={title}
          height="400"
          image={image}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReadMore;
