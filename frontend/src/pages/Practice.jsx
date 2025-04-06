import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import Back from "../assets/back3.jpg";  
const Practice = () => {
  const [yogas, setYogas] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [meditationDone, setMeditationDone] = useState(false);

  const location = useLocation();
  const pose = location.state?.poses || "";
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const getPoseDescription = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/description/${pose}`);
        setYogas(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getPoseDescription();
  }, [pose]);

  const synthRef = useRef(window.speechSynthesis);
const utteranceRef = useRef(null);

const startMeditation = () => {
  if (yogas.description) {
    utteranceRef.current = new SpeechSynthesisUtterance(yogas.description);
    utteranceRef.current.onend = stopMeditation;
    synthRef.current.speak(utteranceRef.current);
  }

  setIsPlaying(true);
  setMeditationDone(false);
  setElapsedTime(0);

  timerRef.current = setInterval(() => {
    setElapsedTime((prev) => prev + 1);
  }, 1000);
};

const stopMeditation = () => {
  synthRef.current.cancel(); // Stop any ongoing speech
  clearInterval(timerRef.current);
  setIsPlaying(false);
  setMeditationDone(true);
};


  return (
    <Box
    sx={{
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "360px",
          maxWidth: "90%",
          borderRadius: "28px",
          p: 3,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          textAlign: "center",
        }}
      >
        {yogas.length === 0 ? (
          <Typography>Loading meditation practices...</Typography>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {yogas.name}
            </Typography>

            <Box sx={{ position: "relative", mb: 2 }}>
              <video
                src={yogas.videoUrl}
                controls
                style={{
                  width: "100%",
                  maxHeight: "220px",
                  borderRadius: "16px",
                }}
              />
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {yogas.description}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Benefits: {yogas.benefits.join(", ")}
            </Typography>

            <Box sx={{ mt: 3 }}>
              {!isPlaying && !meditationDone && (
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayArrowIcon />}
                  onClick={startMeditation}
                  sx={{
                    borderRadius: "50px",
                    bgcolor: "#7CB342",
                    color: "#fff",
                    "&:hover": { bgcolor: "#689F38" },
                  }}
                >
                  Start Practice
                </Button>
              )}

              {isPlaying && (
                <>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    startIcon={<StopIcon />}
                    onClick={stopMeditation}
                    sx={{ borderRadius: "50px" }}
                  >
                    Stop
                  </Button>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Elapsed Time: {elapsedTime} seconds
                    </Typography>
                    <LinearProgress
                      variant="indeterminate"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </>
              )}

              {meditationDone && (
                <Typography
                  variant="h6"
                  color="success.main"
                  sx={{ mt: 2 }}
                >
                  Meditation Done! 🎉<br />
                  You practiced for {elapsedTime} seconds.
                </Typography>
              )}


            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Practice;
