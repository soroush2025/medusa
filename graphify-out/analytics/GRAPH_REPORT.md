# Graph Report - medusa  (2026-10-29)

## Corpus Check
- 21 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 140 nodes · 165 edges · 13 communities (8 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Package Manifest Metadata
- Framework Core & Test Fixtures
- Core Types & Service Definitions
- Analytics Service Implementation
- Module Configuration Options
- Build Scripts
- TypeScript Path Aliases
- Jest Test Config
- Analytics Type Definitions
- Analytics Module Entry
- Analytics Local Module Entry
- Analytics Posthog Module Entry

## God Nodes (most connected - your core abstractions)
1. `AnalyticsProviderService` - 9 edges
2. `AnalyticsService` - 7 edges
3. `scripts` - 7 edges
4. `IAnalyticsProvider` - 6 edges
5. `AnalyticsProviderServiceFixtures` - 5 edges
6. `repository` - 4 edges
7. `IdentifyAnalyticsEventDTO` - 4 edges
8. `IAnalyticsModuleService` - 4 edges
9. `TrackAnalyticsEventDTO` - 4 edges
10. `paths` - 3 edges

## Surprising Connections (you probably didn't know these)
- `AnalyticsService` --references--> `AnalyticsProviderService`  [EXTRACTED]
  src/services/analytics-service.ts → src/services/provider-service.ts

## Import Cycles
- None detected.

## Communities (13 total, 5 thin omitted)

### Community 0 - "Package Manifest Metadata"
Cohesion: 0.08
Nodes (25): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+17 more)

### Community 1 - "Framework Core & Test Fixtures"
Cohesion: 0.12
Nodes (3): AnalyticsProviderServiceFixtures, services, moduleOptions

### Community 2 - "Core Types & Service Definitions"
Cohesion: 0.16
Nodes (4): InjectedDependencies, AnalyticsProviderIdentifierRegistrationName, AnalyticsProviderRegistrationPrefix, InjectedDependencies

### Community 4 - "Analytics Service Implementation"
Cohesion: 0.17
Nodes (3): AnalyticsService, AnalyticsProviderService, IAnalyticsProvider

### Community 5 - "Module Configuration Options"
Cohesion: 0.29
Nodes (3): AnalyticsModuleOptions, @medusajs/types, ModuleOptions

### Community 6 - "Build Scripts"
Cohesion: 0.29
Nodes (7): scripts, build, resolve:aliases, test, test:integration, watch, watch:test

### Community 7 - "TypeScript Path Aliases"
Cohesion: 0.29
Nodes (6): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @services, @types

### Community 11 - "Analytics Type Definitions"
Cohesion: 0.14
Nodes (9): IdentifyActorDTO, IdentifyAnalyticsEventDTO, IdentifyGroupDTO, TrackAnalyticsEventDTO, ProviderIdentifyAnalyticsEventDTO, ProviderTrackAnalyticsEventDTO, LocalAnalyticsServiceOptions, PosthogAnalyticsServiceOptions (+1 more)

## Knowledge Gaps
- **3 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 86 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AnalyticsProviderService` connect `Analytics Service Implementation` to `Core Types & Service Definitions`, `Module Dependency Injection`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Manifest Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `IAnalyticsProvider` connect `Analytics Service Implementation` to `Analytics Type Definitions`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `Framework Core & Test Fixtures` be split into smaller, more focused modules?**
  _Cohesion score 0.11578947368421053 - nodes in this community are weakly interconnected._
- **Why does `AnalyticsService` connect `Analytics Service Implementation` to `Framework Core & Test Fixtures`, `Core Types & Service Definitions`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `Analytics Type Definitions` be split into smaller, more focused modules?**
  _Cohesion score 0.1380952380952381 - nodes in this community are weakly interconnected._