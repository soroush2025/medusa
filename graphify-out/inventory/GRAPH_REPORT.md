# Graph Report - inventory  (2026-10-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 830 nodes · 1657 edges · 46 communities (37 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 6
- Community 7
- Community 8
- Community 9
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 32
- Community 34
- Community 42
- Community 43
- Community 47
- Community 51
- Community 52
- Community 53
- Community 54
- Community 61
- Community 67
- Community 70
- Community 77
- Community 78
- Community 83
- Community 88

## God Nodes (most connected - your core abstractions)
1. `InventoryModuleService` - 36 edges
2. `IInventoryService` - 36 edges
3. `StockLocationModuleService` - 14 edges
4. `IStockLocationService` - 13 edges
5. `refetchStockLocation()` - 12 edges
6. `scripts` - 11 edges
7. `scripts` - 11 edges
8. `refetchInventoryItem()` - 11 edges
9. `InventoryLevelDTO` - 9 edges
10. `InventoryLevelService` - 8 edges

## Surprising Connections (you probably didn't know these)
- `exportInventoryItemsStep` --calls--> `normalizeForExport()`  [EXTRACTED]
  steps/export-inventory-items.ts → helpers/normalize-for-export.ts
- `bulkCreateDeleteLevelsWorkflow` --calls--> `createInventoryLevelsStep`  [EXTRACTED]
  workflows/bulk-create-delete-levels.ts → steps/create-inventory-levels.ts
- `updateInventoryLevelsWorkflow` --calls--> `updateInventoryLevelsStep`  [EXTRACTED]
  workflows/update-inventory-levels.ts → steps/update-inventory-levels.ts
- `createStockLocationsWorkflow` --calls--> `createStockLocations`  [EXTRACTED]
  workflows/create-stock-locations.ts → steps/create-stock-locations.ts
- `DELETE()` --calls--> `refetchInventoryItem()`  [EXTRACTED]
  [id]/location-levels/[location_id]/route.ts → helpers.ts

## Import Cycles
- 3-file cycle: `src/models/index.ts -> src/models/stock-location.ts -> src/models/stock-location-address.ts -> src/models/index.ts`

