# Graph Report - medusa  (2026-10-30)

## Corpus Check
- 0 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 481 nodes · 899 edges · 26 communities (20 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Tax Module Service Setup
- Delete Tax Rates and Regions Workflows
- Get Item Tax Lines Step
- System Tax Service
- Update Tax Regions Workflow
- Tax Rate Rules Workflows
- Create Tax Rates Workflow
- Tax Workflow Step Definitions
- Tax Module Service
- Tax Types and DTOs
- Tax Migrations
- Admin Tax Providers API
- Admin Tax Rates API
- Admin Tax Rates Query Config
- Admin Tax Validators
- Admin Tax Regions API
- Tax Provider Service
- Create Tax Regions Workflow
- Tax Module Integration Setup
- Admin Tax Route Handlers
- Tax Provider Registration
- Tax Module Package Config
- Jest Config
- Tax Data Models
- Tax Module TS Config

## God Nodes (most connected - your core abstractions)
1. `TaxModuleService` - 29 edges
2. `ITaxModuleService` - 24 edges
3. `scripts` - 11 edges
4. `TaxRateDTO` - 9 edges
5. `refetchTaxRate()` - 9 edges
6. `TaxRate` - 9 edges
7. `TaxProviderService` - 7 edges
8. `createTaxRateRulesStep` - 7 edges
9. `deleteTaxRateRulesStep` - 7 edges
10. `ItemTaxLineDTO` - 6 edges

## Surprising Connections (you probably didn't know these)
- `refetchTaxRate()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → [id]/route.ts
- `refetchTaxRate()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → [id]/rules/route.ts
- `refetchTaxRate()` --calls--> `DELETE()`  [EXTRACTED]
  helpers.ts → [id]/rules/[rule_id]/route.ts
- `createTaxRateRulesStep` --calls--> `createTaxRateRulesWorkflow`  [EXTRACTED]
  steps/create-tax-rate-rules.ts → workflows/create-tax-rate-rules.ts
- `deleteTaxRateRulesStep` --calls--> `deleteTaxRateRulesWorkflow`  [EXTRACTED]
  steps/delete-tax-rate-rules.ts → workflows/delete-tax-rate-rules.ts

## Import Cycles
- 3-file cycle: `src/models/index.ts -> src/models/tax-region.ts -> src/models/tax-provider.ts -> src/models/index.ts`
- 4-file cycle: `src/models/index.ts -> src/models/tax-rate.ts -> src/models/tax-region.ts -> src/models/tax-provider.ts -> src/models/index.ts`

## Communities (26 total, 6 thin omitted)

### Community 0 - "Tax Module Service Setup"
Cohesion: 0.11
Nodes (3): InjectedDependencies, ItemWithRates, generateForModels

### Community 12 - "Delete Tax Rates and Regions Workflows"
Cohesion: 0.18
Nodes (8): DeleteTaxRatesWorkflowInput, DeleteTaxRegionsWorkflowInput, deleteTaxRatesStep, deleteTaxRegionsStep, deleteTaxRatesWorkflow, deleteTaxRatesWorkflowId, deleteTaxRegionsWorkflow, deleteTaxRegionsWorkflowId

### Community 13 - "Get Item Tax Lines Step"
Cohesion: 0.12
Nodes (6): GetItemTaxLinesStepInput, normalizeLineItemsForShipping(), normalizeLineItemsForTax(), normalizeTaxModuleContext(), getItemTaxLinesStep, getItemTaxLinesStepId

### Community 15 - "Update Tax Regions Workflow"
Cohesion: 0.21
Nodes (7): UpdateTaxRegionsStepInput, UpdateTaxRegionsWorkflowInput, UpdateTaxRegionsWorkflowOutput, updateTaxRegionsStep, updateTaxRegionsStepId, updateTaxRegionsWorkflow, updateTaxRegionsWorkflowId

### Community 16 - "Tax Rate Rules Workflows"
Cohesion: 0.10
Nodes (19): CreateTaxRateRulesWorkflowInput, CreateTaxRateRulesWorkflowOutput, DeleteTaxRateRulesWorkflowInput, SetTaxRatesRulesWorkflowInput, MaybeListTaxRateRuleIdsStepInput, UpdateTaxRatesWorkflowInput, UpdateTaxRatesWorkflowOutput, createTaxRateRulesStep (+11 more)

### Community 17 - "Create Tax Rates Workflow"
Cohesion: 0.25
Nodes (5): CreateTaxRatesWorkflowInput, CreateTaxRatesWorkflowOutput, createTaxRatesStep, createTaxRatesWorkflow, createTaxRatesWorkflowId

### Community 19 - "Tax Workflow Step Definitions"
Cohesion: 0.11
Nodes (17): DeleteTaxRateRulesStepInput, DeleteTaxRatesStepInput, DeleteTaxRegionsStepInput, ListTaxRateIdsStepInput, ListTaxRateRuleIdsStepInput, UpdateTaxRatesStepInput, createTaxRateRulesStepId, createTaxRatesStepId (+9 more)

### Community 2 - "Tax Module Service"
Cohesion: 0.14
Nodes (3): TaxModuleService, TaxProviderService, TaxRate

### Community 26 - "Tax Types and DTOs"
Cohesion: 0.06
Nodes (25): FilterableTaxRateProps, FilterableTaxRateRuleProps, FilterableTaxRegionProps, ItemTaxLineDTO, ShippingTaxLineDTO, TaxableItemDTO, TaxableShippingDTO, TaxCalculationContext (+17 more)

### Community 3 - "Tax Migrations"
Cohesion: 0.13
Nodes (4): Migration20240227090331, Migration20240710135844, Migration20240924114005, Migration20241212052837

### Community 38 - "Admin Tax Providers API"
Cohesion: 0.18
Nodes (7): Entities, adminTaxProviderRoutesMiddlewares, defaults, tax_provider, listTransformQueryConfig, retrieveTransformQueryConfig, AdminGetTaxProvidersParams

### Community 39 - "Admin Tax Rates API"
Cohesion: 0.17
Nodes (12): AdminCreateTaxRateRuleType, AdminCreateTaxRateType, AdminGetTaxRateParamsType, AdminGetTaxRatesParamsType, AdminUpdateTaxRateType, adminTaxRateRoutesMiddlewares, AdminCreateTaxRate, AdminCreateTaxRateRule (+4 more)

### Community 43 - "Admin Tax Rates Query Config"
Cohesion: 0.33
Nodes (5): Entities, defaults, tax_rate, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 46 - "Admin Tax Validators"
Cohesion: 0.14
Nodes (9): AdminGetTaxProvidersParamsFieldsType, AdminGetTaxProvidersParamsType, AdminCreateTaxRegionType, AdminGetTaxRegionParamsType, AdminGetTaxRegionsParamsType, AdminUpdateTaxRegionType, AdminGetTaxProvidersParamsFields, AdminGetTaxRegionsParamsFields (+1 more)

### Community 47 - "Admin Tax Regions API"
Cohesion: 0.17
Nodes (10): Entities, adminTaxRegionRoutesMiddlewares, defaults, tax_region, listTransformQueryConfig, retrieveTransformQueryConfig, AdminCreateTaxRegion, AdminGetTaxRegionParams (+2 more)

### Community 9 - "Create Tax Regions Workflow"
Cohesion: 0.25
Nodes (5): CreateTaxRegionsWorkflowInput, CreateTaxRegionsWorkflowOutput, createTaxRegionsStep, createTaxRegionsWorkflow, createTaxRegionsWorkflowId

### Community 41 - "Admin Tax Route Handlers"
Cohesion: 0.11
Nodes (7): refetchTaxRate(), POST(), POST(), DELETE(), POST(), refetchTaxRegion(), POST()

### Community 1 - "Tax Module Package Config"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 6 - "Tax Data Models"
Cohesion: 0.36
Nodes (5): TaxProvider, TaxRateRule, TaxRegion, taxRegionCountryTopLevelCheckName, taxRegionProviderTopLevelCheckName

### Community 8 - "Tax Module TS Config"
Cohesion: 0.20
Nodes (9): compilerOptions, paths, extends, @models, @repositories, @services, @types, @utils (+1 more)

## Knowledge Gaps
- **6 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `tax_provider`, `tax_rate`, `tax_region` (+1 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 222 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TaxModuleService` connect `Tax Module Service` to `Tax Module Service Setup`, `Tax Module Integration Setup`, `Tax Data Models`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `tax_provider` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tax Module Service Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `TaxProviderService` connect `Tax Module Service` to `Tax Module Service Setup`, `Tax Provider Registration`, `Tax Provider Service`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Should `Get Item Tax Lines Step` be split into smaller, more focused modules?**
  _Cohesion score 0.12280701754385964 - nodes in this community are weakly interconnected._
- **Should `Tax Rate Rules Workflows` be split into smaller, more focused modules?**
  _Cohesion score 0.09879032258064516 - nodes in this community are weakly interconnected._
- **Should `Tax Workflow Step Definitions` be split into smaller, more focused modules?**
  _Cohesion score 0.10853658536585366 - nodes in this community are weakly interconnected._