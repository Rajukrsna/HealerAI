import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Button
} from "@mui/material";

const Description = () => {
  const location = useLocation();
  const emotions = location.state?.emotions || {};
const navigate = useNavigate(); // Initialize navigate
  console.log("Emotions data:", emotions); // Debugging

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Emotion Details
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {emotions.detail}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Recommended Yoga Poses
      </Typography>

      <Grid container spacing={3}>
        {emotions.poses &&
          Object.entries(emotions.poses).map(([poseName, poseData], index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={poseData.image}
                  alt={poseName}
                />
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {poseName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {poseData.description}
                  </Typography>
                  <Button variant="dark" onClick = {
                    () => {  
                      
                     // const yogaData = emotions.poses[poseName];
                      navigate(`/practice`, { state: { poses: poseName } });

                  }

                

                  }  >Practice</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Description;