## Communities (46 total, 9 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (3): InjectedDependencies, InventoryItemCheckLevel, InjectedDependencies

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (4): ReservationItem, InventoryLevelRepository, InventoryLevelService, InventoryModuleService

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (19): refetchStockLocation(), buildLinks(), POST(), POST(), GET(), POST(), POST(), POST() (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (35): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+27 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (9): Migration20240307132720, Migration20240719123015, Migration20241213063611, Migration20251010131115, Migration20260815185216, Migration20240307161216, Migration20241210073813, Migration20250106142624 (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.23
Nodes (5): InventoryItem, InventoryLevel, applyEntityHooks(), applyFormulas(), applyHook()

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.29
Nodes (3): validateInventoryItemsForCreate, validateInventoryItemsForCreateStepId, ValidateInventoryItemsForCreateStepInput

### Community 12 - "Community 12"
Cohesion: 0.06
Nodes (35): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+27 more)

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (4): createStockLocations, createStockLocationsWorkflow, createStockLocationsWorkflowId, CreateStockLocationsWorkflowInput

### Community 14 - "Community 14"
Cohesion: 0.21
Nodes (4): joinerConfig, joinerConfig, StockLocationAddress, StockLocation

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (5): updateInventoryItemsStep, updateInventoryItemsWorkflow, updateInventoryItemsWorkflowId, UpdateInventoryItemsWorkflowInput, UpdateInventoryItemsWorkflowOutput

### Community 17 - "Community 17"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (17): createInventoryLevelsStep, updateInventoryLevelsStep, validateInventoryLocationsStep, batchInventoryItemLevelsWorkflow, batchInventoryItemLevelsWorkflowId, BatchInventoryItemLevelsWorkflowInput, BatchInventoryItemLevelsWorkflowOutput, bulkCreateDeleteLevelsWorkflow (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.27
Nodes (7): createInventoryItemsStep, buildInventoryLevelsInput(), buildLocationLevelMapAndItemData(), createInventoryItemsWorkflow, createInventoryItemsWorkflowId, CreateInventoryItemsWorkflowInput, LocationLevelWithoutInventory

### Community 23 - "Community 23"
Cohesion: 0.25
Nodes (3): exportInventoryItemsStep, exportInventoryItemsWorkflow, exportInventoryItemsWorkflowId

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (10): deleteInventoryItemStep, validateInventoryDeleteStep, deleteInventoryItemWorkflow, deleteInventoryItemWorkflowId, DeleteInventoryItemWorkflowInput, DeleteInventoryItemWorkflowOutput, deleteStockLocationsStep, deleteStockLocationsWorkflow (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.25
Nodes (5): validateInventoryItems, validateInventoryItemsId, ValidateInventoryItemsStepInput, validateInventoryLocationsStepId, ValidateInventoryLocationsStepInput

### Community 26 - "Community 26"
Cohesion: 0.33
Nodes (5): beautifyKey(), ExportableInventoryItem, normalizeForExport(), normalizeQuantity(), prefixFields()

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (5): deleteInventoryLevelsWorkflow, deleteInventoryLevelsWorkflowId, DeleteInventoryLevelsWorkflowInput, validateInventoryLevelsDelete, ValidateInventoryLevelsDeleteStepInput

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (6): attachInventoryItemToVariants, attachInventoryItemToVariantsStepId, AttachInventoryItemToVariantsStepInput, exportInventoryItemsStepId, associateFulfillmentSetsWithLocationStepId, AssociateFulfillmentSetsWithLocationStepInput

### Community 29 - "Community 29"
Cohesion: 0.20
Nodes (7): updateInventoryItemsStepId, UpdateInventoryItemsStepInput, updateInventoryLevelsStepId, UpdateInventoryLevelsStepInput, UpdateReservationsCompensationInput, updateReservationsStepId, UpdateReservationsStepInput

### Community 30 - "Community 30"
Cohesion: 0.14
Nodes (13): createInventoryItemsStepId, CreateInventoryItemsStepInput, createInventoryLevelsStepId, CreateInventoryLevelsStepInput, deleteInventoryLevelsStep, deleteInventoryLevelsStepId, DeleteInventoryLevelsStepInput, createReservationsStepId (+5 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (7): adjustInventoryLevelsStep, adjustInventoryLevelsStepId, AdjustInventoryLevelsStepInput, deleteInventoryItemStepId, DeleteInventoryItemStepInput, ValidateInventoryDeleteStepInput, validateVariantInventoryStepId

### Community 34 - "Community 34"
Cohesion: 0.11
Nodes (14): createReservationsStep, deleteReservationsByLineItemsStep, deleteReservationsStep, updateReservationsStep, createReservationsWorkflow, createReservationsWorkflowId, DeleteReservationByLineItemsWorkflowInput, deleteReservationsByLineItemsWorkflow (+6 more)

### Community 42 - "Community 42"
Cohesion: 0.13
Nodes (6): associateFulfillmentSetsWithLocationStep, createLocationFulfillmentSetWorkflow, createLocationFulfillmentSetWorkflowId, linkSalesChannelsToStockLocationWorkflow, linkSalesChannelsToStockLocationWorkflowId, LinkSalesChannelsToStockLocationWorkflowInput

### Community 43 - "Community 43"
Cohesion: 0.10
Nodes (11): createStockLocationsStepId, CreateStockLocationsStepInput, StepInput, updateStockLocationsStep, updateStockLocationsStepId, upsertStockLocationAddressesStep, upsertStockLocationAddressesStepId, UpsertStockLocationAddressesStepInput (+3 more)

### Community 51 - "Community 51"
Cohesion: 0.08
Nodes (5): FilterableInventoryLevelProps, InventoryLevelDTO, CreateInventoryLevelInput, UpdateInventoryLevelInput, IInventoryService

### Community 52 - "Community 52"
Cohesion: 0.18
Nodes (5): FilterableReservationItemProps, ReservationItemDTO, CreateReservationItemInput, ReserveQuantityContext, UpdateReservationItemInput

### Community 54 - "Community 54"
Cohesion: 0.24
Nodes (4): FilterableInventoryItemProps, InventoryItemDTO, CreateInventoryItemInput, UpdateInventoryItemInput

### Community 61 - "Community 61"
Cohesion: 0.08
Nodes (12): CreateStockLocationInput, FilterableStockLocationAddressProps, FilterableStockLocationProps, StockLocationAddressDTO, StockLocationAddressInput, StockLocationDTO, StockLocationExpandedDTO, UpdateStockLocationAddressInput (+4 more)

### Community 67 - "Community 67"
Cohesion: 0.09
Nodes (26): adminInventoryRoutesMiddlewares, AdminBatchInventoryItemLevels, AdminBatchInventoryItemLevelsType, AdminBatchInventoryItemLocationsLevel, AdminBatchInventoryItemLocationsLevelType, AdminBatchInventoryLocationLevel, AdminCreateInventoryItem, AdminCreateInventoryItemType (+18 more)

### Community 70 - "Community 70"
Cohesion: 0.20
Nodes (9): defaultAdminInventoryItemFields, defaultAdminLocationLevelFields, Entities, inventory_item, inventory_level, listLocationLevelsTransformQueryConfig, listTransformQueryConfig, retrieveLocationLevelsTransformQueryConfig (+1 more)

### Community 77 - "Community 77"
Cohesion: 0.12
Nodes (9): adminReservationRoutesMiddlewares, AdminCreateReservation, AdminCreateReservationType, AdminGetReservationParams, AdminGetReservationParamsType, AdminGetReservationsParams, AdminGetReservationsParamsType, AdminUpdateReservation (+1 more)

### Community 78 - "Community 78"
Cohesion: 0.25
Nodes (5): defaultAdminReservationFields, Entities, reservation_item, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 83 - "Community 83"
Cohesion: 0.12
Nodes (14): adminStockLocationRoutesMiddlewares, AdminCreateStockLocation, AdminCreateStockLocationFulfillmentSet, AdminCreateStockLocationFulfillmentSetType, AdminCreateStockLocationType, AdminGetStockLocationParams, AdminGetStockLocationParamsType, AdminGetStockLocationsParams (+6 more)

### Community 88 - "Community 88"
Cohesion: 0.33
Nodes (5): defaultAdminStockLocationFields, Entities, stock_location, listTransformQueryConfig, retrieveTransformQueryConfig

## Knowledge Gaps
- **10 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils` (+5 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 384 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `InventoryModuleService` connect `Community 1` to `Community 0`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1076923076923077 - nodes in this community are weakly interconnected._
- **Why does `IInventoryService` connect `Community 51` to `Community 50`, `Community 52`, `Community 54`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12956810631229235 - nodes in this community are weakly interconnected._
- **Why does `StockLocationModuleService` connect `Community 15` to `Community 0`, `Community 5`, `Community 14`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05789473684210526 - nodes in this community are weakly interconnected._