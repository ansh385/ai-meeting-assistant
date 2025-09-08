// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Setup OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // <-- your API key in .env
});
const openai = new OpenAIApi(configuration);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend running for AI Meeting Assistant");
});

// Summarize meeting notes
app.post("/summarize", async (req, res) => {
  try {
    const { transcript } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a meeting assistant." },
        { role: "user", content: `Summarize this meeting: ${transcript}` },
      ],
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
