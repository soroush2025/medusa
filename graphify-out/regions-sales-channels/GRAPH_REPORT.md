# Graph Report - medusa  (2026-10-30)

## Corpus Check
- 149 files · ~25,712 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 814 nodes · 1485 edges · 45 communities (34 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ea78969d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Admin Region & Channel Routes
- Region & Channel Flow Steps
- Module Database Migrations
- Module Service Definitions
- Currency Package Manifest
- Region Package Manifest
- Sales Channel Package Manifest
- Store Package Manifest
- Store Workflows
- Region Workflows
- Store & Channel Models
- Store Service Contracts
- Sales Channel Workflows
- Module Test Suites
- Region Service Contracts
- Service Mutation Types
- Location Channel Link Steps
- Module Integration Specs
- Sales Channel Validators
- Store Module Service
- Region Validators
- Sales Channel Contracts
- Store Validators
- Store Region Validators
- Region Module Service
- Create Sales Channel Flow
- Common Currency Store Types
- Update Sales Channel Flow
- Sales Channel Module Service
- Store Region Query Config
- Region TSConfig Paths
- Sales Channel TSConfig Paths
- Store TSConfig Paths
- Jest Configurations
- Currency TSConfig Paths
- Store Admin Query Config
- Currency Module Service
- Region Query Config
- Sales Channel Query Config
- Currency Service Contracts

## God Nodes (most connected - your core abstractions)
1. `StoreModuleService` - 16 edges
2. `IRegionModuleService` - 13 edges
3. `RegionModuleService` - 12 edges
4. `SalesChannelModuleService` - 11 edges
5. `scripts` - 11 edges
6. `scripts` - 11 edges
7. `scripts` - 11 edges
8. `scripts` - 11 edges
9. `IStoreModuleService` - 10 edges
10. `ISalesChannelModuleService` - 10 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `refetchRegion()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `POST()` --calls--> `refetchRegion()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `POST()` --calls--> `refetchSalesChannel()`  [EXTRACTED]
  [id]/products/route.ts → helpers.ts
- `GET()` --calls--> `refetchSalesChannel()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `POST()` --calls--> `refetchSalesChannel()`  [EXTRACTED]
  [id]/route.ts → helpers.ts

## Import Cycles
- None detected.

## Communities (45 total, 11 thin omitted)

### Community 0 - "Admin Region & Channel Routes"
Cohesion: 0.10
Nodes (11): refetchRegion(), GET(), POST(), POST(), refetchSalesChannel(), POST(), GET(), POST() (+3 more)

### Community 1 - "Region & Channel Flow Steps"
Cohesion: 0.08
Nodes (22): createRegionsStepId, deleteRegionsStepId, DeleteRegionsStepInput, updateRegionsStepId, UpdateRegionsStepInput, associateLocationsWithSalesChannelsStep, associateLocationsWithSalesChannelsStepId, AssociateLocationsWithSalesChannelsStepInput (+14 more)

### Community 2 - "Module Database Migrations"
Cohesion: 0.06
Nodes (11): InitialSetup20240228133303, Migration20240624082354, RegionModuleSetup20240205173216, Migration20240624200006, Migration20250120110744, Migration20240115152146, InitialSetup20240226130829, Migration20240621145944 (+3 more)

### Community 3 - "Module Service Definitions"
Cohesion: 0.09
Nodes (4): InjectedDependencies, InjectedDependencies, InjectedDependencies, InjectedDependencies

### Community 4 - "Currency Package Manifest"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 5 - "Region Package Manifest"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 6 - "Sales Channel Package Manifest"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 7 - "Store Package Manifest"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 8 - "Store Workflows"
Cohesion: 0.10
Nodes (13): createStoresStep, deleteStoresStep, updateStoresStep, createStoresWorkflow, createStoresWorkflowId, CreateStoresWorkflowInput, CreateStoresWorkflowOutput, deleteStoresWorkflow (+5 more)

### Community 9 - "Region Workflows"
Cohesion: 0.11
Nodes (10): createRegionsStep, deleteRegionsStep, updateRegionsStep, createRegionsWorkflow, createRegionsWorkflowId, deleteRegionsWorkflow, deleteRegionsWorkflowId, DeleteRegionsWorkflowInput (+2 more)

### Community 10 - "Store & Channel Models"
Cohesion: 0.14
Nodes (4): joinerConfig, StoreCurrency, StoreLocale, Store

### Community 11 - "Store Service Contracts"
Cohesion: 0.13
Nodes (8): FilterableStoreProps, StoreDTO, CreateStoreCurrencyDTO, CreateStoreDTO, CreateStoreLocaleDTO, UpdateStoreDTO, UpsertStoreDTO, IStoreModuleService

### Community 12 - "Sales Channel Workflows"
Cohesion: 0.12
Nodes (12): associateProductsWithSalesChannelsStep, canDeleteSalesChannelsOrThrowStep, deleteSalesChannelsStep, deleteSalesChannelsStepId, DeleteSalesChannelsStepInput, detachProductsFromSalesChannelsStep, deleteSalesChannelsWorkflow, deleteSalesChannelsWorkflowId (+4 more)

### Community 13 - "Module Test Suites"
Cohesion: 0.12
Nodes (8): InitializeModuleInjectableDependencies, CreateCountryDTO, InitializeModuleInjectableDependencies, UpdateCountryRegion, InitializeModuleInjectableDependencies, UpdateSalesChanneInput, createStoreFixture, InitializeModuleInjectableDependencies

### Community 14 - "Region Service Contracts"
Cohesion: 0.15
Nodes (7): FilterableRegionCountryProps, FilterableRegionProps, RegionCountryDTO, RegionDTO, CreateRegionDTO, UpsertRegionDTO, IRegionModuleService

### Community 16 - "Location Channel Link Steps"
Cohesion: 0.12
Nodes (10): FilteredSetRegionsPaymentProvidersStepInput, getCurrentRegionPaymentProvidersLinks(), LinkItems, setRegionsPaymentProvidersStep, setRegionsPaymentProvidersStepId, SetRegionsPaymentProvidersStepInput, validatePaymentProvidersExists(), detachLocationsFromSalesChannelsStep (+2 more)

### Community 18 - "Sales Channel Validators"
Cohesion: 0.16
Nodes (10): adminSalesChannelRoutesMiddlewares, AdminCreateSalesChannel, AdminCreateSalesChannelType, AdminGetSalesChannelParams, AdminGetSalesChannelParamsType, AdminGetSalesChannelsParams, AdminGetSalesChannelsParamsDirectFields, AdminGetSalesChannelsParamsType (+2 more)

### Community 20 - "Region Validators"
Cohesion: 0.17
Nodes (10): adminRegionRoutesMiddlewares, AdminCreateRegion, AdminCreateRegionType, AdminGetRegionParams, AdminGetRegionParamsType, AdminGetRegionsParams, AdminGetRegionsParamsFields, AdminGetRegionsParamsType (+2 more)

### Community 21 - "Sales Channel Contracts"
Cohesion: 0.22
Nodes (5): FilterableSalesChannelProps, SalesChannelDTO, CreateSalesChannelDTO, UpsertSalesChannelDTO, ISalesChannelModuleService

### Community 22 - "Store Validators"
Cohesion: 0.19
Nodes (8): adminStoreRoutesMiddlewares, AdminGetStoreParams, AdminGetStoreParamsType, AdminGetStoresParams, AdminGetStoresParamsFields, AdminGetStoresParamsType, AdminUpdateStore, AdminUpdateStoreType

### Community 23 - "Store Region Validators"
Cohesion: 0.18
Nodes (6): storeRegionRoutesMiddlewares, StoreGetRegionParams, StoreGetRegionParamsType, StoreGetRegionsParams, StoreGetRegionsParamsFields, StoreGetRegionsParamsType

### Community 25 - "Create Sales Channel Flow"
Cohesion: 0.21
Nodes (7): createSalesChannelsStep, createSalesChannelsStepId, CreateSalesChannelsStepInput, createSalesChannelsWorkflow, createSalesChannelsWorkflowId, CreateSalesChannelsWorkflowInput, CreateSalesChannelsWorkflowOutput

### Community 26 - "Common Currency Store Types"
Cohesion: 0.22
Nodes (3): SalesChannelLocationDTO, StoreCurrencyDTO, StoreLocaleDTO

### Community 27 - "Update Sales Channel Flow"
Cohesion: 0.24
Nodes (7): updateSalesChannelsStep, updateSalesChannelsStepId, UpdateSalesChannelsStepInput, updateSalesChannelsWorkflow, updateSalesChannelsWorkflowId, UpdateSalesChannelsWorkflowInput, UpdateSalesChannelsWorkflowOutput

### Community 30 - "Store Region Query Config"
Cohesion: 0.20
Nodes (6): defaultStoreRegionFields, listTransformQueryConfig, nestedStoreRegionCountryFields, nestedStoreRegionPaymentProviderFields, retrieveTransformQueryConfig, storeRegionPaymentProviderFields

### Community 31 - "Region TSConfig Paths"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 32 - "Sales Channel TSConfig Paths"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 33 - "Store TSConfig Paths"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 34 - "Jest Configurations"
Cohesion: 0.22
Nodes (4): defineJestConfig, defineJestConfig, defineJestConfig, defineJestConfig

### Community 35 - "Currency TSConfig Paths"
Cohesion: 0.22
Nodes (8): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types

### Community 36 - "Store Admin Query Config"
Cohesion: 0.25
Nodes (5): defaultAdminStoreFields, Entities, store, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 38 - "Region Query Config"
Cohesion: 0.33
Nodes (5): defaultAdminRegionFields, Entities, region, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 39 - "Sales Channel Query Config"
Cohesion: 0.33
Nodes (5): defaultAdminSalesChannelFields, Entities, sales_channel, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 40 - "Currency Service Contracts"
Cohesion: 0.53
Nodes (3): CurrencyDTO, FilterableCurrencyProps, ICurrencyModuleService

## Knowledge Gaps
- **15 isolated node(s):** `../../../_tsconfig.base.json`, `../../../_tsconfig.base.json`, `../../../_tsconfig.base.json`, `../../../_tsconfig.base.json`, `store` (+10 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 372 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StoreModuleService` connect `Store Module Service` to `Store & Channel Models`, `Module Service Definitions`, `Module Test Suites`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `../../../_tsconfig.base.json`, `../../../_tsconfig.base.json`, `../../../_tsconfig.base.json` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin Region & Channel Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.09840425531914894 - nodes in this community are weakly interconnected._
- **Why does `RegionModuleService` connect `Region Module Service` to `Module Integration Specs`, `Module Service Definitions`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Region & Channel Flow Steps` be split into smaller, more focused modules?**
  _Cohesion score 0.08309178743961353 - nodes in this community are weakly interconnected._
- **Why does `SalesChannelModuleService` connect `Sales Channel Module Service` to `Module Integration Specs`, `Module Service Definitions`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Should `Module Database Migrations` be split into smaller, more focused modules?**
  _Cohesion score 0.058693244739756366 - nodes in this community are weakly interconnected._