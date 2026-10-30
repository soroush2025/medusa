# Graph Report - pricing  (2026-10-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 885 nodes · 1779 edges · 59 communities (30 shown, 29 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- API Param Validators
- Module Bootstrap Types
- Module Index Surfaces
- Pricing Service Internals
- Pricing Service Methods
- Pricing Module Packaging
- Price DTO Filters
- Service Types Index
- Pricing Module Path Aliases
- Pricing Repository Layer
- Currency DTO Types
- Pricing Defaults Migration
- Price List Date Validation
- Pricing 2025 Migration
- Initial Setup Migrations
- Pricing Migration 20240322a
- Pricing Migration 20240322b
- Pricing Migration 20240322c
- Pricing Migration 20240704
- Pricing Migration 20241127a
- Pricing Migration 20241127b
- Pricing Migration 20241128
- Pricing Migration 20241212
- Pricing Migration 20250408
- Pricing Migration 20250409
- Pricing Migration 20251009
- Pricing Migration 20260429
- Module Jest Setup
- Currency Module Packaging
- Currency Service Internals
- Currency Migration 2024
- Currency Module Path Aliases
- Currency Service Methods
- Price Preference Workflows
- Validation & Preference Steps
- Price List Workflow Steps
- Delete Price Lists Flow
- Update Price List Prices
- Create Price Lists Flow
- Update Price Lists Flow
- Price List Prices Workflows
- Price List DTO Types
- Money Amounts & Rules
- Price List Workflow DTOs
- Price List Rule DTOs
- Price Preference DTOs
- Pricing Filters & Context
- MoneyAmount & PriceRule DTOs
- Admin Pricing API Routes
- Price List API Validators
- Price List Query Config
- Price Preference Query Config
- Admin Currencies Query Config
- Store Currencies Query Config

## God Nodes (most connected - your core abstractions)
1. `IPricingModuleService` - 45 edges
2. `PricingModuleService` - 44 edges
3. `PriceSetDTO` - 16 edges
4. `PriceListDTO` - 13 edges
5. `Price` - 12 edges
6. `PriceRuleDTO` - 12 edges
7. `scripts` - 11 edges
8. `scripts` - 11 edges
9. `PriceDTO` - 10 edges
10. `PriceList` - 9 edges

## Surprising Connections (you probably didn't know these)
- `createPriceListsWorkflow` --calls--> `validateVariantPriceLinksStep`  [EXTRACTED]
  workflows/create-price-lists.ts → steps/validate-variant-price-links.ts
- `updatePriceListsWorkflow` --calls--> `validatePriceListsStep`  [EXTRACTED]
  workflows/update-price-lists.ts → steps/validate-price-lists.ts
- `GET()` --calls--> `fetchPriceList()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `POST()` --calls--> `fetchPriceList()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `deletePricePreferencesWorkflow` --calls--> `deletePricePreferencesStep`  [EXTRACTED]
  workflows/delete-price-preferences.ts → steps/delete-price-preferences.ts

## Import Cycles
- 3-file cycle: `common/money-amount.ts -> common/price-rule.ts -> common/price-set.ts -> common/money-amount.ts`

## Communities (59 total, 29 thin omitted)

### Community 0 - "API Param Validators"
Cohesion: 0.21
Nodes (7): AdminGetCurrenciesParamsFields, AdminGetCurrenciesParamsType, AdminCreatePricePreferencePriceType, AdminGetPricePreferencesParamsFields, AdminUpdatePricePreferenceType, StoreGetCurrenciesParamsFields, StoreGetCurrenciesParamsType

### Community 3 - "Module Index Surfaces"
Cohesion: 0.06
Nodes (22): loaders, defaultPricesData, createPrices(), defaultPriceListData, createPriceLists(), defaultPriceListRuleData, createPriceListRules(), defaultPriceRuleData (+14 more)

### Community 4 - "Pricing Service Internals"
Cohesion: 0.05
Nodes (6): joinerConfig, BaseClass, generateMethodForModels, hashPrice(), InjectedDependencies, isTaxInclusive()

### Community 6 - "Pricing Module Packaging"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 7 - "Price DTO Filters"
Cohesion: 0.29
Nodes (4): FilterablePriceProps, AddPriceListPricesDTO, UpdatePriceListPricesDTO, PriceDTO

