// server.js
const cors = require("cors");
const express = require("express");
const axios = require("axios");
// require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

// Route to fetch movie data from OMDB API
app.get("/movies/:title", async (req, res) => {
  try {
    const { title } = req.params;
    console.log("Received request for title:", title);

    const apiKey = process.env.OMDB_API_KEY;
    console.log("API Key:", apiKey);

    //     const apiKey ="53e45db6";

    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=53e45db6&s=${title}`
    );

    const data = response.data;
    console.log("Sending response:", data);
    res.json(data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Something is going wrong" });
  }
});

// Start the server
app.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
