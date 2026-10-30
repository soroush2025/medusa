# Graph Report - medusa  (2026-10-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1618 nodes · 3300 edges · 87 communities (59 shown, 28 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 78 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Workflow SDK Core Steps
- Workflow Retries Integration Tests
- InMemory Engine Package Manifest
- Workflow Orchestrator Interfaces
- InMemory Storage and Service
- Workflow Retry Interval Tests
- Workflow Composer and Response
- InMemory Migration 20231228
- Workflow Execution States
- Product Category Workflow Inputs
- InMemory TSConfig Paths
- Transaction Flow and State Map
- Redis Migration 20250908
- Jest Test Configuration
- Redis Engine Package Manifest
- Redis Connection and BullMQ
- Non-Idempotent Retention Workflows
- Redis Storage and Service
- Workflows Module Dependencies
- Workflow Engine Migration 20250505
- Manual Retry Integration Tests
- Create Product Workflow Inputs
- Database Retry Interval Tests
- Update Product Workflow Inputs
- Service Zones Workflow Inputs
- Redis TSConfig Paths
- Conditional Step Execution Tests
- Parallel Async Workflow Tests
- Branching Workflow Tests
- Shipping Options Workflow Inputs
- Workflow Engine Migration 20241206
- Orchestrator Job Types
- Invite Workflow Inputs
- Sequential Workflow Tests
- Create Cart Workflow Inputs
- Workflow Export and Runner
- Workflows SDK Package Manifest
- Workflow Composer and Proxy
- Step Handlers and Value Transformer
- Mock Scheduler Storage
- Receive Order Return Inputs
- Step Definition and Hook Composer
- Price Preferences Workflow Inputs
- Workflow Module Injectable Types
- Workflows SDK TSConfig
- Transaction Orchestrator and Lifecycle
- Local and Global Workflow Execution
- Workflow Step Execution Errors
- Orchestrator Step Builder
- InMemory Storage Retry Handling
- Orchestration Package Manifest
- Distributed Scheduler Storage Interface
- Distributed Job Scheduler
- Distributed Transaction Events
- Calculate Shipping Options Prices
- Core Types TSConfig
- Product Variants Workflow Inputs
- Order Management Workflow Inputs
- Order Fulfillment Workflow Inputs
- Shipping Profiles Workflow Inputs
- Order Claim and Edit Items
- Workflow Input Configuration Interfaces
- Update Shipping Options Inputs
- User and Invite Workflow Inputs
- Inventory Reservations Workflow Inputs
- Store Management Workflow Inputs
- Price List Workflow Inputs
- Regions Management Workflow Inputs
- Return Order Request Inputs
- Shipping Methods Workflow Inputs
- Admin Workflows Executions API
- Fulfillment Shipping Options Inputs
- Update Order Address Inputs
- Async Workflow Race Condition Tests
- Workflow Engine Migration 20250128a
- Workflow Engine Migration 20250505b
- Workflow Engine Migration 20250819a
- Workflow Engine Migration 20250819b
- Workflow Engine Migration 20231228b
- Workflow Engine Migration 20250120
- Workflow Engine Migration 20250128b
- Workflow Engine Migration 20250819c
- Workflow Engine Migration 20250819d
- Begin Claim Order Inputs

## God Nodes (most connected - your core abstractions)
1. `TransactionOrchestrator` - 62 edges
2. `TransactionStep` - 62 edges
3. `GlobalDistributedTransaction` - 56 edges
4. `RedisDistributedTransactionStorage` - 35 edges
5. `DistributedTransaction` - 33 edges
6. `OrchestratorBuilder` - 33 edges
7. `LocalWorkflow` - 31 edges
8. `TransactionStepsDefinition` - 28 edges
9. `InMemoryDistributedTransactionStorage` - 27 edges
10. `WorkflowOrchestratorService` - 23 edges

## Surprising Connections (you probably didn't know these)
- `CreateOrderReturnWorkflowInput` --references--> `CreateFulfillmentLabelWorkflowDTO`  [EXTRACTED]
  order/create-return-order.ts → fulfillment/create-fulfillment.ts
