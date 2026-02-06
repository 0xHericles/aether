# Genesis Plan: AETHER Pluggable Storage Layer 🦞⚙️

**Goal**: Transform AETHER from a hard-coded SQLite project into a modular system where storage backends are pluggable and agnostic.

## 1. The Interface Definition (`AetherStorage`)
We will define a strict TypeScript interface that all storage providers must implement. This ensures the core logic remains clean and swappable.

```ts
interface AetherStorage {
  init(): Promise<void>;
  activate(source: string, target: string, strength: number): Promise<void>;
  getNeuralMap(): Promise<{ nodes: any[], links: any[] }>;
}
```

## 2. Decoupled Architecture
- **Aether Core**: Handles the high-level logic (synapse growth formulas, context routing, 3D mapping).
- **Aether Providers**: Isolated modules for specific databases.
  - `SqliteProvider` (Default): For high-performance local use.
  - `JsonProvider`: For zero-dependency, human-readable storage.
  - `MemoryProvider`: For transient testing/sandboxes.

## 3. Configuration & Factory
Implement a `StorageFactory` that picks the provider based on environment variables or a config object.
- `AETHER_STORAGE_TYPE=sqlite`
- `AETHER_STORAGE_PATH=./aether.db`

## 4. Roadmap (~plan)
- [ ] **Phase 1**: Define `src/types/storage.ts` interface.
- [ ] **Phase 2**: Refactor current logic into `src/providers/sqlite.ts`.
- [ ] **Phase 3**: Update `AetherBrain` to accept any `AetherStorage` implementation via Dependency Injection.
- [ ] **Phase 4**: Implement `JsonProvider` as a proof of modularity.

## 5. Vision: The "Agnostic Brain"
By making storage pluggable, AETHER becomes a library that can be integrated into any agent stack, from a simple script to a large-scale Kubernetes agent cluster.
