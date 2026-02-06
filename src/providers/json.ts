import fs from "fs/promises";
import { AetherStorage, AetherNeuralMap } from "../types";

export class JsonProvider implements AetherStorage {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async init() {
    try {
      await fs.access(this.path);
    } catch {
      await fs.writeFile(this.path, JSON.stringify({ synapses: [] }, null, 2));
    }
  }

  async activate(source: string, target: string, strength: number) {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const [s, t] = [source, target].sort();
    
    const existing = data.synapses.find((syn: any) => syn.source === s && syn.target === t);
    if (existing) {
      existing.weight += strength;
    } else {
      data.synapses.push({ source: s, target: t, weight: strength });
    }
    
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getNeuralMap(): Promise<AetherNeuralMap> {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const nodesMap = new Map<string, any>();
    
    data.synapses.forEach((r: any) => {
      if (!nodesMap.has(r.source)) nodesMap.set(r.source, { id: r.source, label: r.source, group: 1, val: 10 });
      if (!nodesMap.has(r.target)) nodesMap.set(r.target, { id: r.target, label: r.target, group: 1, val: 10 });
      nodesMap.get(r.source).val += 1;
      nodesMap.get(r.target).val += 1;
    });

    return {
      nodes: Array.from(nodesMap.values()),
      links: data.synapses
    };
  }
}
