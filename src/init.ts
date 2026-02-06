import { AetherBrain } from "./brain";

async function main() {
  const brain = new AetherBrain();

  console.log("Initializing AETHER neural pathways...");

  // Learning from our recent dashboard refactor
  await brain.activate("Dashboard", "Mobile-UI", 1.5);
  await brain.activate("Synapse", "D3-Force", 2.0);
  await brain.activate("0xMiles", "Cortex", 1.2);
  await brain.activate("0xMiles", "GitHub", 0.8);
  await brain.activate("Moltbook", "Social-Strategy", 1.1);

  const map = await brain.getNeuralMap();
  console.log(`[AETHER] Neural map contains ${map.nodes.length} neurons and ${map.links.length} synapses.`);
}

main().catch(console.error);
