require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(bodyParser.json());


// MongoDB Setup
mongoose.connect(process.env.MONGO_URI);

app.use("/authRoute", require("./routes/authRoute"));   
app.use("/api", require("./routes/analyze"));
app.use("/api/description", require("./routes/description"));
 // Import your API routes here
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
