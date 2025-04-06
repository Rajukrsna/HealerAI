import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Box, Button, Grid } from "@mui/material";
import ChatSupport from "./components/ChatSupport";
import BreathingExercise from "./components/BreathingExercise";
import MentalHealthJournal from "./components/MentalHealthJournal";
import Home from "./components/Homepage"
import Navbar from "./components/Navbar";
import AppTheme from "./theme/AppTheme"; 
import { CssBaseline } from "@mui/material"; 
import ColorModeSelect from "./theme/ColorModeSelect"; 
import { Stack } from "@mui/material";
import FindEmotion from "./pages/FindEmotion";
import Description from "./pages/Description"
const App = () => {
    return (
       <AppTheme>
                <CssBaseline enableColorScheme />
                <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
                <Stack
              direction="column"
              component="main"
              sx={{
                height: "100vh",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 2,
                paddingTop: "0px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Content Wrapper with Controlled Width */}
              <Stack
                direction="column"
                sx={{
                  width: "100%",
                  flexGrow: 1,
                }}
              >
        <Router>
                {/* Page Routing */}
                <Navbar/>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/findemotion" element={<FindEmotion />} />
                <Route path="/myjournal" element={<MentalHealthJournal />} />
                <Route path="/getmeditation" element={<BreathingExercise />} />
                <Route path ="/description" element={<Description />} />
                </Routes>

                {/* Chatbot (Always Visible) */}
                <Box sx={{ mt: 6 }}>
                    <ChatSupport />
                </Box>
       
        </Router>
        </Stack>
        </Stack>
        </AppTheme>
    );
};

export default App;
