# Graph Report - tmp.Hr94ohqdeA  (2026-10-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 777 nodes · 1457 edges · 39 communities (24 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 17
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 31
- Community 32
- Community 33
- Community 35
- Community 36
- Community 37
- Community 39

## God Nodes (most connected - your core abstractions)
1. `MedusaModule` - 31 edges
2. `MedusaApp` - 24 edges
3. `MigrationsExecutionPlanner` - 20 edges
4. `Link` - 18 edges
5. `LinkModuleService` - 17 edges
6. `LinkService` - 12 edges
7. `MODULE_SCOPE` - 11 edges
8. `registerMedusaModule()` - 9 edges
9. `scripts` - 8 edges
10. `ILinkModule` - 8 edges

## Surprising Connections (you probably didn't know these)
- `LinkModuleService` --references--> `LinkService`  [EXTRACTED]
  src/services/link-module-service.ts → src/services/link.ts
- `getMigrationPlanner()` --calls--> `MigrationsExecutionPlanner`  [EXTRACTED]
  src/initialize/index.ts → src/migration/index.ts
- `TestablePlanner` --inherits--> `MigrationsExecutionPlanner`  [EXTRACTED]
  src/migration/__tests__/rename-old-table.spec.ts → src/migration/index.ts
- `initialize()` --calls--> `getLinkModuleDefinition()`  [EXTRACTED]
  src/initialize/index.ts → src/initialize/module-definition.ts
- `initialize()` --calls--> `generateGraphQLSchema()`  [EXTRACTED]
  src/initialize/index.ts → src/utils/generate-schema.ts

## Import Cycles
- None detected.

## Communities (39 total, 15 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (12): initialize(), getLinkModuleDefinition(), connectionLoader(), containerLoader(), getLoaders(), getLinkRepository(), getModuleService(), getReadOnlyModuleService() (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (22): CartPaymentCollection, CartPromotion, CustomerAccountHolder, LocationFulfillmentProvider, LocationFulfillmentSet, InviteRbacRole, OrderCart, OrderClaimPaymentCollection (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (33): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+25 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (12): Car, carJoinerConfig, CarModule, CarService, CustomModuleImplementationContainingAReallyBigNameThatExceedsPosgresLimitToNameATable, CustomModuleImplementationContainingAReallyBigNameThatExceedsPosgresLimitToNameATableModule, CustomModuleImplementationContainingAReallyBigNameThatExceedsPosgresLimitToNameATableService, longNameJoinerConfig (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (12): CartCustomer, CartProduct, CartRegion, CartSalesChannel, CartShippingOption, InventoryLevelStockLocation, OrderCustomer, OrderProduct (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (3): getMigrationPlanner(), MigrationsExecutionPlanner, TestablePlanner

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (3): InjectedDependencies, LinkService, InjectedDependencies

### Community 10 - "Community 10"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (6): loadModule(), moduleLoader(), loadInternalModule(), loadInternalProvider(), resolveModuleExports(), runLoaders()

### Community 12 - "Community 12"
Cohesion: 0.25
Nodes (3): ProductTranslation, StoreLocales, UserRbacRole

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (4): ILinkMigrationsPlanner, LinkMigrationsPlannerAction, PlannerActionLinkDescriptor, ILinkModule

### Community 19 - "Community 19"
Cohesion: 0.20
Nodes (7): JoinerArgument, JoinerDirective, JoinerRelationship, JoinerServiceConfig, JoinerServiceConfigAlias, RemoteJoinerOptions, RemoteJoinerQuery

### Community 20 - "Community 20"
Cohesion: 0.05
Nodes (35): CheckConstraint, DMLSchema, EntityCascades, EntityConstructor, EntityIndex, ExtractEntityRelations, IDmlEntity, IDmlEntityConfig (+27 more)

### Community 21 - "Community 21"
Cohesion: 0.08
Nodes (11): generateJoinerConfigIfNecessary(), GenerateMigrationFunction, importAllFromDir(), LoadInternalArgs, loadResources(), MigrationFunction, ModuleResource, prepareLoaders() (+3 more)

### Community 22 - "Community 22"
Cohesion: 0.06
Nodes (20): ModuleWithDmlMixedWithoutJoinerConfigFixtures, ModuleWithDmlWithoutJoinerConfigFixtures, ModuleWithJoinerConfigFixtures, ModuleWithoutJoinerConfigFixtures, moduleExports, dmlEntity, ModuleService, moduleExports (+12 more)

### Community 23 - "Community 23"
Cohesion: 0.07
Nodes (16): cleanAndMergeSchema(), GenerateMigrations, GetLinkExecutionPlanner, getMigrationConnectionTimeout(), isMedusaModule(), MedusaAppGetLinksExecutionPlanner(), MedusaAppMigrateDown(), MedusaAppMigrateGenerate() (+8 more)

### Community 24 - "Community 24"
Cohesion: 0.06
Nodes (32): author, bugs, url, dependencies, @medusajs/deps, @medusajs/query, @medusajs/utils, description (+24 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (11): MODULE_DEFINITIONS, ModulesDefinition, getCustomModuleResolution(), getInternalModuleResolution(), registerMedusaLinkModule(), logger, defaultTestService, testServiceResolved (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.11
Nodes (7): registerMedusaModule(), loadModuleMigrations(), getLoadedSchema(), loadModules(), MedusaApp, MedusaModule, resolveJoinerConfigDatabaseClientUrl()

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (9): mockModuleLoader, mockRegisterMedusaModule, GlobalMedusaModule, LinkModuleBootstrapOptions, logger, MigrationOptions, ModuleAlias, ModuleBootstrapOptions (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.07
Nodes (15): CascadeError, DeleteEntities, DeleteEntityInput, Link, LinkDataConfig, LoadedLinkModule, RemoteRelationship, RemovedIds (+7 more)

### Community 29 - "Community 29"
Cohesion: 0.11
Nodes (5): EntityModel, Entity2, EntityModel, Entity2, EntityModel

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (8): FulfillmentModule, InventoryModule, InventoryStockLocationLink, ProductInventoryLinkModule, ProductModule, StockLocationFulfillmentSetLink, StockLocationModule, allModules

### Community 33 - "Community 33"
Cohesion: 0.50
Nodes (3): loaders, migrations, models

## Knowledge Gaps
- **10 isolated node(s):** `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`, `@medusajs/deps` (+5 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 367 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MedusaModule` connect `Community 26` to `Community 27`, `Community 28`, `Community 23`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05325814536340852 - nodes in this community are weakly interconnected._
- **Why does `Link` connect `Community 28` to `Community 31`, `Community 23`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09397163120567376 - nodes in this community are weakly interconnected._
- **Why does `LinkModuleService` connect `Community 7` to `Community 0`, `Community 6`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._