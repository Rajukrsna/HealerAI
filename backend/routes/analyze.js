
const router = require("express").Router();
const multer = require("multer");
const Sentiment = require("sentiment");
// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sentiment = new Sentiment();

// API to handle file and transcript processing
router.post("/analyze", upload.single("video"), (req, res) => {
    try {
        // Check if file and transcript are received
        if (!req.file || !req.body.transcript) {
            return res.status(400).json({ error: "Missing video or transcript" });
        }

        // Get transcript from request
        const transcript = JSON.parse(req.body.transcript);
        console.log("Received transcript:", transcript);

        // Perform Sentiment Analysis
        let combinedText = transcript.join(" ");
        let analysis = sentiment.analyze(combinedText);

        // Determine mood based on sentiment score
        let mood = "";
        if (analysis.score > 2) {
            mood = "Happy 😊";
        } else if (analysis.score >= 0) {
            mood = "Neutral 😐";
        } else {
            mood = "Sad 😢";
        }

        console.log("Sentiment Score:", analysis.score);
        console.log("Mood:", mood);

        // Simulate saving video (not actually storing in this example)
        console.log("Received video of size:", req.file.size, "bytes");

        // Send response back to frontend
        res.json({
            result: `Detected Mood: ${mood}`,
            sentimentScore: analysis.score,
            positiveWords: analysis.positive,
            negativeWords: analysis.negative,
        });

    } catch (error) {
        console.error("Error processing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;