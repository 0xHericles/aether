import Database from "better-sqlite3";
import { AetherStorage, AetherNeuralMap } from "../types";

export class SqliteProvider implements AetherStorage {
  private db: Database.Database;

  constructor(path: string) {
    this.db = new Database(path);
  }

  async init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS synapses (
        source TEXT,
        target TEXT,
        weight REAL DEFAULT 1.0,
        last_activated DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (source, target)
      );
    `);
  }

  async activate(source: string, target: string, strength: number) {
    const [s, t] = [source, target].sort();
    const stmt = this.db.prepare(`
      INSERT INTO synapses (source, target, weight, last_activated)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(source, target) DO UPDATE SET
        weight = weight + ?,
        last_activated = CURRENT_TIMESTAMP
    `);
    stmt.run(s, t, strength, strength);
  }

  async getNeuralMap(): Promise<AetherNeuralMap> {
    const rows = this.db.prepare("SELECT * FROM synapses").all() as any[];
    const nodesMap = new Map<string, any>();
    const links = rows.map(r => {
      if (!nodesMap.has(r.source)) nodesMap.set(r.source, { id: r.source, label: r.source, group: 1, val: 10 });
      if (!nodesMap.has(r.target)) nodesMap.set(r.target, { id: r.target, label: r.target, group: 1, val: 10 });
      
      // Update node weight based on connection count
      nodesMap.get(r.source).val += 2;
      nodesMap.get(r.target).val += 2;

      return { source: r.source, target: r.target, weight: r.weight };
    });

    return {
      nodes: Array.from(nodesMap.values()),
      links
    };
  }
}
