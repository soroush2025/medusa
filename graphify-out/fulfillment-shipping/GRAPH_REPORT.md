# Graph Report - staging  (2026-10-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1164 nodes · 2629 edges · 48 communities (40 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_types_index_ifulfillmentmoduleservice
- service.ts
- FulfillmentModuleService
- ext_core_framework_dist_deps_mikro_orm_migrations_js
- package.json
- providers.ts
- fulfillment-module-service.ts
- FulfillmentProviderService
- utils.ts
- models/index.ts
- paths
- jest.config.js
- index.spec.ts
- mark-fulfillment-as-delivered.ts
- create-shipping-options.ts
- steps/index.ts
- set-shipping-options-prices.ts
- batch-shipping-option-rules.ts
- workflows/calculate-shipping-options-prices.ts
- models/service-zone.ts
- utils/events.ts
- ShippingOption
- ext_framework_dist_workflows_sdk_index_js
- workflows/delete-shipping-option-types.ts
- IFulfillmentModuleService
- common/shipping-option.ts
- IFulfillmentProvider
- workflows.ts
- mutations/geo-zone.ts
- provider.ts
- order.ts
- ShippingOptionTypeDTO
- ShippingProfileDTO
- validators.ts
- home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_types_index_httptypes
- ext_index_js
- validators.ts
- query-config.ts
- middlewares.ts
- validators.ts
- batch/route.ts
- [id]/route.ts
- validators.ts
- [id]/route.ts
- validators.ts
- [id]/route.ts
- validators.ts

## God Nodes (most connected - your core abstractions)
1. `IFulfillmentModuleService` - 75 edges
2. `FulfillmentModuleService` - 59 edges
3. `ShippingOptionDTO` - 21 edges
4. `FulfillmentProviderService` - 19 edges
5. `FulfillmentDTO` - 19 edges
6. `ShippingOption` - 16 edges
7. `IFulfillmentProvider` - 14 edges
8. `ServiceZoneDTO` - 13 edges
9. `UpdateServiceZoneDTO` - 12 edges
10. `ShippingOptionTypeDTO` - 11 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `refetchFulfillment()`  [EXTRACTED]
  [id]/cancel/route.ts → helpers.ts
- `POST()` --calls--> `refetchFulfillment()`  [EXTRACTED]
  [id]/shipment/route.ts → helpers.ts
- `GET()` --calls--> `refetchShippingOption()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `POST()` --calls--> `refetchShippingOption()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `GET()` --calls--> `refetchShippingOptionType()`  [EXTRACTED]
  [id]/route.ts → helpers.ts

## Import Cycles
- None detected.

## Communities (48 total, 8 thin omitted)

### Community 0 - "home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_types_index_ifulfillmentmoduleservice"
Cohesion: 0.13
Nodes (8): buildExpectedEventMessageShape(), generateCreateFulfillmentData(), generateCreateShippingOptionsData(), moduleOptions, moduleOptions, providerId, moduleOptions, providerId

### Community 3 - "ext_core_framework_dist_deps_mikro_orm_migrations_js"
Cohesion: 0.06
Nodes (9): Migration20240311145700_InitialSetupMigration, Migration20240821170957, Migration20240917161003, Migration20241217110416, Migration20250113122235, Migration20250120115002, Migration20250822130931, Migration20250825132614 (+1 more)

### Community 4 - "package.json"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 5 - "providers.ts"
Cohesion: 0.08
Nodes (6): registrationFn(), FulfillmentIdentifiersRegistrationName, FulfillmentModuleOptions, InitializeModuleInjectableDependencies, @medusajs/types, ModuleOptions

### Community 6 - "fulfillment-module-service.ts"
Cohesion: 0.07
Nodes (3): generateMethodForModels, InjectedDependencies, InjectedDependencies

### Community 8 - "utils.ts"
Cohesion: 0.15
Nodes (8): availableOperators, isContextValid(), normalizeRulesValue(), operatorsPredicate, Rule, validateAndNormalizeRules(), validateRule(), validateRules()

