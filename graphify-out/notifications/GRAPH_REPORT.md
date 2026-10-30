# Graph Report - medusa  (2026-10-30)

## Corpus Check
- 48 files · ~1,500,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 419 nodes · 540 edges · 73 communities (13 shown, 60 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Provider Infrastructure
- Medusa Cloud Email Provider
- Core Framework Imports
- Notification Provider Service
- Admin Notification API
- Provider Infrastructure
- Database Migrations
- Core Framework Imports
- Configuration Types
- TypeScript Config
- Configuration Types
- notification-local.ts
- notification-sendgrid.ts
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- Release Changelog
- README.md

## God Nodes (most connected - your core abstractions)
1. `@medusajs/notification` - 75 edges
2. `scripts` - 11 edges
3. `NotificationModuleService` - 9 edges
4. `NotificationProviderService` - 9 edges
5. `NotificationProvider` - 7 edges
6. `Notification` - 6 edges
7. `paths` - 6 edges
8. `NotificationDTO` - 6 edges
9. `MedusaCloudEmailNotificationProvider` - 5 edges
10. `CreateNotificationDTO` - 5 edges

## Surprising Connections (you probably didn't know these)
- `MedusaCloudEmailNotificationProvider` --references--> `MedusaCloudEmailOptions`  [EXTRACTED]
  packages/modules/notification/src/providers/medusa-cloud-email.ts → packages/modules/notification/src/types/index.ts
- `NotificationModuleService` --references--> `Notification`  [EXTRACTED]
  packages/modules/notification/src/services/notification-module-service.ts → packages/modules/notification/src/models/notification.ts
- `NotificationModuleService` --references--> `NotificationProviderService`  [EXTRACTED]
  packages/modules/notification/src/services/notification-module-service.ts → packages/modules/notification/src/services/notification-provider.ts
- `NotificationProviderService` --references--> `NotificationProvider`  [EXTRACTED]
  packages/modules/notification/src/services/notification-provider.ts → packages/modules/notification/src/models/notification-provider.ts
- `CreateNotificationDTO` --references--> `Attachment`  [EXTRACTED]
  packages/core/types/src/notification/mutations.ts → packages/core/types/src/notification/common.ts

## Import Cycles
- 2-file cycle: `packages/modules/notification/src/models/notification-provider.ts -> packages/modules/notification/src/models/notification.ts -> packages/modules/notification/src/models/notification-provider.ts`

## Communities (73 total, 60 thin omitted)

### Community 0 - "Provider Infrastructure"
Cohesion: 0.07
Nodes (10): notifyOnFailureStep, notifyOnFailureStepId, NotifyOnFailureStepInput, sendNotificationsStep, sendNotificationsStepId, SendNotificationsStepInput, discoveryPath, moduleOptions (+2 more)

### Community 1 - "Medusa Cloud Email Provider"
Cohesion: 0.08
Nodes (12): NotificationProviderServiceFixtures, services, syncDatabaseProviders(), validateProviders(), MedusaCloudEmailNotificationProvider, InitializeModuleInjectableDependencies, MedusaCloudEmailOptions, @medusajs/types (+4 more)

### Community 2 - "Core Framework Imports"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 3 - "Notification Provider Service"
Cohesion: 0.10
Nodes (7): Notification, NotificationProvider, InjectedDependencies, NotificationModuleService, InjectedDependencies, NotificationProviderService, Provider

### Community 4 - "Admin Notification API"
Cohesion: 0.07
Nodes (11): adminNotificationRoutesMiddlewares, defaultAdminNotificationFields, Entities, notification, listTransformQueryConfig, retrieveTransformQueryConfig, AdminGetNotificationParams, AdminGetNotificationParamsType (+3 more)

### Community 5 - "Provider Infrastructure"
Cohesion: 0.09
Nodes (12): Attachment, FilterableNotificationProps, NotificationContent, NotificationDTO, NotificationProviderDTO, CreateNotificationDTO, INotificationProvider, ProviderSendNotificationDTO (+4 more)

### Community 6 - "Database Migrations"
Cohesion: 0.09
Nodes (7): Migration20240509083918_InitialSetupMigration, Migration20240628075401, Migration20240830094712, Migration20250120110514, Migration20251028172715, Migration20251121123942, Migration20251121150408

### Community 7 - "Core Framework Imports"
Cohesion: 0.12
Nodes (16): 2.0.1, 2.0.2, 2.0.3, 2.0.4, 2.0.6, 2.0.7, 2.1.0, 2.1.1 (+8 more)

### Community 8 - "Configuration Types"
Cohesion: 0.15
Nodes (3): config, configAsMap, HandlerConfig

### Community 9 - "TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, paths, extends, @models, @repositories, @services, @types, @utils (+1 more)

### Community 13 - "Release Changelog"
Cohesion: 0.67
Nodes (3): 2.0.0, Major Changes, Patch Changes

### Community 14 - "Release Changelog"
Cohesion: 0.67
Nodes (3): 2.13.0, Minor Changes, Patch Changes

### Community 15 - "Release Changelog"
Cohesion: 0.67
Nodes (3): 2.4.0, Minor Changes, Patch Changes

## Knowledge Gaps
- **149 isolated node(s):** `Patch Changes`, `Patch Changes`, `Patch Changes`, `Patch Changes`, `Patch Changes` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 237 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/notification` connect `Core Framework Imports` to `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`, `Release Changelog`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `Patch Changes`, `Patch Changes`, `Patch Changes` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Provider Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.07017543859649122 - nodes in this community are weakly interconnected._
- **Should `Medusa Cloud Email Provider` be split into smaller, more focused modules?**
  _Cohesion score 0.07507507507507508 - nodes in this community are weakly interconnected._
- **Should `Core Framework Imports` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `Notification Provider Service` be split into smaller, more focused modules?**
  _Cohesion score 0.09682539682539683 - nodes in this community are weakly interconnected._
- **Should `Admin Notification API` be split into smaller, more focused modules?**
  _Cohesion score 0.07058823529411765 - nodes in this community are weakly interconnected._