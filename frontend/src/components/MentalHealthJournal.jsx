import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Slider,
  Button,
  Grid,
  Box,
} from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import "../App.css"; // Ensure you style it properly

Chart.register(...registerables);

const Journal = ({ username }) => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState(5);
  const [journalEntries, setJournalEntries] = useState([]);
  const [meditationHistory, setMeditationHistory] = useState([]);

  useEffect(() => {
    fetchEntries();
    fetchMeditationHistory();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-entries");
      setJournalEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const fetchMeditationHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getMeditationHistory?username=JohnDoe`
      );
      setMeditationHistory(response.data.meditationHistory || []);
    } catch (error) {
      console.error("Error fetching meditation history:", error);
    }
  };

  const addEntry = async () => {
    if (entry.trim() === "") return;
    try {
      await axios.post("http://localhost:5000/add-entry", { text: entry, mood });
      setEntry("");
      fetchEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <Box
    sx={{
      minHeight: "100vh",
      width: "100vw", // Ensures the background covers full width
      backgroundImage: "url('/618308.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
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
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={3}>
        {/* Left Side: Mental Health Journal */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 5, backgroundColor: "#E3F2FD" }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976D2", mb: 2 }}
              >
                📝 Mental Health Journal
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="Write your thoughts..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography variant="body1">
                Mood (1 - 10): <strong>{mood}</strong>
              </Typography>
              <Slider
                min={1}
                max={10}
                value={mood}
                onChange={(e, newValue) => setMood(newValue)}
                step={1}
                valueLabelDisplay="auto"
              />
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
                onClick={addEntry}
              >
                Save Entry
              </Button>
            </CardContent>
          </Card>
        </Grid>
  
        {/* Right Side: Graphs */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ p: 3, boxShadow: 4 }}>
                <CardContent>
                  <Typography variant="h6">📈 Mood Trend Over Time</Typography>
                  <Line
                    data={{
                      labels: journalEntries.map((entry) => entry.date),
                      datasets: [
                        {
                          label: "Mood Level",
                          data: journalEntries.map((entry) => entry.mood),
                          borderColor: "rgb(75, 192, 192)",
                          backgroundColor: "rgba(75, 192, 192, 0.2)",
                          tension: 0.4,
                        },
                      ],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
  
            <Grid item xs={12}>
              <Card sx={{ p: 3, boxShadow: 4 }}>
                <CardContent>
                  <Typography variant="h6">🧘 Mood vs Meditation</Typography>
                  <Line
                    data={{
                      labels: journalEntries.map((entry) => entry.date),
                      datasets: [
                        {
                          label: "Mood Level",
                          data: journalEntries.map((entry) => entry.mood),
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.2)",
                          tension: 0.4,
                        },
                        {
                          label: "Meditation Days (1 = Meditated, 0 = Not Meditated)",
                          data: journalEntries.map((entry) =>
                            meditationHistory.includes(entry.date) ? 1 : 0
                          ),
                          borderColor: "rgb(54, 162, 235)",
                          backgroundColor: "rgba(54, 162, 235, 0.2)",
                          tension: 0.4,
                        },
                      ],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </Box>
  </Box>
  );
};

// Function to color the mood rating
const moodColor = (mood) => {
  if (mood >= 8) return "#4CAF50"; // Green for Happy
  if (mood >= 5) return "#FF9800"; // Orange for Neutral
  return "#F44336"; // Red for Low Mood
};

export default Journal;
