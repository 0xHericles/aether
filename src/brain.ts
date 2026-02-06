import { AetherStorage, AetherNeuralMap } from "./types";

/**
 * AETHER Brain
 * The core engine that manages the self-learning neural graph.
 */
export class AetherBrain {
  private storage: AetherStorage;

  constructor(storage: AetherStorage) {
    this.storage = storage;
  }

  async init() {
    await this.storage.init();
    console.log("[AETHER] Core initialized.");
  }

  /**
   * Activates a connection between two context nodes.
   */
  async activate(source: string, target: string, strength = 0.1) {
    await this.storage.activate(source, target, strength);
  }

  /**
   * Gets the current neural map for 3D visualization.
   */
  async getNeuralMap(): Promise<AetherNeuralMap> {
    return this.storage.getNeuralMap();
  }

  /**
   * Semantic Discovery: Finds the most relevant context nodes
   * for a given seed, following the strongest synapses.
   */
  async getContextPackage(seed: string, options = { depth: 1, limit: 5 }) {
    const map = await this.storage.getNeuralMap();
    // Logic to traverse and pick strongest neighbors
    const synapses = map.links.filter(l => l.source === seed || l.target === seed);
    return synapses
      .sort((a, b) => b.weight - a.weight)
      .slice(0, options.limit)
      .map(l => l.source === seed ? l.target : l.source);
  }
}
