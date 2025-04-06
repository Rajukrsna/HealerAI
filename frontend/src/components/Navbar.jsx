import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SpaIcon from "@mui/icons-material/Spa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#FDF6F0", boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SpaIcon sx={{ color: "#5EAAA8", fontSize: 30 }} />
          <Typography variant="h6" color="black" sx={{ fontWeight: "bold" }}>
            HealerAI
          </Typography>
        </Stack>

        <Box>
          {!isAuthenticated ? (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "black", fontSize: 16 }} startIcon={<PersonAddIcon />}>
                  Register
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "black", fontSize: 16 }} startIcon={<LoginIcon />}>
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "black", fontSize: 16 }} startIcon={<HomeIcon />}>
                  Home
                </Button>
              </Link>
              <Link to="/findemotion" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "black", fontSize: 16 }} startIcon={<SentimentSatisfiedAltIcon />}>
                  Emotion
                </Button>
              </Link>
              <Link to="/goals" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "black", fontSize: 16 }} startIcon={<TrackChangesIcon />}>
                  Goals
                </Button>
              </Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "black", fontSize: 16 }} startIcon={<AccountCircleIcon />}>
                  Profile
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                sx={{ color: "black", fontSize: 16 }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
