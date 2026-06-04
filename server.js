const  express = require('express');
const  cors = require('cors');
const  mongoose = require('mongoose');
require('dotenv').config(); // Environment variables load karne ke liye
const  Query = require('./models/query'); // Query model import karna

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON data parse karne ke liye


app.post("/api/queries", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required." 
      });
    }

    // Save to Database
    const newQuery = await Query.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your query has been submitted successfully. Our secretariat will contact you soon.",
      data: newQuery,
    });

  } catch (error) {
    console.error("Error submitting query:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("Database connection error:", err));

  // app.listen(5000, () => console.log("Server running on port 5000"));