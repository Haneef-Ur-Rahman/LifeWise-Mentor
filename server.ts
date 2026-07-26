import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_PROMPT = `You are a wise, kind, and practical life mentor with 20 years of experience as a psychologist and career coach. 
Your advice should be:
1. Practical and actionable (not just philosophical)
2. Encouraging and warm
3. Specific to the user's situation
4. Keep response between 100-200 words
5. If the user asks about career, give specific steps. If about relationships, give empathy + action steps. If motivation, give a powerful reminder.
Never give harmful, dangerous, or medical advice.`;

app.post("/api/advice", async (req, res) => {
  try {
    const { question, adviceType } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Please enter a question or problem." });
    }

    const type = adviceType || "General";
    const userPrompt = `[Advice Focus Area: ${type}]\nUser's question/problem: "${question.trim()}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const adviceText = response.text ? response.text.trim() : "";

    if (!adviceText) {
      return res.status(500).json({ error: "The mentor was unable to formulate a response at this time. Please try again." });
    }

    return res.json({ advice: adviceText });
  } catch (err: any) {
    console.error("Error generating advice:", err);
    return res.status(500).json({ 
      error: err.message || "An unexpected error occurred while reaching out to LifeWise Mentor." 
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LifeWise Mentor server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