### Community 9 - "models/index.ts"
Cohesion: 0.23
Nodes (9): joinerConfig, FulfillmentAddress, Fulfillment, FulfillmentItem, FulfillmentLabel, FulfillmentProvider, FulfillmentSet, ShippingOptionRule (+1 more)

### Community 10 - "paths"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 12 - "index.spec.ts"
Cohesion: 0.11
Nodes (4): FulfillmentProviderServiceFixtures, services, list(), moduleOptions

### Community 13 - "mark-fulfillment-as-delivered.ts"
Cohesion: 0.07
Nodes (23): createFulfillmentStep, createReturnFulfillmentStep, createShippingProfilesStep, updateFulfillmentStep, updateFulfillmentStepId, validateShipmentStep, validateShipmentStepId, ValidateShipmentStepInput (+15 more)

### Community 14 - "create-shipping-options.ts"
Cohesion: 0.10
Nodes (19): FilteredSetShippingOptionsPriceSetsStepInput, getCurrentShippingOptionPriceSetsLinks(), LinkItems, setShippingOptionsPriceSetsStep, setShippingOptionsPriceSetsStepId, SetShippingOptionsPriceSetsStepInput, upsertShippingOptionsStep, FulfillmentProviderValidationWorkflowInput (+11 more)

### Community 15 - "steps/index.ts"
Cohesion: 0.07
Nodes (22): cancelFulfillmentStep, createServiceZonesStep, deleteServiceZonesStep, updateServiceZonesStep, updateShippingProfilesStep, updateShippingProfilesStepId, UpdateShippingProfilesStepInput, cancelFulfillmentWorkflow (+14 more)

### Community 16 - "set-shipping-options-prices.ts"
Cohesion: 0.10
Nodes (13): buildPriceSet(), createShippingOptionsPriceSetsStep, createShippingOptionsPriceSetsStepId, CreateShippingOptionsPriceSetsStepInput, CreateShippingOptionsPriceSetsStepOutput, ShippingOptionsPriceCurrencyCode, ShippingOptionsPriceRegionId, buildPrices() (+5 more)

### Community 17 - "batch-shipping-option-rules.ts"
Cohesion: 0.14
Nodes (8): createShippingOptionRulesStep, deleteShippingOptionRulesStep, updateShippingOptionRulesStep, updateShippingOptionRulesStepId, BatchShippingOptionRulesInput, BatchShippingOptionRulesOutput, batchShippingOptionRulesWorkflow, batchShippingOptionRulesWorkflowId

### Community 18 - "workflows/calculate-shipping-options-prices.ts"
Cohesion: 0.06
Nodes (17): calculateShippingOptionsPricesStep, deleteFulfillmentSetsStep, deleteShippingOptionsStep, calculateShippingOptionsPricesWorkflow, calculateShippingOptionsPricesWorkflowId, SetCalculatedShippingPricingContextHook, deleteFulfillmentSetsWorkflow, deleteFulfillmentSetsWorkflowId (+9 more)

### Community 19 - "models/service-zone.ts"
Cohesion: 0.23
Nodes (4): GeoZone, GeoZoneSchema, ServiceZone, ServiceZoneSchema

### Community 20 - "utils/events.ts"
Cohesion: 0.22
Nodes (3): buildCreatedFulfillmentSetEvents(), buildCreatedServiceZoneEvents(), eventBuilders

### Community 23 - "ext_framework_dist_workflows_sdk_index_js"
Cohesion: 0.06
Nodes (35): calculateShippingOptionsPricesStepId, CalculateShippingOptionsPriceStepInput, cancelFulfillmentStepId, CancelFulfillmentStepInput, createFulfillmentStepId, createFulfillmentSets, createFulfillmentSetsId, CreateFulfillmentSetsStepInput (+27 more)

### Community 35 - "workflows/delete-shipping-option-types.ts"
Cohesion: 0.10
Nodes (13): createShippingOptionTypesStep, deleteShippingOptionTypesStep, updateShippingOptionTypesStep, createShippingOptionTypesWorkflow, createShippingOptionTypesWorkflowId, CreateShippingOptionTypesWorkflowInput, deleteShippingOptionTypesWorkflow, deleteShippingOptionTypesWorkflowId (+5 more)

