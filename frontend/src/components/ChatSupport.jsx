import React, { useState } from "react";
import axios from "axios";
import { 
    IconButton, TextField, Button, Typography, Paper, Box, Fab 
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const ChatSupport = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const response = await axios.post("http://localhost:5000/chat", { message });
            setChat([...chat, { user: message, bot: response.data.botResponse }]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <Fab 
                color="secondary" 
                aria-label="chat" 
                onClick={() => setIsChatOpen(!isChatOpen)} 
                sx={{ 
                    position: "fixed", 
                    bottom: 20, 
                    right: 20, 
                    backgroundColor: "#86C6F4", // Light blue for a soothing feel
                    "&:hover": { backgroundColor: "#5AA3D4" }
                }}
            >
                {isChatOpen ? <CloseIcon /> : <ChatIcon />}
            </Fab>

            {/* Chat Window */}
            {isChatOpen && (
                <Paper 
                    elevation={5} 
                    sx={{ 
                        position: "fixed", 
                        bottom: 80, 
                        right: 20, 
                        width: 320, 
                        p: 2, 
                        borderRadius: 3, 
                        backgroundColor: "#F1F8FF", // Soft blue background
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    {/* Greeting Message */}
                    <Typography 
                        variant="h6" 
                        textAlign="center" 
                        fontWeight="bold" 
                        sx={{ color: "#2C3E50", mb: 1 }}
                    >
                        Hi! I'm your friend 🤗 <br /> Share what you feel...
                    </Typography>

                    {/* Chat Messages */}
                    <Box 
                        sx={{ 
                            height: 250, 
                            overflowY: "auto", 
                            p: 1, 
                            backgroundColor: "white", 
                            borderRadius: 2, 
                            border: "1px solid #ddd", 
                            mb: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}
                    >
                        {chat.map((c, i) => (
                            <Box key={i} sx={{ display: "flex", flexDirection: "column" }}>
                                {/* User Message */}
                                <Box sx={{ 
                                    alignSelf: "flex-end",
                                    backgroundColor: "#A5D6A7", // Soft green for user messages
                                    color: "#2C3E50",
                                    padding: "8px 12px",
                                    borderRadius: "12px 12px 0px 12px",
                                    maxWidth: "75%",
                                    fontSize: "0.9rem"
                                }}>
                                    <strong>You:</strong> {c.user}
                                </Box>

                                {/* Bot Message */}
                                <Box sx={{ 
                                    alignSelf: "flex-start",
                                    backgroundColor: "#E3F2FD", // Light blue for bot responses
                                    color: "#2C3E50",
                                    padding: "8px 12px",
                                    borderRadius: "12px 12px 12px 0px",
                                    maxWidth: "75%",
                                    fontSize: "0.9rem",
                                    mt: 1
                                }}>
                                    <strong>Bot:</strong> {c.bot}
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Input Field and Send Button */}
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            fullWidth
                            label="Type a message..."
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: 1 }}
                        />
                        <IconButton 
                            color="primary" 
                            onClick={sendMessage}
                            sx={{ 
                                backgroundColor: "#5AA3D4", 
                                "&:hover": { backgroundColor: "#3E8CCF" },
                                color: "white"
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatSupport;

