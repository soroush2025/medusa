# Graph Report - staging  (2026-10-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1060 nodes · 2510 edges · 65 communities (43 shown, 22 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Cart Module Service
- Cart Module Definition
- Package Manifest Config
- Cart Module Types
- Cart Data Models
- Promotion Adjustments Preparation
- Cart Test Fixtures
- TypeScript Path Config
- Line Item Data Preparation
- Initial Cart Migration
- Migration 2024-12-16
- Migration 2024-08-31
- Update Cart Workflow
- Migration 2024-12-05
- Cart Field Definitions
- Migration 2025-01-20
- Payment Collection Workflow
- Migration 2025-03-26
- Inventory Confirmation Workflow
- Migration 2025-10-17
- Migration 2025-12-08
- Migration 2026-06-26
- Jest Config
- Line Item Actions
- Cart Workflow Steps
- Promotion Code Application
- Variant Price Sets
- Payment Compensation Refund
- Tax Lines Steps
- Cart Creation Steps
- Cart Refresh Workflow
- Update Line Items Steps
- Shipping Method Steps
- Inventory Input Preparation
- Update Line Item Workflow
- Line Item DTOs
- Cart Credit Lines Creation
- Shipping Profile Filtering
- Cart Credit Lines Deletion
- Cart Retrieval Validation
- Migration 2024-11-06
- Variants and Shipping Validation
- Migration 2024-12-18
- Migration 2025-02-12
- Region and Customer Lookup
- Migration 2025-05-08
- Line Item Types
- Update Carts Step
- Complete Cart Workflow
- Inventory and Payment Steps
- Promotion Action Computation
- Cart Promotions Workflow
- Cart Service Delete Restore
- Workflow Input DTOs
- Shipping Method DTOs
- Cart Mutation DTOs
- Adjustment and Credit DTOs
- Tax Line DTOs
- Cart Address DTOs
- Cart DTOs
- Shipping Adjustment DTOs
- Shipping Tax Line DTOs
- Store Cart Middlewares Validators
- Store Cart Route Helpers

## God Nodes (most connected - your core abstractions)
1. `ICartModuleService` - 56 edges
2. `CartModuleService` - 43 edges
3. `validateCartStep` - 23 edges
4. `refetchCart()` - 22 edges
5. `updateCartPromotionsWorkflow` - 12 edges
6. `CartDTO` - 11 edges
7. `scripts` - 11 edges
8. `completeCartWorkflow` - 11 edges
9. `LineItem` - 10 edges
10. `CartLineItemDTO` - 9 edges

## Surprising Connections (you probably didn't know these)
- `completeCartWorkflow` --indirect_call--> `prepareConfirmInventoryInput()`  [INFERRED]
  workflows/complete-cart.ts → utils/prepare-confirm-inventory-input.ts
- `confirmVariantInventoryWorkflow` --indirect_call--> `prepareConfirmInventoryInput()`  [INFERRED]
  workflows/confirm-variant-inventory.ts → utils/prepare-confirm-inventory-input.ts
- `addToCartWorkflow` --calls--> `prepareLineItemData()`  [EXTRACTED]
  workflows/add-to-cart.ts → utils/prepare-line-item-data.ts
- `POST()` --calls--> `refetchCart()`  [EXTRACTED]
  [id]/complete/route.ts → helpers.ts
- `POST()` --calls--> `refetchCart()`  [EXTRACTED]
  [id]/customer/route.ts → helpers.ts

## Import Cycles
- None detected.

## Communities (65 total, 22 thin omitted)

### Community 0 - "Cart Module Service"
Cohesion: 0.17
Nodes (7): LineItemAdjustment, LineItem, LineItemTaxLine, ShippingMethodAdjustment, ShippingMethodTaxLine, CartModuleService, CreateShippingMethodDTO

### Community 2 - "Package Manifest Config"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 3 - "Cart Module Types"
Cohesion: 0.13
Nodes (17): CreateAddressDTO, UpdateAddressDTO, UpsertAddressDTO, CreateCartDTO, UpdateCartDTO, InitializeModuleInjectableDependencies, CreateLineItemAdjustmentDTO, UpdateLineItemAdjustmentDTO (+9 more)

### Community 4 - "Cart Data Models"
Cohesion: 0.33
Nodes (4): Address, Cart, CreditLine, ShippingMethod

