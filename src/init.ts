import { AetherBrain } from "./brain";
import { SqliteProvider } from "./providers/sqlite";
import path from "path";

async function main() {
  // Initialize with SQLite Provider
  const dbPath = path.join(__dirname, "../aether.db");
  const storage = new SqliteProvider(dbPath);
  const brain = new AetherBrain(storage);

  await brain.init();

  console.log("[AETHER] Learning from environment...");

  // Registering initial concept relationships
  await brain.activate("Core", "Strategy", 2.0);
  await brain.activate("Core", "Logic", 2.0);
  await brain.activate("Execution", "Shell", 1.5);
  await brain.activate("AETHER", "3D-Visualization", 3.0);
  await brain.activate("0xMiles", "Héricles", 5.0);

  const map = await brain.getNeuralMap();
  console.log(`[AETHER] State: ${map.nodes.length} concepts connected via ${map.links.length} synapses.`);
}

main().catch(console.error);
