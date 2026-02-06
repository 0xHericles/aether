import express from "express";
import path from "path";
import { AetherBrain } from "./brain";
import { SqliteProvider } from "./providers/sqlite";

const app = express();
const port = process.env.PORT || 3001;

const dbPath = path.join(__dirname, "../aether.db");
const storage = new SqliteProvider(dbPath);
const brain = new AetherBrain(storage);

app.use(express.json());

// Enable CORS for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/map", async (req, res) => {
  try {
    const map = await brain.getNeuralMap();
    res.json(map);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/api/activate", async (req, res) => {
  const { source, target, strength } = req.body;
  try {
    await brain.activate(source, target, strength);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`[AETHER] API Server running at http://localhost:${port}`);
});