### Community 6 - "Promotion Adjustments Preparation"
Cohesion: 0.15
Nodes (3): prepareAdjustmentsFromPromotionActionsStepId, PrepareAdjustmentsFromPromotionActionsStepInput, PrepareAdjustmentsFromPromotionActionsStepOutput

### Community 8 - "TypeScript Path Config"
Cohesion: 0.22
Nodes (8): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types

### Community 9 - "Line Item Data Preparation"
Cohesion: 0.18
Nodes (4): AddItemProductDTO, PrepareItemLineItemInput, PrepareLineItemDataInput, PrepareVariantLineItemInput

### Community 15 - "Cart Field Definitions"
Cohesion: 0.07
Nodes (18): createLineItemsStep, updateLineItemsStep, validateLineItemPricesStep, cartFieldsForCalculateShippingOptionsPrices, cartFieldsForPricingContext, cartFieldsForRefreshSteps, productVariantsCacheTags, productVariantsFields (+10 more)

### Community 17 - "Payment Collection Workflow"
Cohesion: 0.18
Nodes (5): createPaymentCollectionsStep, createPaymentCollectionForCartWorkflow, createPaymentCollectionForCartWorkflowId, validateExistingPaymentCollectionStep, ValidateExistingPaymentCollectionStepInput

### Community 19 - "Inventory Confirmation Workflow"
Cohesion: 0.13
Nodes (8): confirmInventoryStep, requiredVariantFieldsForInventoryConfirmation, confirmVariantInventoryWorkflow, confirmVariantInventoryWorkflowId, ConfirmVariantInventoryWorkflowOutput, createCartWorkflowId, CreateCartWorkflowInput, PrepareCartToCreateStepInput

### Community 24 - "Line Item Actions"
Cohesion: 0.13
Nodes (15): getLineItemActionsStep, getLineItemActionsStepId, GetLineItemActionsStepInput, GetLineItemActionsStepOutput, getLineItemPricingQuantitiesStep, getLineItemPricingQuantitiesStepId, GetLineItemPricingQuantitiesStepInput, ExistingLineItem (+7 more)

### Community 25 - "Cart Workflow Steps"
Cohesion: 0.22
Nodes (11): reserveInventoryStep, updateCartsStep, validateCartItemsStep, validateCartPaymentsStep, validateShippingStep, prepareAdjustmentsData(), prepareLineItemData(), prepareTaxLinesData() (+3 more)

### Community 26 - "Promotion Code Application"
Cohesion: 0.10
Nodes (14): getPromotionCodesToApply, getPromotionCodesToApplyId, GetPromotionCodesToApplyStepInput, GetPromotionCodesToApplyStepOutput, updateCartPromotionsStepId, UpdateCartPromotionStepInput, validateCartPaymentsStepId, ValidateCartPaymentsStepInput (+6 more)

### Community 27 - "Variant Price Sets"
Cohesion: 0.08
Nodes (20): createCalculationItemsFromBulkData(), createCalculationItemsFromSharedContext(), createContextKey(), fetchVariantPriceSets(), getVariantPriceSetsStep, GetVariantPriceSetsStepBulkInput, getVariantPriceSetsStepId, GetVariantPriceSetsStepInput (+12 more)

### Community 28 - "Payment Compensation Refund"
Cohesion: 0.16
Nodes (6): compensatePaymentIfNeededStep, compensatePaymentIfNeededStepId, CompensatePaymentIfNeededStepInput, refundPaymentAndRecreatePaymentSessionWorkflow, refundPaymentAndRecreatePaymentSessionWorkflowId, refundPaymentAndRecreatePaymentSessionWorkflowInput

### Community 29 - "Tax Lines Steps"
Cohesion: 0.13
Nodes (12): normalizeItemTaxLinesForCart(), normalizeShippingTaxLinesForCart(), setTaxLinesForItemsStep, setTaxLinesForItemsStepId, SetTaxLinesForItemsStepInput, normalizeItemTaxLinesForCart(), normalizeShippingTaxLinesForCart(), SetTaxLinesForItemsStepInput (+4 more)

### Community 30 - "Cart Creation Steps"
Cohesion: 0.09
Nodes (19): addShippingMethodToCartStepId, AddShippingMethodToCartStepInput, createCartsStepId, CreateCartsStepInput, CreateLineItemAdjustmentsCartStepInput, createLineItemAdjustmentsStepId, CreateLineItemsCartStepInput, createLineItemsStepId (+11 more)

