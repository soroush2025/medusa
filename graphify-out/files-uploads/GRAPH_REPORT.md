# Graph Report - staging  (2026-10-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 242 nodes · 319 edges · 17 communities (8 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Package Configuration & Module References
- File Module Service Setup
- File Module Service Implementation
- Provider Registration & Module Loading
- File Module Integration & Joiner Config
- Package Scripts & Tooling
- TypeScript Path Configuration
- File Provider Service Fixtures
- Jest Configuration
- File Module Service Interface & DTOs
- File Provider Interface
- Local & S3 Provider Options
- Upload Route Middlewares
- File Module Entry
- Local File Provider Entry
- S3 File Provider Entry

## God Nodes (most connected - your core abstractions)
1. `FileModuleService` - 16 edges
2. `FileProviderService` - 13 edges
3. `scripts` - 11 edges
4. `IFileModuleService` - 11 edges
5. `IFileProvider` - 10 edges
6. `FileDTO` - 6 edges
7. `FileProviderServiceFixtures` - 5 edges
8. `paths` - 5 edges
9. `FileAccessPermission` - 5 edges
10. `repository` - 4 edges

## Surprising Connections (you probably didn't know these)
- `FileModuleService` --references--> `FileProviderService`  [EXTRACTED]
  src/services/file-module-service.ts → src/services/file-provider-service.ts
- `CreateFileDTO` --references--> `FileAccessPermission`  [EXTRACTED]
  mutations.ts → common.ts
- `GetUploadFileUrlDTO` --references--> `FileAccessPermission`  [EXTRACTED]
  mutations.ts → common.ts

## Import Cycles
- None detected.

## Communities (17 total, 9 thin omitted)

### Community 0 - "Package Configuration & Module References"
Cohesion: 0.08
Nodes (25): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+17 more)

### Community 1 - "File Module Service Setup"
Cohesion: 0.07
Nodes (10): services, moduleOptions, joinerConfig, InjectedDependencies, InjectedDependencies, DeleteFileType, FileServiceGetUploadStreamResult, FileServiceUploadResult (+2 more)

### Community 2 - "File Module Service Implementation"
Cohesion: 0.12
Nodes (3): registrationFn(), FileModuleService, FileProviderService

### Community 3 - "Provider Registration & Module Loading"
Cohesion: 0.12
Nodes (5): FileModuleOptions, FileProviderIdentifierRegistrationName, FileProviderRegistrationPrefix, @medusajs/types, ModuleOptions

### Community 5 - "Package Scripts & Tooling"
Cohesion: 0.18
Nodes (11): scripts, build, migration:create, migration:initial, migration:up, orm:cache:clear, resolve:aliases, test (+3 more)

### Community 6 - "TypeScript Path Configuration"
Cohesion: 0.22
Nodes (8): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types

### Community 10 - "File Module Service Interface & DTOs"
Cohesion: 0.11
Nodes (13): FileAccessPermission, FileDTO, FilterableFileProps, UploadFileUrlDTO, CreateFileDTO, GetUploadFileUrlDTO, ProviderDeleteFileDTO, ProviderFileResultDTO (+5 more)

### Community 18 - "Upload Route Middlewares"
Cohesion: 0.09
Nodes (9): adminUploadRoutesMiddlewares, upload, defaultAdminUploadFields, Entities, file, retrieveUploadConfig, AdminGetUploadParams, AdminGetUploadParamsType (+1 more)

## Knowledge Gaps
- **4 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`, `file`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 145 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FileModuleService` connect `File Module Service Implementation` to `File Module Service Setup`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Configuration & Module References` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `FileProviderService` connect `File Module Service Implementation` to `File Module Service Setup`, `Provider Registration & Module Loading`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Should `File Module Service Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.06620209059233449 - nodes in this community are weakly interconnected._
- **Why does `IFileProvider` connect `File Provider Interface` to `File Module Service Interface & DTOs`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `File Module Service Implementation` be split into smaller, more focused modules?**
  _Cohesion score 0.11594202898550725 - nodes in this community are weakly interconnected._