### Community 8 - "Service Types Index"
Cohesion: 0.20
Nodes (7): InitializeModuleInjectableDependencies, ServiceTypes, CreatePriceListDTO, UpdatePriceListDTO, UpdatePricePreferenceInput, UpdatePriceSetInput, UpsertPriceDTO

### Community 10 - "Pricing Module Path Aliases"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 12 - "Currency DTO Types"
Cohesion: 0.53
Nodes (3): CurrencyDTO, FilterableCurrencyProps, ICurrencyModuleService

### Community 32 - "Currency Module Packaging"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 38 - "Currency Module Path Aliases"
Cohesion: 0.22
Nodes (8): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types

### Community 44 - "Price Preference Workflows"
Cohesion: 0.11
Nodes (13): createPricePreferencesStep, createPricePreferencesStepId, CreatePricePreferencesStepInput, deletePricePreferencesStep, updatePricePreferencesStep, createPricePreferencesWorkflow, createPricePreferencesWorkflowId, CreatePricePreferencesWorkflowInput (+5 more)

### Community 47 - "Validation & Preference Steps"
Cohesion: 0.20
Nodes (5): validatePriceListsStepId, ValidatePriceListsStepInput, updatePricePreferencesAsArrayStep, updatePricePreferencesAsArrayStepId, UpdatePricePreferencesAsArrayStepInput

### Community 54 - "Price List Workflow Steps"
Cohesion: 0.09
Nodes (21): createPriceListPricesStepId, createPriceListsStepId, deletePriceListsStepId, DeletePriceListsStepInput, getExistingPriceListsPriceIdsStep, getExistingPriceListsPriceIdsStepId, GetExistingPriceListsPriceIdsStepInput, GetExistingPriceListsPriceIdsStepOutput (+13 more)

### Community 55 - "Delete Price Lists Flow"
Cohesion: 0.16
Nodes (8): deletePriceListsStep, removePriceListPricesStep, deletePriceListsWorkflow, deletePriceListsWorkflowId, DeletePriceListsWorkflowInput, removePriceListPricesWorkflow, removePriceListPricesWorkflowId, RemovePriceListPricesWorkflowInput

### Community 59 - "Create Price Lists Flow"
Cohesion: 0.25
Nodes (5): createPriceListsStep, createPriceListsWorkflow, createPriceListsWorkflowId, CreatePriceListsWorkflowInput, CreatePriceListsWorkflowOutput

### Community 60 - "Update Price Lists Flow"
Cohesion: 0.14
Nodes (7): getDataBeforeUpdate(), updatePriceListsStep, updatePriceListsStepId, UpdatePriceListsStepInput, updatePriceListsWorkflow, updatePriceListsWorkflowId, UpdatePriceListsWorkflowInput

### Community 61 - "Price List Prices Workflows"
Cohesion: 0.14
Nodes (14): createPriceListPricesStep, updatePriceListPricesStep, validatePriceListsStep, validateVariantPriceLinksStep, batchPriceListPricesWorkflow, batchPriceListPricesWorkflowId, BatchPriceListPricesWorkflowInput, createPriceListPricesWorkflow (+6 more)

### Community 62 - "Price List DTO Types"
Cohesion: 0.09
Nodes (8): CreatePriceDTO, CreatePriceListDTO, FilterablePriceListProps, PriceListDTO, RemovePriceListRulesDTO, SetPriceListRulesDTO, UpdatePriceListDTO, IPricingModuleService

### Community 64 - "Money Amounts & Rules"
Cohesion: 0.16
Nodes (9): FilterableMoneyAmountProps, UpsertMoneyAmountDTO, PriceRule, PricingRuleOperatorValues, CalculatedPriceSetDTO, CreatePriceSetPriceRules, PricingRepositoryService, RuleWithOperator (+1 more)

### Community 65 - "Price List Workflow DTOs"
Cohesion: 0.13
Nodes (12): PriceListStatus, BatchPriceListPricesWorkflowDTO, BatchPriceListPricesWorkflowResult, CreatePriceListPricesWorkflowDTO, CreatePriceListPricesWorkflowStepDTO, CreatePriceListPriceWorkflowDTO, CreatePriceListsWorkflowStepDTO, CreatePriceListWorkflowInputDTO (+4 more)