- `CreateOrderShipmentWorkflowInput` --references--> `CreateFulfillmentLabelWorkflowDTO`  [EXTRACTED]
  order/create-shipment.ts → fulfillment/create-fulfillment.ts
- `CreateOrderFulfillmentWorkflowInput` --references--> `CreateFulfillmentAddressWorkflowDTO`  [EXTRACTED]
  order/create-fulfillment.ts → fulfillment/create-fulfillment.ts
- `CreateOrderFulfillmentWorkflowInput` --references--> `CreateFulfillmentLabelWorkflowDTO`  [EXTRACTED]
  order/create-fulfillment.ts → fulfillment/create-fulfillment.ts
- `createWorkflow()` --calls--> `StepResponse`  [EXTRACTED]
  src/utils/composer/create-workflow.ts → src/utils/composer/helpers/step-response.ts

## Import Cycles
- 3-file cycle: `src/helper/index.ts -> src/helper/workflow-export.ts -> src/medusa-workflow.ts -> src/helper/index.ts`
- 4-file cycle: `src/services/index.ts -> src/services/workflow-orchestrator.ts -> src/utils/index.ts -> src/utils/workflow-orchestrator-storage.ts -> src/services/index.ts`

## Communities (87 total, 28 thin omitted)

### Community 0 - "Workflow SDK Core Steps"
Cohesion: 0.07
Nodes (35): step_1, step_2, step_3, step_1, step_2, step_3, createScheduled(), step_1 (+27 more)

### Community 1 - "Workflow Retries Integration Tests"
Cohesion: 0.07
Nodes (23): step1CompensateMock, step1InvokeMock, step2CompensateMock, step2InvokeMock, step_1, step_2, step1CompensateMock, step1InvokeMock (+15 more)

### Community 2 - "InMemory Engine Package Manifest"
Cohesion: 0.05
Nodes (40): author, bugs, url, dependencies, cron-parser, ulid, description, devDependencies (+32 more)

### Community 3 - "Workflow Orchestrator Interfaces"
Cohesion: 0.07
Nodes (26): IdempotencyKeyParts, NotifyOptions, RegisterStepFailureOptions, RegisterStepSuccessOptions, RetryStepOptions, SubscribeOptions, SubscriberHandler, Subscribers (+18 more)

### Community 4 - "InMemory Storage and Service"
Cohesion: 0.07
Nodes (6): WorkflowOrchestratorService, WorkflowsModuleService, WorkflowOrchestratorCancelOptions, calculateDelayFromExpression(), InMemoryDistributedTransactionStorage, parseNextExecution()

### Community 5 - "Workflow Retry Interval Tests"
Cohesion: 0.25
Nodes (12): retryIntervalStep1InvokeMock, retryIntervalStep2InvokeMock, step_1_retry_interval, step_2_after_retry, workflowRetryIntervalId, retryIntervalStep0InvokeMock, retryIntervalStep1InvokeMock, retryIntervalStep2InvokeMock (+4 more)

### Community 6 - "Workflow Composer and Response"
Cohesion: 0.12
Nodes (7): WorkflowResponse, transform(), StepFunction, WorkflowDataProperties, step1, step2, workflow

### Community 8 - "Workflow Execution States"
Cohesion: 0.11
Nodes (6): doneStates, failedStates, finishedStates, doneStates, failedStates, finishedStates

### Community 9 - "Product Category Workflow Inputs"
Cohesion: 0.15
Nodes (4): BatchUpdateProductsOnCategoryWorkflowInput, CreateProductCategoriesWorkflowInput, UpdateProductCategoriesWorkflowInput, ExportProductsDTO

### Community 10 - "InMemory TSConfig Paths"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 11 - "Transaction Flow and State Map"
Cohesion: 0.11
Nodes (12): finishedStatesSet, flowMergeableProperties, stateFlowOrder, stateFlowOrderMap, TransactionContext, TransactionPayload, TransactionStepError, SkipExecutionError (+4 more)

