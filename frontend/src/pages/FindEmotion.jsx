import React, { useState, useRef, useEffect } from "react";
import { 
    Container, Grid, Card, CardActionArea, CardContent, Typography, 
    TextField, Button, Box, Modal , CardMedia
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactMediaRecorder } from "react-media-recorder"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import happy from "../assets/happy.jpg"; 
import sad from "../assets/sad.jpg";   
import fear from "../assets/fear.jpg";
import angry from "../assets/angry.jpg";
import surprised from "../assets/Surprised.jpg";
import guilt from "../assets/guilt.jpg";
import jelous from "../assets/jelous.jpg";
import disgust from "../assets/disgust.jpg";
import pride from "../assets/pride.jpg";
import shame from "../assets/shame.jpg";
import love from "../assets/love.jpg";
import calm from "../assets/calm.jpg";
import axios from "axios";  
const emotions = [
    "Happy", "Sad", "Angry", "Fear", "Surprised", "Disgust", "Jealousy", "Guilt", "Embarrassed",
    "Love", "Pride", "Shame", "Excited", "Bored", "Calm", "Anxious", "Grateful", "Lonely", "Hopeful",
    "Frustrated", "Confident", "Resentful", "Compassion", "Amazed", "Curious", "Regret", "Disappointed",
    "Relaxed", "Nostalgic", "Serene"
];

const questions = [
    "How are you feeling today?",
    "Can you describe what made you feel this way?",
    "What do you think will help you feel better?"
];

const emotionImages = {
    Happy: happy ,
    Sad: sad ,
    Angry: "https://example.com/angry.jpg",
    Fear: fear,
    Jealousy: jelous,
    Guilt: guilt,   
    Disgust: disgust,
    Angry: angry,
    Surprised: surprised,   
    Embarrassed: "https://example.com/embarrassed.jpg",
    Love: love,
    Pride: pride,
    Shame: shame,
    Calm: calm,


    // Add images for other emotions
};


const FindEmotion = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    //onst [mediaBlobUrl, setMediaBlobUrl] = useState(null);
    const recognitionRef = useRef(null);
    const [listening, setListening] = useState(false);
const [yogas, setYogas] = useState([]); 
    useEffect(() => {   
             const getDescription = async () => {   
                      try{
                        console.log("hey",yogas);
                        const response = await axios.get("http://localhost:5000/api/description");
                        console.log("hey",response.data);
                         setYogas(response.data);
                      }
                      catch(err){
                        console.error(err);
                      }
             }
             getDescription();
    }, [])  







    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const startListening = () => {
        if (!SpeechRecognition) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setAnswers((prev) => [...prev, transcript]);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
        recognitionRef.current = recognition;
        setListening(true);
    };

    const speakQuestion = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => startListening();
        speechSynthesis.speak(utterance);
    };

    const startRecordingWithQuestion = (startRecording) => {
        setCurrentQuestion(0);
        setAnswers([]);
        speakQuestion(questions[0]);
        startRecording();
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            speakQuestion(questions[currentQuestion + 1]);
        }
    };

    const handleSubmit = async (blobUrl) => {
        const formData = new FormData();
        const blob = await fetch(blobUrl).then((res) => res.blob());
        formData.append("video", blob);
        formData.append("transcript", JSON.stringify(answers));

        fetch("http://localhost:5000/api/analyze", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) =>{        toast.success("🎉 Analysis Complete: " + data.result, { position: "top-right" });
} )
        .catch((error) => toast.error("❌ Error: " + error.message, { position: "top-right" }));
    };
 const  filteredEmotions = emotions.filter((emotion) =>
        emotion.toLowerCase().includes(search.toLowerCase())
    );  

    return (
        <Container>
                  <ToastContainer />

            <Box display="flex" justifyContent="space-between" my={3}>
                <TextField
                    label="Search Emotion"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 2 }}
                    onClick={() => setModalOpen(true)}
                >
                    Can't Find Your Emotion?
                </Button>
            </Box>

            <Grid container spacing={3}>
                {filteredEmotions.map((emotion, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card>
                        <CardActionArea onClick={() =>{
                         const yogaData = yogas.find((item) => item.emotion === emotion);

                        navigate(`/description`, { state: { emotions: yogaData } })}
                        } >
                        <CardMedia
                                    component="img"
                                    height="140"
                                    image = { emotionImages[emotion] || "https://example.com/default.jpg" } 
                                    alt={emotion}
                                />
                                <CardContent>
                                    <Typography variant="h6" align="center">{emotion}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={{ width: 400, p: 3, bgcolor: "white", mx: "auto", mt: 5, borderRadius: 2 }}>
                    <Typography variant="h6" align="center">Emotion Analysis</Typography>
                    <Typography variant="body2" align="center">Please answer the following questions using your voice.</Typography>

                    <ReactMediaRecorder
                        video
                        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                            <Box textAlign="center">
                                <Typography variant="h6" sx={{ mt: 2 }}>{questions[currentQuestion]}</Typography>
                                
                                <Button 
                                    variant="contained" 
                                    sx={{ mt: 2, mr: 1 }} 
                                    onClick={() =>{
                                     startRecordingWithQuestion(startRecording)
                                             toast.info("🎤 Recording started!", { position: "bottom-left" });
                                          }
                                     }
                                    disabled={listening}
                                >
                                    Start Recording
                                </Button>

                                <Button 
                                    variant="contained" 
                                    sx={{ mt: 2, mr: 1 }} 
                                    onClick={nextQuestion} 
                                    disabled={listening || currentQuestion >= questions.length - 1}
                                >
                                    Next Question
                                </Button>

                                <Button 
                                    variant="contained" 
                                    sx={{ mt: 2 }} 
                                    onClick={() => {
                                 stopRecording();
                                 toast.warn("🛑 Recording stopped!", { position: "bottom-left" });
                                    }}
                                >
                                    Stop Recording
                                </Button>

                                {mediaBlobUrl && (
                                    <video src={mediaBlobUrl} controls autoPlay style={{ width: "100%", marginTop: 10 }} />
                                )}
                                
                                {mediaBlobUrl && (
                                    <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => handleSubmit(mediaBlobUrl)}>
                                        Analyze Emotion
                                    </Button>
                                )}
                            </Box>
                        )}
                    />
                </Box>
            </Modal>
        </Container>
    );
};

export default FindEmotion;
