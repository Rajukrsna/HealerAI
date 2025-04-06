import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  TextField, Button, Card, CardContent, Typography, Grid, Container, Box 
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "../App.css"; // Ensure you style it properly


const MeditationRecommendation = () => {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [meditationHistory, setMeditationHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchMeditationHistory();
  }, []);

  const fetchMeditationHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getMeditationHistory", { params: { username: "JohnDoe" } });
      setMeditationHistory(response.data.meditationHistory);
      calculateStreak(response.data.meditationHistory);
    } catch (error) {
      console.error("Error fetching meditation history:", error);
    }
  };

  const calculateStreak = (history) => {
    const today = new Date().toISOString().split("T")[0];
    let streakCount = 0;

    for (let i = history.length - 1; i >= 0; i--) {
      const date = new Date(history[i]);
      const prevDate = new Date();
      prevDate.setDate(prevDate.getDate() - streakCount);

      if (date.toISOString().split("T")[0] === prevDate.toISOString().split("T")[0]) {
        streakCount++;
      } else {
        break;
      }
    }
    setStreak(streakCount);
  };

  const handleRecommend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/medRecommend", { mood });
      setRecommendations(response.data.updatedPractices);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: "url('/618308.jpg')", // Change to your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          p: 4,
          bgcolor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for readability
          borderRadius: 3,
          boxShadow: 3,
          maxWidth: "95%",
          width: "100%",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" sx={{ mb: 4, color: "white" }}>
            🧘‍♂️ Meditation Recommendation
          </Typography>

          <Grid container spacing={4}>
            {/* LEFT SECTION - Mood Input */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">🌿 How are you feeling today?</Typography>
                <TextField
                  label="Enter your mood"
                  variant="outlined"
                  fullWidth
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, py: 1.5 }}
                  onClick={handleRecommend}
                >
                  Get Recommendations
                </Button>
              </Card>
            </Grid>

            {/* RIGHT SECTION - Streak & Calendar */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                
                {/* Streak Card */}
                <Card sx={{ p: 2, display: "flex", alignItems: "center", backgroundColor: "#fff3e0", boxShadow: 3, borderRadius: 2 }}>
                  <LocalFireDepartmentIcon sx={{ fontSize: 40, color: "#ff5722", mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">🔥 Streak: {streak} days</Typography>
                </Card>

                {/* Total Meditations */}
                <Card sx={{ p: 2, display: "flex", alignItems: "center", backgroundColor: "#e3f2fd", boxShadow: 3, borderRadius: 2 }}>
                  <EventNoteIcon sx={{ fontSize: 40, color: "#1e88e5", mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">📊 Total Meditations: {meditationHistory.length}</Typography>
                </Card>

                {/* Meditation Calendar */}
                <Card sx={{ p: 2, backgroundColor: "#f1f8e9", boxShadow: 3, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    📅 Meditation Calendar
                  </Typography>
                  <Calendar
  value={new Date()}
  tileClassName={({ date }) => {
    const dateString = date.toISOString().split("T")[0]; // Convert date to string format
    return meditationHistory.includes(dateString) ? "highlight" : "";
  }}
  style={{ marginTop: 10 }}
/>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Meditation Recommendations */}
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 5, mb: 3, color: "white" }}>
            🎵 Recommended Meditation Practices
          </Typography>

          <Grid container spacing={3}>
            {recommendations.map((practice, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{practice.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{practice.description}</Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                    <Button size="small" color="secondary" href={practice.videoUrl} target="_blank" startIcon={<YouTubeIcon />}>
                      Watch Guide
                    </Button>
                    <Button size="small" color="primary" startIcon={<PlayCircleOutlineIcon />}>
                      Start Practice
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default MeditationRecommendation;
