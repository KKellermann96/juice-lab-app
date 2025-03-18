import express from "express";
import cors from "cors";
import SQLite from "better-sqlite3";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import generateUniquePlayername from "./playernameGenerator.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const db = new SQLite("database.db", { verbose: console.log });

const createTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS highscore (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    timestamp INTEGER NOT NULL
  )
`);
createTable.run();

const createPlayerTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    playername TEXT NOT NULL
  )
`);
createPlayerTable.run();

app.get("/playername", (req, res) => {
  let playerId = req.cookies.playerId;

  if (playerId) {
    // Check if the player exists in the DB
    const player = db
      .prepare("SELECT playername FROM players WHERE id = ?")
      .get(playerId);
    if (player) {
      return res.json({ playername: player.playername });
    }
  }

  // Generate new ID and random playername
  playerId = uuidv4();
  const randomPlayername = generateUniquePlayername();

  // Store in the database
  db.prepare("INSERT INTO players (id, playername) VALUES (?, ?)").run(
    playerId,
    randomPlayername
  );

  res.cookie("playerId", playerId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 94608000000,
  });

  res.json({ playername: randomPlayername });
});

app.get("/highscores", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM highscore ORDER BY score DESC");
    const highscores = stmt.all();
    res.json(highscores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch highscores" });
  }
});

app.post("/highscores", (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  const timestamp = Date.now();
  const date = new Date(timestamp);

  const formattedDate =
    date.toLocaleDateString("de-DE") + " " + date.toLocaleTimeString("de-DE");

  try {
    // Check if the player already exists in the database
    const selectStmt = db.prepare("SELECT * FROM highscore WHERE name = ?");
    const existingPlayer = selectStmt.get(name);

    if (existingPlayer) {
      // If player exists, update the score and timestamp
      const updateStmt = db.prepare(`
        UPDATE highscore
        SET score = ?, timestamp = ?
        WHERE name = ?
      `);
      updateStmt.run(score, formattedDate, name);
      return res
        .status(200)
        .json({ message: "High score updated successfully" });
    } else {
      // If player does not exist, insert a new record
      const insertStmt = db.prepare(`
        INSERT INTO highscore (name, score, timestamp)
        VALUES (?, ?, ?)
      `);
      insertStmt.run(name, score, formattedDate);
      return res.status(201).json({ message: "High score added successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert or update high score" });
  }
});

app.delete("/highscores", (req, res) => {
  try {
    const deleteAllStmt = db.prepare("DELETE FROM highscore");
    deleteAllStmt.run();
    res.status(200).json({ message: "All high scores deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete all high scores" });
  }
});

app.delete("/highscores/:id", (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    // Check if the high score exists
    const selectStmt = db.prepare("SELECT * FROM highscore WHERE id = ?");
    const existingScore = selectStmt.get(id);

    if (!existingScore) {
      return res.status(404).json({ error: "High score not found" });
    }

    // Delete the high score by ID
    const deleteStmt = db.prepare("DELETE FROM highscore WHERE id = ?");
    deleteStmt.run(id);

    res
      .status(200)
      .json({ message: `High score with ID ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete high score" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
