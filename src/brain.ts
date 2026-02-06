import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(__dirname, "../aether.db");
const db = new Database(DB_PATH);

interface Synapse {
  source: string;
  target: string;
  weight: number;
}

/**
 * AETHER Brain
 * Manages the self-learning neural graph.
 */
export class AetherBrain {
  /**
   * Activates a connection between two context nodes.
   * If the connection exists, its weight increases.
   */
  async activate(source: string, target: string, strength = 0.1) {
    const stmt = db.prepare(`
      INSERT INTO synapses (source, target, weight, last_activated)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(source, target) DO UPDATE SET
        weight = weight + ?,
        last_activated = CURRENT_TIMESTAMP
    `);
    
    // Sort to ensure undirected consistency
    const [s, t] = [source, target].sort();
    stmt.run(s, t, strength, strength);
    console.log(`[AETHER] Synapse activated: ${s} <-> ${t}`);
  }

  /**
   * Gets the neural map for 3D rendering.
   */
  async getNeuralMap() {
    const rows = db.prepare("SELECT * FROM synapses WHERE weight > 0.5").all() as any[];
    const nodes = new Set<string>();
    const links = rows.map(r => {
      nodes.add(r.source);
      nodes.add(r.target);
      return { source: r.source, target: r.target, weight: r.weight };
    });

    return {
      nodes: Array.from(nodes).map(id => ({ id, label: id })),
      links
    };
  }
}