### Community 13 - "Jest Test Configuration"
Cohesion: 0.22
Nodes (4): defineJestConfig, defineJestConfig, defineJestConfig, defineJestConfig

### Community 15 - "Redis Engine Package Manifest"
Cohesion: 0.05
Nodes (40): author, bugs, url, dependencies, bullmq, ioredis, ulid, description (+32 more)

### Community 16 - "Redis Connection and BullMQ"
Cohesion: 0.12
Nodes (11): bullmq, ioredis, loggerMock, InitializeModuleInjectableDependencies, @medusajs/types, ModuleOptions, RedisWorkflowsOptions, baseModuleDeps (+3 more)

### Community 17 - "Non-Idempotent Retention Workflows"
Cohesion: 0.16
Nodes (7): step_1, step_2, step_3, workflowNotIdempotentWithRetentionStep2Invoke, workflowNotIdempotentWithRetentionStep3Invoke, WorkflowExecution, WorkflowExecution

### Community 18 - "Redis Storage and Service"
Cohesion: 0.06
Nodes (4): WorkflowOrchestratorCancelOptions, WorkflowOrchestratorService, WorkflowsModuleService, RedisDistributedTransactionStorage

### Community 22 - "Manual Retry Integration Tests"
Cohesion: 0.10
Nodes (19): step1CompensateMock, step1InvokeMock, step2CompensateMock, step2InvokeMock, step_1, step_2, step1CompensateMock, step1InvokeMock (+11 more)

### Community 23 - "Create Product Workflow Inputs"
Cohesion: 0.18
Nodes (10): CreateProductInputDTO, CreateProductOptionInputDTO, CreateProductProductCategoryInputDTO, CreateProductSalesChannelInputDTO, CreateProductsWorkflowInputDTO, CreateProductTagInputDTO, CreateProductTypeInputDTO, CreateProductVariantInputDTO (+2 more)

### Community 24 - "Database Retry Interval Tests"
Cohesion: 0.12
Nodes (18): retryIntervalStep1InvokeMock, retryIntervalStep2InvokeMock, step_1_retry_interval, step_2_after_retry, workflowRetryIntervalId, retryIntervalStep0InvokeMock, retryIntervalStep1InvokeMock, retryIntervalStep2InvokeMock (+10 more)

### Community 25 - "Update Product Workflow Inputs"
Cohesion: 0.18
Nodes (9): UpdateProductInputDTO, UpdateProductProductCategoryInputDTO, UpdateProductSalesChannelInputDTO, UpdateProductsWorkflowInputDTO, UpdateProductTagInputDTO, UpdateProductTypeInputDTO, UpdateProductVariantInputDTO, UpdateProductVariantOptionInputDTO (+1 more)

### Community 26 - "Service Zones Workflow Inputs"
Cohesion: 0.20
Nodes (4): CreateServiceZone, CreateServiceZonesWorkflowInput, UpdateServiceZone, UpdateServiceZonesWorkflowInput

### Community 27 - "Redis TSConfig Paths"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 28 - "Conditional Step Execution Tests"
Cohesion: 0.25
Nodes (5): conditionalStep2Invoke, conditionalStep3Invoke, step_1, step_2, step_3

### Community 29 - "Parallel Async Workflow Tests"
Cohesion: 0.29
Nodes (7): parallelStep2Invoke, parallelStep3Invoke, step_1, step_2, step_2_sub, step_3, subFlow

### Community 30 - "Branching Workflow Tests"
Cohesion: 0.33
Nodes (4): step1, step2, step3, subWorkflow

### Community 31 - "Shipping Options Workflow Inputs"
Cohesion: 0.25
Nodes (6): CreateCalculatedShippingOptionInput, CreateFlatRateShippingOptionInput, CreateFlatRateShippingOptionPriceRecord, CreateFlatShippingOptionInputBase, CreateShippingOptionsWorkflowInput, CreateShippingOptionsWorkflowOutput