### Community 31 - "Cart Refresh Workflow"
Cohesion: 0.10
Nodes (15): validateCartStep, taxLineContextResult, refreshCartItemsWorkflowId, RefreshCartItemsWorkflowInput, refreshPaymentCollectionForCartWorkflow, refreshPaymentCollectionForCartWorkflowId, RefreshPaymentCollectionForCartWorklowInput, cartFields (+7 more)

### Community 32 - "Update Line Items Steps"
Cohesion: 0.12
Nodes (6): updateLineItemsStepId, UpdateLineItemsStepInput, updateShippingMethodsStepId, UpdateShippingMethodsStepInput, updateLineItemsStepWithSelector, updateLineItemsStepWithSelectorId

### Community 33 - "Shipping Method Steps"
Cohesion: 0.10
Nodes (18): addShippingMethodToCartStep, removeShippingMethodFromCartStep, updateShippingMethodsStep, validateCartShippingOptionsStep, validateAndReturnShippingMethodsDataStep, validateCartShippingOptionsPriceStep, addShippingMethodToCartWorkflow, addShippingMethodToCartWorkflowId (+10 more)

### Community 34 - "Inventory Input Preparation"
Cohesion: 0.31
Nodes (5): ConfirmInventoryItem, ConfirmInventoryPreparationInput, formatInventoryInput(), prepareConfirmInventoryInput(), requiredOrderFieldsForInventoryConfirmation

### Community 35 - "Update Line Item Workflow"
Cohesion: 0.16
Nodes (10): validateVariantPricesStep, cartFields, CartQueryDTO, findLineItemToUpdateStep, FindLineItemToUpdateStepInput, prepareLineItemUpdateStep, PrepareLineItemUpdateStepInput, updateLineItemInCartWorkflow (+2 more)

### Community 36 - "Line Item DTOs"
Cohesion: 0.29
Nodes (5): CartLineItemDTO, CartLineItemTotalsDTO, FilterableLineItemProps, UpdateLineItemWithoutSelectorDTO, UpdateLineItemWithSelectorDTO

### Community 38 - "Shipping Profile Filtering"
Cohesion: 0.08
Nodes (14): filterCartItemsByShippingProfile(), ItemWithShippingProfile, calculatedShippingPricingContextResult, pricingContextResult, promotionContextResult, shippingOptionsContextResult, cartFields, listShippingOptionsForCartWorkflow (+6 more)

### Community 40 - "Cart Retrieval Validation"
Cohesion: 0.14
Nodes (7): retrieveCartStep, retrieveCartStepId, RetrieveCartStepInput, validateCartShippingOptionsStepId, ValidateCartShippingOptionsStepInput, validateCartStepId, ValidateCartStepInput

### Community 42 - "Variants and Shipping Validation"
Cohesion: 0.11
Nodes (8): getVariantsStep, getVariantsStepId, GetVariantsStepInput, validateAndReturnShippingMethodsDataStepId, ValidateShippingMethodsDataInput, ValidateShippingMethodsDataOutput, ValidateShippingInput, validateShippingStepId

### Community 45 - "Region and Customer Lookup"
Cohesion: 0.07
Nodes (25): createCartsStep, fetchDefaultRegion(), fetchDefaultStore(), fetchRegionById(), findOneOrAnyRegionStep, findOneOrAnyRegionStepId, FindOneOrAnyRegionStepInput, fetchCustomerById() (+17 more)

### Community 47 - "Line Item Types"
Cohesion: 0.83
Nodes (3): CreateLineItemDTO, PartialUpsertLineItemDTO, UpdateLineItemDTO

### Community 50 - "Complete Cart Workflow"
Cohesion: 0.07
Nodes (4): completeCartFields, completeCartWorkflowId, CompleteCartWorkflowInput, CompleteCartWorkflowOutput

### Community 53 - "Inventory and Payment Steps"
Cohesion: 0.15
Nodes (6): confirmInventoryStepId, ConfirmVariantInventoryStepInput, CreatePaymentCollectionCartStepInput, createPaymentCollectionsStepId, reserveInventoryStepId, ReserveVariantInventoryStepInput

### Community 54 - "Promotion Action Computation"
Cohesion: 0.29
Nodes (3): getActionsToComputeFromPromotionsStep, getActionsToComputeFromPromotionsStepId, GetActionsToComputeFromPromotionsStepInput

### Community 56 - "Cart Promotions Workflow"
Cohesion: 0.16
Nodes (9): createLineItemAdjustmentsStep, createShippingMethodAdjustmentsStep, prepareAdjustmentsFromPromotionActionsStep, removeLineItemAdjustmentsStep, removeShippingMethodAdjustmentsStep, updateCartPromotionsStep, updateCartPromotionsWorkflow, updateCartPromotionsWorkflowId (+1 more)

