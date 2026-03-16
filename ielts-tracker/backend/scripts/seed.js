const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const StudyProgress = require("../models/StudyProgress");
const Vocabulary = require("../models/Vocabulary");

dotenv.config();

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function runSeed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required in backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const demoEmail = "demo@ielts.com";

    let user = await User.findOne({ email: demoEmail });

    if (!user) {
      user = await User.create({
        name: "Demo User",
        email: demoEmail,
        password: "demo123",
        target_score: 7.5,
      });
    }

    await StudyProgress.deleteMany({ user_id: user._id });
    await Vocabulary.deleteMany({ user_id: user._id });

    const progressDocs = [];
    for (let i = 0; i < 35; i += 1) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      progressDocs.push({
        user_id: user._id,
        date,
        listening: randomInt(0, 2),
        reading: randomInt(0, 2),
        writing: randomInt(0, 2),
        speaking_minutes: randomInt(0, 60),
        vocabulary_count: randomInt(0, 20),
      });
    }

    await StudyProgress.insertMany(progressDocs);

    const words = [
      {
        word: "coherent",
        meaning: "logical and easy to understand",
        example_sentence: "Your essay is coherent and well structured.",
        synonyms: ["clear", "consistent", "logical"],
      },
      {
        word: "meticulous",
        meaning: "very careful about small details",
        example_sentence: "She made meticulous notes while reading.",
        synonyms: ["careful", "thorough", "precise"],
      },
      {
        word: "articulate",
        meaning: "able to express ideas clearly",
        example_sentence: "He is articulate in speaking tasks.",
        synonyms: ["eloquent", "fluent", "expressive"],
      },
      {
        word: "substantial",
        meaning: "large in amount or value",
        example_sentence: "There was substantial evidence in the passage.",
        synonyms: ["considerable", "significant", "major"],
      },
      {
        word: "plausible",
        meaning: "seeming reasonable or probable",
        example_sentence: "That explanation sounds plausible.",
        synonyms: ["credible", "believable", "reasonable"],
      },
    ];

    await Vocabulary.insertMany(words.map((word) => ({ ...word, user_id: user._id })));

    console.log("Seed completed");
    console.log("Demo login email: demo@ielts.com");
    console.log("Demo login password: demo123");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

runSeed();
