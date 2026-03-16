const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

function buildFallbackAdvice(message, stats) {
  const totals = stats?.totals || {};
  const weakAreas = [];

  if ((totals.writing || 0) < 5) weakAreas.push("writing task practice");
  if ((totals.speaking_minutes || 0) < 120) weakAreas.push("daily speaking fluency work");
  if ((totals.vocabulary_count || 0) < 50) weakAreas.push("vocabulary expansion");

  const focus = weakAreas.length > 0 ? weakAreas.join(", ") : "balanced skill maintenance";

  return [
    `You asked: ${message}`,
    "I am currently using local guidance because no AI provider is configured.",
    `Based on your recent stats, focus on ${focus}.`,
    "Use a 7-day cycle: 2 writing tasks, 3 listening sets, 3 reading passages, and 20-30 minutes speaking daily.",
  ].join("\n");
}

router.post("/chat", async (req, res) => {
  try {
    const { message, stats } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const apiKey = process.env.AI_API_KEY;
    const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();

    if (!apiKey) {
      return res.json({ reply: buildFallbackAdvice(message, stats) });
    }

    const prompt = [
      "You are an IELTS study coach.",
      "Provide concise, actionable advice in bullet-style plain text.",
      `Student message: ${message}`,
      `Student stats JSON: ${JSON.stringify(stats || {})}`,
    ].join("\n");

    if (provider === "gemini") {
      const model = process.env.AI_MODEL || "gemini-1.5-flash";
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Gemini API failed: ${text}`);
      }

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("\n") ||
        "No response from AI";

      return res.json({ reply });
    }

    const model = process.env.AI_MODEL || "gpt-4o-mini";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are an IELTS study coach." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenAI API failed: ${text}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No response from AI";

    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({ message: error.message || "AI request failed" });
  }
});

module.exports = router;