### Community 46 - "IFulfillmentModuleService"
Cohesion: 0.06
Nodes (10): createFullDataStructure(), FilterableFulfillmentSetProps, FulfillmentSetDTO, FilterableGeoZoneProps, GeoZoneDTO, FilterableServiceZoneProps, ServiceZoneDTO, CreateGeoZoneDTO (+2 more)

### Community 48 - "common/shipping-option.ts"
Cohesion: 0.16
Nodes (10): FulfillmentAddressDTO, FilterableFulfillmentProps, FulfillmentDTO, FulfillmentItemDTO, FulfillmentLabelDTO, FilterableFulfillmentProviderProps, FulfillmentProviderDTO, FilterableShippingOptionForContextProps (+2 more)

### Community 49 - "IFulfillmentProvider"
Cohesion: 0.11
Nodes (5): ShippingOptionPriceType, CreateShippingOptionDTO, UpdateShippingOptionDTO, UpsertShippingOptionDTO, IFulfillmentProvider

### Community 50 - "workflows.ts"
Cohesion: 0.09
Nodes (11): FilterableShippingOptionRuleProps, ShippingOptionRuleDTO, CreateShippingOptionRuleDTO, UpdateShippingOptionRuleDTO, AddFulfillmentShippingOptionRulesWorkflowDTO, ListShippingOptionsForCartWithPricingWorkflowInput, ListShippingOptionsForCartWithPricingWorkflowOutput, ListShippingOptionsForCartWorkflowInput (+3 more)

### Community 51 - "mutations/geo-zone.ts"
Cohesion: 0.27
Nodes (16): GeoZoneType, CreateFulfillmentSetDTO, UpdateFulfillmentSetDTO, CreateCityGeoZoneDTO, CreateCountryGeoZoneDTO, CreateGeoZoneBaseDTO, CreateProvinceGeoZoneDTO, CreateZipGeoZoneDTO (+8 more)

### Community 52 - "provider.ts"
Cohesion: 0.07
Nodes (13): CartPropsForFulfillment, CreateFulfillmentAddressDTO, CreateFulfillmentDTO, CreateFulfillmentItemDTO, CreateFulfillmentLabelDTO, UpdateFulfillmentDTO, CalculatedRMAShippingContext, CalculateShippingItems (+5 more)

### Community 53 - "order.ts"
Cohesion: 0.15
Nodes (8): FulfillmentOrderAddressDTO, FulfillmentOrderDTO, FulfillmentOrderItemDTO, FulfillmentOrderLineItemDTO, FulfillmentOrderLineItemTotalsDTO, FulfillmentOrderShippingMethodDTO, FulfillmentOrderStatus, FulfillmentOrderSummaryDTO

### Community 54 - "ShippingOptionTypeDTO"
Cohesion: 0.24
Nodes (5): FilterableShippingOptionTypeProps, ShippingOptionTypeDTO, CreateShippingOptionTypeDTO, UpdateShippingOptionTypeDTO, UpsertShippingOptionTypeDTO

### Community 55 - "ShippingProfileDTO"
Cohesion: 0.24
Nodes (5): FilterableShippingProfileProps, ShippingProfileDTO, CreateShippingProfileDTO, UpdateShippingProfileDTO, UpsertShippingProfileDTO

### Community 57 - "validators.ts"
Cohesion: 0.12
Nodes (13): adminFulfillmentsRoutesMiddlewares, defaultAdminFulfillmentsFields, Entities, fulfillment, listTransformQueryConfig, retrieveTransformQueryConfig, AdminCreateFulfillment, AdminCreateFulfillmentItem (+5 more)

### Community 62 - "home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_types_index_httptypes"
Cohesion: 0.18
Nodes (4): refetchFulfillment(), POST(), POST(), POST()