### Community 33 - "Orchestrator Job Types"
Cohesion: 0.40
Nodes (5): JobType, RETRY, SCHEDULE, STEP_TIMEOUT, TRANSACTION_TIMEOUT

### Community 34 - "Invite Workflow Inputs"
Cohesion: 0.29
Nodes (3): AcceptInviteWorkflowInputDTO, DeleteInvitesWorkflowInput, ResendInvitesWorkflowInputDTO

### Community 35 - "Sequential Workflow Tests"
Cohesion: 0.33
Nodes (5): step_1, step_2, step_3, workflow2Step2Invoke, workflow2Step3Invoke

### Community 38 - "Workflow Export and Runner"
Cohesion: 0.08
Nodes (17): ulid, BaseFlowRunOptions, ExportedWorkflow, FlowCancelOptions, FlowRegisterStepFailureOptions, FlowRegisterStepSuccessOptions, FlowRetryStepOptions, FlowRunOptions (+9 more)

### Community 39 - "Workflows SDK Package Manifest"
Cohesion: 0.05
Nodes (37): author, bugs, url, dependencies, @medusajs/deps, @medusajs/modules-sdk, @medusajs/orchestration, @medusajs/utils (+29 more)

### Community 40 - "Workflow Composer and Proxy"
Cohesion: 0.11
Nodes (13): buildTransactionId(), createWorkflow(), proxify(), ConvertHooksToFunctions, ConvertHookToObject, HookHandler, KeysOfUnion, ReturnWorkflow (+5 more)

### Community 41 - "Step Handlers and Value Transformer"
Cohesion: 0.11
Nodes (12): ApplyStepOptions, buildStepContext(), createStepHandler(), InputObject, InputPrimitive, resolveProperty(), resolveValue(), unwrapInput() (+4 more)

### Community 43 - "Receive Order Return Inputs"
Cohesion: 0.33
Nodes (5): BeginReceiveOrderReturnWorkflowInput, ReceiveCompleteOrderReturnWorkflowInput, ReceiveOrderReturnItemsWorkflowInput, ReceiveReturnItem, UpdateReceiveItemReturnRequestWorkflowInput

### Community 44 - "Step Definition and Hook Composer"
Cohesion: 0.09
Nodes (19): createHook(), hook(), Hook, NOOP_RESULT, ZodLike, applyStep(), CompensateFn, createAndConfigureHandler() (+11 more)

### Community 45 - "Price Preferences Workflow Inputs"
Cohesion: 0.33
Nodes (3): CreatePricePreferencesWorkflowInput, UpdatePricePreferences, UpdatePricePreferencesWorkflowInput

### Community 48 - "Transaction Orchestrator and Lifecycle"
Cohesion: 0.05
Nodes (8): DistributedTransactionStorage, IDistributedTransactionStorage, DistributedTransaction, GlobalDistributedTransaction, TransactionOrchestrator, TransactionStep, TransactionStepHandler, TransactionFlow

### Community 49 - "Local and Global Workflow Execution"
Cohesion: 0.08
Nodes (5): TransactionMetadata, StepHandler, WorkflowHandler, WorkflowStepHandler, WorkflowStepHandlerArguments

### Community 50 - "Workflow Step Execution Errors"
Cohesion: 0.10
Nodes (8): BaseStepErrror, NonSerializableCheckPointError, PermanentStepFailureError, SkipCancelledExecutionError, SkipStepAlreadyFinishedError, SkipStepResponse, TransactionStepTimeoutError, TransactionTimeoutError

### Community 51 - "Orchestrator Step Builder"
Cohesion: 0.07
Nodes (8): InternalStep, OrchestratorBuilder, DistributedTransactionEvents, TransactionModelOptions, TransactionStepsDefinition, GlobalWorkflow, LocalWorkflow, WorkflowManager

### Community 52 - "InMemory Storage Retry Handling"
Cohesion: 0.12
Nodes (8): BaseInMemoryDistributedTransactionStorage_, BaseInMemoryDistributedTransactionStorage, getErrorSignature(), mergeStep(), TransactionCheckpoint, StepFeatures, TransactionModel, TransactionOptions

