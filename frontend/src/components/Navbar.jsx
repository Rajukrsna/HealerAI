import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#FDF6F0", boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="black" sx={{ fontWeight: "bold" }}>
          Yoga Class
        </Typography>
        <Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "black", fontSize: 16 }}>Home</Button>
          </Link>
          <Link to="/findemotion" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "black", fontSize: 16 }}>Find Emotion</Button>
          </Link>
          <Link to="/habittracker" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "black", fontSize: 16 }}>Habit Tracker</Button>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "black", fontSize: 16 }}>Profile</Button>
          </Link>
        </Box>
        <IconButton>
          <SearchIcon sx={{ color: "black" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
