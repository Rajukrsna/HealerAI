require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Twilio Setup
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// MongoDB Setup
mongoose.connect(process.env.MONGO_URI);
// MongoDB Message Schema
const MessageSchema = new mongoose.Schema({
  userMessage: String,
  botResponse: String,
  sentiment: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", MessageSchema);

// Sentiment Analysis Function
const detectSentiment = (message) => {
    if (/stress|anxiety|depressed|sad/i.test(message)) return "high";
    if (/tired|worried|nervous|angry/i.test(message)) return "moderate";
    return "low";
};

// Chatbot API Route
app.post("/chat", async (req, res) => {
  const { message, phoneNumber } = req.body;
  const sentiment = detectSentiment(message); // Detect user's mood

  try {
      // Intelligent response strategy
      let prompt = `The user is feeling ${sentiment} level distress. Respond warmly and supportively. \nUser: ${message}\nBot: `;

      // Special responses for high stress levels
      if (sentiment === "high") {
          prompt += "\nAlso, offer a simple relaxation tip like deep breathing.";
      }

      // Call Gemini API
      const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
              contents: [{ parts: [{ text: prompt }] }],
          },
          { headers: { "Content-Type": "application/json" } }
      );

      let botResponse = response.data.candidates[0]?.content?.parts[0]?.text || "I'm here for you. Let's talk.";

      // Personalized Encouragement for Negative Sentiments
      if (sentiment === "high" || sentiment === "moderate") {
          botResponse += "\n💙 Remember, you're stronger than you think. Want a quick relaxation exercise?";
      }

      // Store chat in DB
      await Message.create({ userMessage: message, botResponse, sentiment });

      // 🚨 Emergency SMS Handling - But with Consent
      if (sentiment === "high" && phoneNumber) {
          const smsResponse = await twilioClient.messages.create({
              body: `🚨 Urgent: Your friend may need emotional support. Would you like to check on them?`,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: phoneNumber,
          });
          console.log("Emergency SMS Sent:", smsResponse.sid);
      }

      res.json({ botResponse });
  } catch (error) {
      console.error("Gemini API Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
});

const JournalSchema = new mongoose.Schema({
    text: String,
    mood: Number,
    date: String,
});

const Journal = mongoose.model("Journal", JournalSchema);

app.post("/add-entry", async (req, res) => {
    try {
        const { text, mood } = req.body;
        const newEntry = new Journal({
            text,
            mood,
            date: new Date().toISOString().split("T")[0],
        });
        await newEntry.save();
        res.status(201).json({ message: "Entry saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving entry" });
    }
});

app.get("/get-entries", async (req, res) => {
    try {
        const entries = await Journal.find().sort({ date: 1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Error fetching entries" });
    }
});
// Define the schema
const MeditationPracticeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: [String], required: true },
    videoUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  // Create a model from the schema
  const MeditationPractice = mongoose.model('MeditationPractice', MeditationPracticeSchema);

const videoUrlMapping = {
    "Alternate Nostril Breathing": "https://youtu.be/G8xIEzX40bA",
    "4-7-8 Breathing": "https://youtu.be/G8xIEzX40bA",
    "Loving-Kindness Meditation": "https://youtu.be/G8xIEzX40bA",
  };
 
  
  app.post('/medRecommend', async (req, res) => {
    console.log('Meditation Recommendation API hit');
    
    try {
      const moodDetected = req.body.mood;
      
      // Ensure mood is provided
      if (!moodDetected) {
        return res.status(400).json({ error: "Mood is required" });
      }
  
      // Format the request following Gemini API structure
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are an AI wellness guide. Given the following mood, generate 3 suitable pranayama or meditation practices. 
                The output should be structured in this JSON format:
  
                {
                  "practices": [
                    {
                      "name": "{Practice Name}",
                      "benefits": ["{Benefit 1}", "{Benefit 2}", "{Benefit 3}"],
                      "description": "{Detailed description of the practice}"
                    }
                  ]
                }
  
                **User Mood Provided**: ${moodDetected}
  
                Ensure each practice has a name, benefits, and a step-by-step description.
                Respond only with JSON.`
              }
            ]
          }
        ]
      };
  
      // Call Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      const lines = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      

      // Now use accumulatedDelta directly as a string
      const cleanedData = lines.replace(/```json|```/g, "").trim();      // Remove leading/trailing whitespace
      
      console.log(cleanedData)
      let parsedData;
      try {
        parsedData = JSON.parse(cleanedData);
      } catch (error) {
        console.error("Error parsing AI response:", error);
        return res.status(500).json({ error: "AI response parsing error" });
      }
  
      let updatedPractices = [];
  
      for (const practiceData of parsedData.practices) {
        let existingPractice = await MeditationPractice.findOne({ name: practiceData.name });
  
        const videoUrl = videoUrlMapping[practiceData.name] || "https://www.youtube.com/default_video";
  
        if (!existingPractice) {
          const practice = new MeditationPractice({
            name: practiceData.name,
            description: practiceData.description,
            benefits: practiceData.benefits,
            videoUrl: videoUrl,
          });
          await practice.save();
        } else {
          existingPractice.videoUrl = videoUrl;
          await existingPractice.save();
        }
  
        updatedPractices.push({
          name: practiceData.name,
          description: practiceData.description,
          benefits: practiceData.benefits,
          videoUrl: videoUrl,
        });
      }
  
      res.json({ updatedPractices });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error processing AI request" });
    }
  });


  // User Schema
const userSchema = new mongoose.Schema({
  username: String,
  meditationHistory: [String] // Store meditation dates here
});

const User = mongoose.model("User", userSchema);

// Route to save meditation session date
app.post("/saveMeditation", async (req, res) => {
  const { username } = req.body;
  const today = new Date().toISOString().split("T")[0]; // Get today's date

  try {
    let user = await User.findOne({ username });

    if (!user) {
      // Create new user if not found
      user = new User({ username, meditationHistory: [today] });
    } else {
      // Prevent duplicate entries for the same day
      if (!user.meditationHistory.includes(today)) {
        user.meditationHistory.push(today);
      }
    }

    await user.save();
    res.json({ message: "Meditation session saved!", meditationHistory: user.meditationHistory });
  } catch (error) {
    console.error("Error saving meditation session:", error);
    res.status(500).json({ error: "Server error" });
  }
});


/**
 * Route to get meditation history for a user
 */
app.get("/getMeditationHistory", async (req, res) => {
  const { username } = req.query; // Get username from query parameters
console.log(username)
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
console.log(user.meditationHistory)
    res.json({ meditationHistory: user.meditationHistory });
  } catch (error) {
    console.error("Error fetching meditation history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.use("/api", require("./routes/analyze"));
app.use("/api/description", require("./routes/description"));
 // Import your API routes here
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