### Community 53 - "Orchestration Package Manifest"
Cohesion: 0.06
Nodes (32): author, bugs, url, dependencies, @medusajs/deps, @medusajs/utils, ulid, description (+24 more)

### Community 55 - "Distributed Job Scheduler"
Cohesion: 0.13
Nodes (6): MockSchedulerStorage, IDistributedSchedulerStorage, SchedulerOptions, GlobalWorkflowScheduler, WorkflowScheduler, WorkflowDefinition

### Community 56 - "Distributed Transaction Events"
Cohesion: 0.15
Nodes (13): DistributedTransactionEvent, BEGIN, COMPENSATE_BEGIN, COMPENSATE_STEP_FAILURE, COMPENSATE_STEP_SUCCESS, FINISH, RESUME, STEP_AWAITING (+5 more)

### Community 59 - "Product Variants Workflow Inputs"
Cohesion: 0.24
Nodes (8): CreateProductVariantsInputDTO, CreateProductVariantsWorkflowInputDTO, ImportProductsDTO, ImportProductsSummary, UpdateProductVariantsInputDTO, UpdateProductVariantsWorkflowInputDTO, UpsertProductVariantOptionInputDTO, UpsertProductVariantPricesInputDTO

### Community 60 - "Order Management Workflow Inputs"
Cohesion: 0.07
Nodes (14): AcceptOrderTransferWorkflowInput, BeginOrderExchangeWorkflowInput, BeginorderEditWorkflowInput, BeginOrderReturnWorkflowInput, CancelOrderClaimWorkflowInput, CancelOrderExchangeWorkflowInput, CancelOrderFulfillmentWorkflowInput, CancelOrderWorkflowInput (+6 more)

### Community 61 - "Order Fulfillment Workflow Inputs"
Cohesion: 0.15
Nodes (11): CreateFulfillmentAddressWorkflowDTO, CreateFulfillmentItemWorkflowDTO, CreateFulfillmentLabelWorkflowDTO, CreateFulfillmentOrderWorkflowDTO, CreateFulfillmentWorkflowInput, CreateShipmentWorkflowInput, CreateOrderFulfillmentItem, CreateOrderFulfillmentWorkflowInput (+3 more)

### Community 62 - "Shipping Profiles Workflow Inputs"
Cohesion: 0.25
Nodes (5): CreateShippingProfile, CreateShippingProfilesWorkflowInput, CreateShippingProfilesWorkflowOutput, UpdateShippingProfile, UpdateShippingProfilesWorkflowInput

### Community 63 - "Order Claim and Edit Items"
Cohesion: 0.11
Nodes (18): DeleteOrderClaimItemActionWorkflowInput, DeleteOrderEditItemActionWorkflowInput, DeleteOrderExchangeItemActionWorkflowInput, ExistingItem, NewItem, OrderAddLineItemWorkflowInput, OrderClaimAddNewItemWorkflowInput, OrderClaimItemWorkflowInput (+10 more)

### Community 64 - "Workflow Input Configuration Interfaces"
Cohesion: 0.12
Nodes (15): WorkflowInputConfig, CartWorkflow, CommonWorkflow, FulfillmentWorkflow, InventoryWorkflow, InviteWorkflow, OrderWorkflow, PriceListWorkflow (+7 more)

### Community 65 - "Update Shipping Options Inputs"
Cohesion: 0.22
Nodes (6): UpdateCalculatedShippingOptionInput, UpdateFlatRateShippingOptionInput, UpdateFlatShippingOptionInputBase, UpdateShippingOptionPriceRecord, UpdateShippingOptionsWorkflowInput, UpdateShippingOptionsWorkflowOutput

### Community 66 - "User and Invite Workflow Inputs"
Cohesion: 0.17
Nodes (4): CreateInvitesWorkflowInputDTO, CreateUsersWorkflowInputDTO, DeleteUserWorkflowInput, UpdateUsersWorkflowInputDTO

