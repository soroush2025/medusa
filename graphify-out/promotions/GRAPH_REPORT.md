# Graph Report - graphify-promotions-staging  (2026-10-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 782 nodes · 1734 edges · 51 communities (32 shown, 19 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Promotion Application Logic
- Promotion Fixtures
- Package Configuration
- Module Service
- Module Types
- Promotion Data Models
- Promotion Application
- Promotion Rules Engine
- Promotion Types
- Rule Validations
- TypeScript Config
- Budget Types
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Schema Migrations
- Jest Configuration
- Delete Promotion Rules
- Update Promotions
- Core Workflows
- Promotion Steps
- Update Campaigns
- Add Remove Campaigns
- Batch Promotion Rules
- Campaign Budget Usage
- Campaign Types
- Application Method Types
- Promotion Rule Types
- Compute Actions Types
- Promotion Rules API
- Campaign Budget DTOs
- Budget Value Types
- Admin Promotion Validators
- Campaign API Routes
- Promotion Admin Routes
- Promotion Query Config
- Campaign Admin Validators
- Campaign Admin Routes
- Campaign Query Config

## God Nodes (most connected - your core abstractions)
1. `PromotionModuleService` - 36 edges
2. `IPromotionModuleService` - 30 edges
3. `Promotion` - 20 edges
4. `PromotionDTO` - 14 edges
5. `PromotionRuleDTO` - 14 edges
6. `scripts` - 12 edges
7. `PromotionRule` - 11 edges
8. `getComputedActionsForBuyGet()` - 10 edges
9. `areRulesValidForContext()` - 10 edges
10. `CampaignDTO` - 10 edges

## Surprising Connections (you probably didn't know these)
- `updatePromotionsWorkflow` --calls--> `updatePromotionsStep`  [EXTRACTED]
  workflows/update-promotions.ts → steps/update-promotions.ts
- `CreatePromotionDTO` --references--> `CreateCampaignDTO`  [EXTRACTED]
  common/promotion.ts → mutations.ts