### Community 66 - "validators.ts"
Cohesion: 0.16
Nodes (14): adminFulfillmentSetsRoutesMiddlewares, AdminCreateFulfillmentSetServiceZonesSchema, AdminCreateFulfillmentSetServiceZonesType, AdminFulfillmentSetParams, AdminFulfillmentSetParamsType, AdminServiceZonesParams, AdminServiceZonesParamsType, AdminUpdateFulfillmentSetServiceZonesSchema (+6 more)

### Community 69 - "query-config.ts"
Cohesion: 0.29
Nodes (6): defaultAdminFulfillmentSetsFields, Entities, fulfillment_set, service_zone, retrieveServiceZoneTransformQueryConfig, retrieveTransformQueryConfig

### Community 75 - "middlewares.ts"
Cohesion: 0.20
Nodes (7): adminFulfillmentProvidersRoutesMiddlewares, defaultAdminFulfillmentProvidersFields, Entities, fulfillment_provider, listTransformQueryConfig, retrieveTransformQueryConfig, AdminFulfillmentProvidersParams

### Community 76 - "validators.ts"
Cohesion: 0.07
Nodes (28): adminShippingOptionRoutesMiddlewares, defaultAdminShippingOptionFields, defaultAdminShippingOptionRuleFields, Entities, shipping_option, listRuleTransformQueryConfig, listTransformQueryConfig, retrieveRuleTransformQueryConfig (+20 more)

### Community 79 - "[id]/route.ts"
Cohesion: 0.20
Nodes (4): refetchShippingOption(), GET(), POST(), POST()

### Community 82 - "validators.ts"
Cohesion: 0.13
Nodes (15): adminShippingOptionTypeRoutesMiddlewares, defaultAdminShippingOptionTypeFields, Entities, shipping_option_type, listShippingOptionTypesTransformQueryConfig, retrieveShippingOptionTypeTransformQueryConfig, AdminCreateShippingOptionType, AdminCreateShippingOptionTypeType (+7 more)

### Community 88 - "[id]/route.ts"
Cohesion: 0.24
Nodes (4): refetchShippingOptionType(), GET(), POST(), POST()

### Community 89 - "validators.ts"
Cohesion: 0.15
Nodes (15): adminShippingProfilesMiddlewares, defaultAdminShippingProfileFields, Entities, shipping_profile, listTransformQueryConfig, retrieveTransformQueryConfig, AdminCreateShippingProfile, AdminCreateShippingProfileType (+7 more)

### Community 94 - "[id]/route.ts"
Cohesion: 0.24
Nodes (4): refetchShippingProfile(), GET(), POST(), POST()

### Community 98 - "validators.ts"
Cohesion: 0.10
Nodes (13): storeShippingOptionRoutesMiddlewares, allowedStoreShippingOptionExtraFields, allowedStoreShippingOptionListExtraFields, defaultStoreShippingOptionsFields, listTransformQueryConfig, retrieveTransformQueryConfig, StoreCalculateShippingOptionPrice, StoreCalculateShippingOptionPriceType (+5 more)

## Knowledge Gaps
- **10 isolated node(s):** `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils`, `fulfillment`, `fulfillment_set` (+5 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 506 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IFulfillmentModuleService` connect `IFulfillmentModuleService` to `service.ts`, `index.spec.ts`, `common/shipping-option.ts`, `IFulfillmentProvider`, `workflows.ts`, `provider.ts`, `ShippingOptionTypeDTO`, `ShippingProfileDTO`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **What connects `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_types_index_ifulfillmentmoduleservice` be split into smaller, more focused modules?**
  _Cohesion score 0.1294871794871795 - nodes in this community are weakly interconnected._
- **Why does `FulfillmentModuleService` connect `FulfillmentModuleService` to `providers.ts`, `fulfillment-module-service.ts`, `FulfillmentProviderService`, `models/index.ts`, `index.spec.ts`, `models/service-zone.ts`, `ShippingOption`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Why does `createFullDataStructure()` connect `IFulfillmentModuleService` to `home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_types_index_ifulfillmentmoduleservice`, `provider.ts`, `index.spec.ts`, `ShippingProfileDTO`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `FulfillmentModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.13953488372093023 - nodes in this community are weakly interconnected._