### Community 67 - "Inventory Reservations Workflow Inputs"
Cohesion: 0.12
Nodes (7): CreateInventoryItemInputDTO, CreateInventoryItemsWorkflowInputDTO, ExportInventoryItemsDTO, CreateReservationsWorkflowInput, CreateReservationsWorkflowOutput, UpdateReservationsWorkflowInput, UpdateReservationsWorkflowOutput

### Community 69 - "Price List Workflow Inputs"
Cohesion: 0.12
Nodes (10): CreatePriceListDTO, CreatePriceListPriceDTO, CreatePriceListRuleDTO, CreatePriceListWorkflowDTO, CreatePriceListWorkflowInputDTO, InputPrice, RemovePriceListPricesWorkflowInputDTO, RemovePriceListProductsWorkflowInputDTO (+2 more)

### Community 70 - "Regions Management Workflow Inputs"
Cohesion: 0.20
Nodes (4): CreateRegionsWorkflowInput, CreateRegionsWorkflowOutput, UpdateRegionsWorkflowInput, UpdateRegionsWorkflowOutput

### Community 71 - "Return Order Request Inputs"
Cohesion: 0.26
Nodes (9): CreateReturnItem, DeleteOrderClaimRequestItemReturnWorkflowInput, DeleteOrderExchangeRequestItemReturnWorkflowInput, DeleteRequestItemReceiveReturnWorkflowInput, DeleteRequestItemReturnWorkflowInput, OrderClaimRequestItemReturnWorkflowInput, OrderExchangeRequestItemReturnWorkflowInput, RequestItemReturnWorkflowInput (+1 more)

### Community 72 - "Shipping Methods Workflow Inputs"
Cohesion: 0.22
Nodes (8): DeleteClaimShippingMethodWorkflowInput, DeleteExchangeShippingMethodWorkflowInput, DeleteOrderEditShippingMethodWorkflowInput, DeleteReturnShippingMethodWorkflowInput, UpdateClaimShippingMethodWorkflowInput, UpdateExchangeShippingMethodWorkflowInput, UpdateOrderEditShippingMethodWorkflowInput, UpdateReturnShippingMethodWorkflowInput

### Community 73 - "Admin Workflows Executions API"
Cohesion: 0.06
Nodes (15): adminWorkflowsExecutionsMiddlewares, defaultAdminWorkflowExecutionDetailFields, defaultAdminWorkflowExecutionsFields, Entities, workflow_execution, listTransformQueryConfig, retrieveTransformQueryConfig, AdminCreateWorkflowsAsyncResponse (+7 more)

### Community 76 - "Async Workflow Race Condition Tests"
Cohesion: 0.15
Nodes (7): nestedWorkflow, nestedWorkflow2, step_1_background, ulid, nestedWorkflow, step_1_background, testRunId

## Knowledge Gaps
- **33 isolated node(s):** `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils`, `@medusajs/framework`, `@medusajs/test-utils` (+28 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 695 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ulid` connect `Async Workflow Race Condition Tests` to `Workflow Retries Integration Tests`, `InMemory Engine Package Manifest`, `Workflow Orchestrator Interfaces`, `Workflow Engine Migration 20250505b`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Workflow SDK Core Steps` be split into smaller, more focused modules?**
  _Cohesion score 0.06892230576441102 - nodes in this community are weakly interconnected._
- **Why does `ulid` connect `Workflow Engine Migration 20250505` to `Workflow Orchestrator Interfaces`, `Async Workflow Race Condition Tests`, `Redis Engine Package Manifest`, `Manual Retry Integration Tests`, `Database Retry Interval Tests`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `Workflow Retries Integration Tests` be split into smaller, more focused modules?**
  _Cohesion score 0.06882591093117409 - nodes in this community are weakly interconnected._
- **Why does `TransactionOrchestrator` connect `Transaction Orchestrator and Lifecycle` to `Transaction Flow and State Map`, `Local and Global Workflow Execution`, `Orchestrator Step Builder`, `InMemory Storage Retry Handling`, `Distributed Job Scheduler`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `InMemory Engine Package Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._