### Community 65 - "Workflow Input DTOs"
Cohesion: 0.09
Nodes (12): UpdateLineItemDTO, AddToCartWorkflowInputDTO, CompleteCartWorkflowInputDTO, ConfirmVariantInventoryWorkflowInputDTO, CreateCartAddressDTO, CreateCartCreateLineItemDTO, CreateCartCreditLinesWorkflowInput, CreateCartWorkflowInputDTO (+4 more)

### Community 66 - "Shipping Method DTOs"
Cohesion: 0.16
Nodes (5): CartShippingMethodDTO, FilterableShippingMethodProps, CreateShippingMethodDTO, CreateShippingMethodForSingleCartDTO, UpdateShippingMethodDTO

### Community 67 - "Cart Mutation DTOs"
Cohesion: 0.21
Nodes (8): CreateAdjustmentDTO, CreateLineItemAdjustmentDTO, CreateLineItemDTO, CreateLineItemForCartDTO, UpdateAdjustmentDTO, UpdateCartDataDTO, UpdateCartDTO, UpdateLineItemAdjustmentDTO

### Community 68 - "Adjustment and Credit DTOs"
Cohesion: 0.14
Nodes (6): AdjustmentLineDTO, CartCreditLineDTO, CreateCartCreditLineDTO, FilterableLineItemAdjustmentProps, LineItemAdjustmentDTO, UpsertLineItemAdjustmentDTO

### Community 69 - "Tax Line DTOs"
Cohesion: 0.24
Nodes (7): FilterableLineItemTaxLineProps, LineItemTaxLineDTO, TaxLineDTO, CreateLineItemTaxLineDTO, CreateTaxLineDTO, UpdateLineItemTaxLineDTO, UpdateTaxLineDTO

### Community 70 - "Cart Address DTOs"
Cohesion: 0.28
Nodes (6): CartAddressDTO, FilterableAddressProps, CreateAddressDTO, UpdateAddressDTO, UpsertAddressDTO, UpdateCartWorkflowInputDTO

### Community 71 - "Cart DTOs"
Cohesion: 0.25
Nodes (5): CartDTO, FilterableCartProps, CreateCartDTO, UpdateCartWithSelectorDTO, CartWorkflowDTO

### Community 72 - "Shipping Adjustment DTOs"
Cohesion: 0.36
Nodes (4): FilterableShippingMethodAdjustmentProps, ShippingMethodAdjustmentDTO, CreateShippingMethodAdjustmentDTO, UpdateShippingMethodAdjustmentDTO

### Community 73 - "Shipping Tax Line DTOs"
Cohesion: 0.36
Nodes (4): FilterableShippingMethodTaxLineProps, ShippingMethodTaxLineDTO, CreateShippingMethodTaxLineDTO, UpdateShippingMethodTaxLineDTO

### Community 74 - "Store Cart Middlewares Validators"
Cohesion: 0.05
Nodes (25): storeCartRoutesMiddlewares, CreateCart, ItemSchema, StoreAddCartLineItem, StoreAddCartLineItemType, StoreAddCartPromotions, StoreAddCartPromotionsType, StoreAddCartShippingMethods (+17 more)

### Community 76 - "Store Cart Route Helpers"
Cohesion: 0.08
Nodes (16): refetchCart(), POST(), POST(), DELETE(), POST(), POST(), DELETE(), POST() (+8 more)

## Knowledge Gaps
- **3 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 515 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ICartModuleService` connect `Cart Service Delete Restore` to `Shipping Method DTOs`, `Cart Mutation DTOs`, `Adjustment and Credit DTOs`, `Tax Line DTOs`, `Cart Address DTOs`, `Cart DTOs`, `Shipping Adjustment DTOs`, `Shipping Tax Line DTOs`, `Line Item DTOs`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cart Module Definition` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Why does `CartModuleService` connect `Cart Module Service` to `Cart Module Definition`, `Cart Data Models`, `Cart Service Tests`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `Package Manifest Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Why does `UpdateShippingMethodTaxLineDTO` connect `Cart Module Types` to `Cart Module Service`, `Cart Module Definition`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `Cart Module Types` be split into smaller, more focused modules?**
  _Cohesion score 0.1282051282051282 - nodes in this community are weakly interconnected._