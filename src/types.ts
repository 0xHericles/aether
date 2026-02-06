export interface AetherNeuralMap {
  nodes: { id: string; label: string; group: number; val: number }[];
  links: { source: string; target: string; weight: number }[];
}

export interface AetherStorage {
  init(): Promise<void>;
  activate(source: string, target: string, strength: number): Promise<void>;
  getNeuralMap(): Promise<AetherNeuralMap>;
  getNodeContent?(id: string): Promise<string | null>;
}
