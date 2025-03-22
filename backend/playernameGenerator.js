import SQLite from "better-sqlite3";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";

const db = new SQLite("./db/database.db", { verbose: console.log });

function generateUniquePlayername(maxAttempts = 50) {
  for (let attempt = 0; attempt < maxAttempts; ++attempt) {
    const randomPlayername = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
      style: "capital",
    });

    const existingPlayer = db
      .prepare("SELECT id FROM players WHERE playername = ?")
      .get(randomPlayername);

    if (!existingPlayer || randomPlayername.includes("sexual")) {
      return randomPlayername;
    }
  }

  return `${uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    style: "capital",
  })}-${uuidv4()}`;
}
export default generateUniquePlayername;