- `POST()` --calls--> `refetchPromotion()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `POST()` --calls--> `refetchBatchRules()`  [EXTRACTED]
  [id]/buy-rules/batch/route.ts → helpers.ts
- `POST()` --calls--> `refetchBatchRules()`  [EXTRACTED]
  [id]/rules/batch/route.ts → helpers.ts

## Import Cycles
- 3-file cycle: `common/index.ts -> common/promotion.ts -> mutations.ts -> common/index.ts`
- 4-file cycle: `common/application-method.ts -> common/promotion.ts -> mutations.ts -> common/index.ts -> common/application-method.ts`
- 4-file cycle: `common/campaign.ts -> common/promotion.ts -> mutations.ts -> common/index.ts -> common/campaign.ts`

## Communities (51 total, 19 thin omitted)

### Community 0 - "Promotion Application Logic"
Cohesion: 0.13
Nodes (11): applyPromotionToItems(), getComputedActionsForItems(), getValidItemsForPromotion(), validateContext(), applyPromotionToShippingMethods(), getComputedActionsForShippingMethods(), sortLineItemByPriceAscending(), sortShippingLineByPriceAscending() (+3 more)

### Community 1 - "Promotion Fixtures"
Cohesion: 0.14
Nodes (8): defaultCampaignsData, createCampaigns(), TODAY, defaultPromotionsData, createDefaultPromotion(), createDefaultPromotions(), createPromotions(), createPromotionsStepId

### Community 2 - "Package Configuration"
Cohesion: 0.05
Nodes (37): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+29 more)

### Community 3 - "Module Service"
Cohesion: 0.14
Nodes (9): PromotionModuleService, CreatePromotionDTO, ApplicationMethodRuleTypes, BUY_RULES, TARGET_RULES, CreatePromotionRuleDTO, UpdatePromotionRuleDTO, UpdatePromotionDTO (+1 more)

### Community 5 - "Promotion Data Models"
Cohesion: 0.35
Nodes (6): ApplicationMethod, CampaignBudget, CampaignBudgetUsage, Campaign, PromotionRule, PromotionRuleValue

### Community 6 - "Promotion Application"
Cohesion: 0.21
Nodes (14): applyPromotionToTargetItems(), calculateRemainingQuantities(), createComputedActionsFromPromotionApplication(), EligibleItem, filterItemsByPromotionRules(), getComputedActionsForBuyGet(), isValidPromotionContext(), normalizePromotionApplicationConfiguration() (+6 more)

### Community 7 - "Promotion Rules Engine"
Cohesion: 0.18
Nodes (3): buildPromotionRuleQueryFilterFromContext(), excludePromotionsWithRuleMatching(), RULE_SOURCES

### Community 8 - "Promotion Types"
Cohesion: 0.27
Nodes (5): Promotion, CreateApplicationMethodDTO, UpdateApplicationMethodDTO, CreateCampaignDTO, UpdateCampaignDTO

### Community 9 - "Rule Validations"
Cohesion: 0.12
Nodes (5): allowedAllocationForQuantity, allowedAllocationTargetTypes, allowedAllocationTypes, evaluateRuleValueCondition(), validatePromotionRuleAttributes()

### Community 10 - "TypeScript Config"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 11 - "Budget Types"
Cohesion: 0.13
Nodes (7): CreateCampaignBudgetDTO, CreateCampaignBudgetUsageDTO, UpdateCampaignBudgetDTO, UpdateCampaignBudgetUsageDTO, InitializeModuleInjectableDependencies, CreatePromotionRuleValueDTO, UpdatePromotionRuleValueDTO

### Community 31 - "Delete Promotion Rules"
Cohesion: 0.19
Nodes (8): deletePromotionRulesWorkflowStep, deletePromotionRulesWorkflowStepId, promotionRuleAttribute(), removeRulesFromPromotionsStep, removeRulesFromPromotionsStepId, batchPromotionRulesWorkflow, deletePromotionRulesWorkflow, deletePromotionRulesWorkflowId

### Community 32 - "Update Promotions"
Cohesion: 0.17
Nodes (8): updatePromotionsStep, updatePromotionsStatusWorkflow, updatePromotionsStatusWorkflowId, UpdatePromotionsStatusWorkflowInput, updatePromotionsValidationStep, updatePromotionsWorkflow, updatePromotionsWorkflowId, UpdatePromotionsWorkflowInput

### Community 33 - "Core Workflows"
Cohesion: 0.09
Nodes (16): createCampaignsStep, createPromotionsStep, deleteCampaignsStep, deletePromotionsStep, createCampaignsWorkflow, createCampaignsWorkflowId, CreateCampaignsWorkflowInput, createPromotionsWorkflow (+8 more)

### Community 34 - "Promotion Steps"
Cohesion: 0.14
Nodes (13): addOrRemoveCampaignPromotionsStep, addOrRemoveCampaignPromotionsStepId, addRulesToPromotionsStepId, createCampaignsStepId, deleteCampaignsStepId, DeleteCampaignsStepInput, deletePromotionsStepId, DeletePromotionsStepInput (+5 more)

### Community 35 - "Update Campaigns"
Cohesion: 0.18
Nodes (6): updateCampaignsStep, updateCampaignsStepId, updatePromotionsStepId, updateCampaignsWorkflow, updateCampaignsWorkflowId, UpdateCampaignsWorkflowInput

### Community 36 - "Add Remove Campaigns"
Cohesion: 0.21
Nodes (6): addCampaignPromotionsStep, addCampaignPromotionsStepId, removeCampaignPromotionsStep, addOrRemoveCampaignPromotionsWorkflow, addOrRemoveCampaignPromotionsWorkflowId, AddOrRemoveCampaignPromotionsWorkflowInput

### Community 37 - "Batch Promotion Rules"
Cohesion: 0.14
Nodes (9): addRulesToPromotionsStep, updatePromotionRulesStep, batchPromotionRulesWorkflowId, BatchPromotionRulesWorkflowInput, BatchPromotionRulesWorkflowOutput, createPromotionRulesWorkflow, createPromotionRulesWorkflowId, updatePromotionRulesWorkflow (+1 more)

### Community 43 - "Campaign Types"
Cohesion: 0.12
Nodes (6): CampaignDTO, FilterableCampaignProps, FilterablePromotionProps, CreateCampaignDTO, UpdateCampaignDTO, IPromotionModuleService

### Community 44 - "Application Method Types"
Cohesion: 0.20
Nodes (10): ApplicationMethodAllocationValues, ApplicationMethodDTO, ApplicationMethodTargetTypeValues, ApplicationMethodTypeValues, CreateApplicationMethodDTO, FilterableApplicationMethodProps, UpdateApplicationMethodDTO, CreatePromotionDTO (+2 more)

### Community 45 - "Promotion Rule Types"
Cohesion: 0.17
Nodes (11): CreatePromotionRuleDTO, FilterablePromotionRuleProps, PromotionRuleDTO, PromotionRuleOperatorValues, PromotionRuleTypes, RemovePromotionRuleDTO, UpdatePromotionRuleDTO, CreatePromotionRuleValueDTO (+3 more)

### Community 46 - "Compute Actions Types"
Cohesion: 0.13
Nodes (12): AddItemAdjustmentAction, AddShippingMethodAdjustment, CampaignBudgetExceededAction, ComputeActionAdjustmentLine, ComputeActionContext, ComputeActionItemLine, ComputeActionOptions, ComputeActions (+4 more)

### Community 47 - "Promotion Rules API"
Cohesion: 0.20
Nodes (4): AdminGetPromotionRulesRes, AddPromotionRulesWorkflowDTO, RemovePromotionRulesWorkflowDTO, UpdatePromotionRulesWorkflowDTO

### Community 48 - "Campaign Budget DTOs"
Cohesion: 0.23
Nodes (6): CampaignBudgetDTO, FilterableCampaignBudgetProps, CampaignBudgetUsageDTO, PromotionStatusValues, PromotionTypeValues, RuleTypeValues

### Community 49 - "Budget Value Types"
Cohesion: 0.28
Nodes (5): CampaignBudgetTypeValues, AddPromotionsToCampaignDTO, CreateCampaignBudgetDTO, RemovePromotionsFromCampaignDTO, UpdateCampaignBudgetDTO

### Community 50 - "Admin Promotion Validators"
Cohesion: 0.10
Nodes (18): AdminCreateApplicationMethod, AdminCreateApplicationMethodType, AdminCreatePromotion, AdminCreatePromotionRuleType, AdminCreatePromotionType, AdminGetPromotionParamsType, AdminGetPromotionRuleParamsType, AdminGetPromotionRuleTypeParamsType (+10 more)

### Community 51 - "Campaign API Routes"
Cohesion: 0.05
Nodes (32): refetchBatchRules(), refetchPromotion(), POST(), POST(), GET(), POST(), POST(), POST() (+24 more)

### Community 53 - "Promotion Admin Routes"
Cohesion: 0.15
Nodes (9): adminPromotionRoutesMiddlewares, AdminCreatePromotionRule, AdminGetPromotionParams, AdminGetPromotionRuleParams, AdminGetPromotionRuleTypeParams, AdminGetPromotionsParams, AdminGetPromotionsRuleValueParams, AdminUpdatePromotion (+1 more)

### Community 56 - "Promotion Query Config"
Cohesion: 0.20
Nodes (9): defaultAdminPromotionFields, defaultAdminPromotionRuleFields, Entities, promotion, listRuleTransformQueryConfig, listRuleValueTransformQueryConfig, listTransformQueryConfig, retrieveRuleTransformQueryConfig (+1 more)

### Community 58 - "Campaign Admin Validators"
Cohesion: 0.12
Nodes (8): AdminCreateCampaignType, AdminGetCampaignsParamsFields, AdminGetCampaignsParamsType, AdminUpdateCampaignType, CreateCampaign, CreateCampaignBudget, UpdateCampaign, UpdateCampaignBudget

### Community 59 - "Campaign Admin Routes"
Cohesion: 0.17
Nodes (5): adminCampaignRoutesMiddlewares, AdminCreateCampaign, AdminGetCampaignParams, AdminGetCampaignsParams, AdminUpdateCampaign

### Community 62 - "Campaign Query Config"
Cohesion: 0.33
Nodes (5): defaultAdminCampaignFields, Entities, campaign, listTransformQueryConfig, retrieveTransformQueryConfig

## Knowledge Gaps
- **10 isolated node(s):** `../../../_tsconfig.base.json`, `BUY_RULES`, `TARGET_RULES`, `@medusajs/framework`, `@medusajs/test-utils` (+5 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 324 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PromotionModuleService` connect `Module Service` to `Promotion Types`, `Promotion Fixtures`, `Module Types`, `Promotion Data Models`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `../../../_tsconfig.base.json`, `BUY_RULES`, `TARGET_RULES` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Promotion Application Logic` be split into smaller, more focused modules?**
  _Cohesion score 0.1330049261083744 - nodes in this community are weakly interconnected._
- **Why does `IPromotionModuleService` connect `Campaign Types` to `Campaign Budget Usage`, `Application Method Types`, `Promotion Rule Types`, `Compute Actions Types`, `Budget Value Types`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `Promotion Fixtures` be split into smaller, more focused modules?**
  _Cohesion score 0.13821138211382114 - nodes in this community are weakly interconnected._
- **Why does `Promotion` connect `Promotion Types` to `Promotion Application Logic`, `Promotion Fixtures`, `Module Service`, `Module Types`, `Promotion Data Models`, `Promotion Application`, `Rule Validations`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Should `Package Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._