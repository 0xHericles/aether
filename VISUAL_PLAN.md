# Project AETHER: 3D Visualization Component Design (~plan)

**Goal**: Create a high-performance 3D neural graph component using Three.js and react-force-graph-3d.

## 1. Component Structure
- `AetherScene`: The main 3D canvas container.
- `AetherNode`: Custom 3D objects for neurons (spheres with glow shaders).
- `AetherSynapse`: Animated lines with particle flow indicating relationship strength.

## 2. Technical Stack
- **Three.js**: Core 3D engine.
- **react-force-graph-3d**: For physics-based organization in 3D space.
- **ShaderMaterial**: For custom neon/glow effects on nodes.

## 3. Interaction Logic
- **Camera Orbit**: 360-degree rotation around the neural center.
- **Node Selection**: Clicking a node selects it and highlights its synapses.
- **Dynamic Scale**: Nodes grow/shrink based on the 'val' property from the backend.

## 4. Implementation Steps
- [ ] **Step 1**: Create `src/components/AetherGraph.tsx`.
- [ ] **Step 2**: Integrate basic 3D force graph with mock data.
- [ ] **Step 3**: Add custom shaders for the 'Neural Link' aesthetic.
- [ ] **Step 4**: Connect to the live AETHER backend API.