### Community 66 - "Price List Rule DTOs"
Cohesion: 0.16
Nodes (12): CreateMoneyAmountDTO, UpdateMoneyAmountDTO, CreatePriceListPriceDTO, CreatePriceListPriceRules, CreatePriceListRuleDTO, CreatePriceListRules, FilterablePriceListRuleProps, PriceListRuleDTO (+4 more)

### Community 67 - "Price Preference DTOs"
Cohesion: 0.24
Nodes (5): CreatePricePreferenceDTO, FilterablePricePreferenceProps, PricePreferenceDTO, UpdatePricePreferenceDTO, UpsertPricePreferenceDTO

### Community 68 - "Pricing Filters & Context"
Cohesion: 0.18
Nodes (6): CalculatedPriceSet, FilterablePriceSetProps, PricingContext, PricingFilters, UpdatePriceSetDTO, UpsertPriceSetDTO

### Community 69 - "MoneyAmount & PriceRule DTOs"
Cohesion: 0.13
Nodes (9): MoneyAmountDTO, CreatePriceRuleDTO, FilterablePriceRuleProps, PriceRuleDTO, UpdatePriceRuleDTO, AddPricesDTO, CreatePriceSetDTO, PriceSetDTO (+1 more)

### Community 70 - "Admin Pricing API Routes"
Cohesion: 0.06
Nodes (15): fetchPriceList(), fetchPriceListPriceIdsForProduct(), transformPriceList(), POST(), POST(), GET(), POST(), getPriceList() (+7 more)

### Community 72 - "Price List API Validators"
Cohesion: 0.15
Nodes (14): adminPriceListsRoutesMiddlewares, AdminCreatePriceList, AdminCreatePriceListPrice, AdminCreatePriceListType, AdminGetPriceListParams, AdminGetPriceListPriceParams, AdminGetPriceListPricesParams, AdminGetPriceListsParams (+6 more)

### Community 73 - "Price List Query Config"
Cohesion: 0.20
Nodes (9): adminPriceListPriceQueryFields, adminPriceListRemoteQueryFields, Entities, price, price_list, listPriceListPriceQueryConfig, listPriceListQueryConfig, retrivePriceListPriceQueryConfig (+1 more)

### Community 77 - "Price Preference Query Config"
Cohesion: 0.17
Nodes (10): adminPricePreferencesRoutesMiddlewares, adminPricePreferenceRemoteQueryFields, Entities, price_preference, listPricePreferenceQueryConfig, retrivePricePreferenceQueryConfig, AdminCreatePricePreference, AdminGetPricePreferenceParams (+2 more)

### Community 84 - "Admin Currencies Query Config"
Cohesion: 0.20
Nodes (8): adminCurrencyRoutesMiddlewares, defaultAdminCurrencyFields, Entities, currency, listTransformQueryConfig, retrieveTransformQueryConfig, AdminGetCurrenciesParams, AdminGetCurrencyParams

### Community 87 - "Store Currencies Query Config"
Cohesion: 0.15
Nodes (7): storeCurrencyRoutesMiddlewares, additionalStoreCurrencyFields, defaultStoreCurrencyFields, listTransformQueryConfig, retrieveTransformQueryConfig, StoreGetCurrenciesParams, StoreGetCurrencyParams

## Knowledge Gaps
- **10 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils` (+5 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 394 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PricingModuleService` connect `Pricing Service Methods` to `Module Index Surfaces`, `Pricing Service Internals`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Shared DTO Re-exports` be split into smaller, more focused modules?**
  _Cohesion score 0.059379217273954114 - nodes in this community are weakly interconnected._
- **Why does `IPricingModuleService` connect `Price List DTO Types` to `Shared DTO Re-exports`, `Price List Rule DTOs`, `Price Preference DTOs`, `Pricing Filters & Context`, `MoneyAmount & PriceRule DTOs`, `Price DTO Filters`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Should `Module Index Surfaces` be split into smaller, more focused modules?**
  _Cohesion score 0.0616729088639201 - nodes in this community are weakly interconnected._
- **Why does `updatePriceListsStep` connect `Update Price Lists Flow` to `Price List DTO Types`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Pricing Service Internals` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._