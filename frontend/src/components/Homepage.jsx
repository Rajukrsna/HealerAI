import React from "react";
import { Typography, Button, Box, Container, Grid, Paper, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "react-router-dom";
import health from "../assets/health.jpg"; // Replace with your image path  
const YogaLandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: "#FDF6F0", minHeight: "100vh", fontFamily: "sans-serif" }}>
    

      {/* Main Section */}
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
          CONNECT MIND, BODY, SPIRIT
        </Typography>
        <Typography variant="h5" sx={{ color: "#6B6B6B", mt: 2 }}>
         The one stop solution for all your mental health needs.
        </Typography>

        {/* Yoga Illustration */}
        <Grid container justifyContent="center" sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <img src={health} alt="Yoga" style={{ width: "100%", maxWidth: "350px" }} />
          </Grid>
        </Grid>

        {/* Book Now Button */}
        <Button
  variant="contained"
  sx={{ bgcolor: "#FFC107", mt: 3, px: 4, py: 1.5, fontSize: 18, fontWeight: "bold" }}
  onClick={() => navigate("/findemotion")}
>
  Enter the World
</Button>

      </Container>

      {/* Event Info Card */}
      <Grid container justifyContent="center" sx={{ mt: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
            <Typography
              sx={{ bgcolor: "#FFC107", display: "inline-block", px: 3, py: 1, borderRadius: 5, fontWeight: "bold", color: "white" }}
            >
              21st June
            </Typography>
            <Typography sx={{ color: "#6B6B6B", mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Social Media Links */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 6, mb: 4 }}>
        <IconButton><PublicIcon sx={{ color: "#4A4A4A" }} /></IconButton>
        <IconButton><InstagramIcon sx={{ color: "#4A4A4A" }} /></IconButton>
        <IconButton><FacebookIcon sx={{ color: "#4A4A4A" }} /></IconButton>
        <IconButton><TwitterIcon sx={{ color: "#4A4A4A" }} /></IconButton>
      </Box>
    </Box>
  );
};

export default YogaLandingPage;
