# Graph Report - medusa  (2026-10-30)

## Corpus Check
- 499 files · ~202,773 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2952 nodes · 9277 edges · 127 communities (88 shown, 39 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ea78969d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Order Module Service Core
- Claim Exchange Return Flows
- Order Module Data Models
- Order Integration Tests
- Order Package Manifest
- Order Service and Changes
- Order Repositories
- Order Item Actions
- Order Change Processing
- Transform Order Entities
- Order Change Calculations
- Order Tax Line Services
- Add Line Items Workflow
- Order Migrations Feb-Jul 2024
- Order Migrations Jun-Aug 2024
- Order TS Config
- Order Address Types
- Order Item Change Actions
- Order Compute Action Context
- Create Shipment Workflow
- Credit Line Add Action
- Order Migration 2024-08-21 16:45:05
- Order Migration 2024-08-21 17:09:20
- Order Migration 2024-08-27 13:36:39
- Order Migration 2024-09-02 19:59:21
- Order Migration 2024-09-13 09:25:14
- Order Migration 2024-09-30 12:26:27
- Order Migration 2024-10-14 14:29:43
- Order Migration 2024-11-06 08:52:23
- Order Migration 2024-11-29 12:48:27
- Order Migration 2024-12-17 16:22:24
- Order Migration 2025-03-26 15:15:54
- Order Migration 2025-05-22 18:11:37
- Order Migration 2025-07-02 09:53:53
- Order Migration 2025-07-04 12:02:29
- Order Migration 2025-09-10 13:00:00
- Order Migration 2025-10-16 16:04:03
- Order Migration 2025-10-16 18:29:39
- Order Migration 2025-10-17 15:57:09
- Order Migration 2025-11-14 10:05:59
- Order Migration 2025-11-25 16:40:02
- Order Migration 2025-12-10 11:29:09
- Order Migration 2025-12-10 11:29:24
- Order Migration 2025-12-25 12:09:47
- Order Migration 2026-01-06 18:55:28
- Order Migration 2026-06-25 00:00:00
- Order Migration 2026-07-29 15:42:53
- Set Order Tax Lines
- Order Jest Config
- Return Reason DTOs
- Order Address DTOs
- Shipping Options Lookup
- Order Flow Step Definitions
- Order Change Workflow Validation
- Create Order Workflow
- Cancel Claim Workflow
- Cancel Exchange Workflow
- Complete Orders Step
- Begin Order Change Guards
- Cancel Order Change Workflows
- Create Order Line Items
- Order Change Shipping Workflows
- Complete Return Workflows
- Update Order Workflow
- Order Export Workflow
- Exchange and Claim Requests
- Delivery Registration Workflow
- Update Tax Lines Workflow
- Order Edit Request Workflows
- Order Transfer Requests
- Order Update Steps
- Create Fulfillment Workflow
- Payment Collection Settlement
- Cancel Order Workflow
- Draft Order Shipping Update
- Order Payment Collections
- Archive Orders Workflow
- Cancel Fulfillment Workflow
- Confirm Return Request
- Confirm Receive Return
- Confirm Claim Request
- Confirm Exchange Request
- Order Item Translations
- Order Change Cancellation Steps
- Order Transactions
- Draft Order Shipping Adjustments
- Draft Order Adjustments Steps
- Draft Order Shipping Options
- Promotion Code Validation
- Draft Order Lifecycle Workflows
- Delete Draft Order Workflow
- Return Reason Workflows
- Order Module Service Interface
- Order Shipping Method DTOs
- Order Change Action DTOs
- Order Mutation DTOs
- Order Tax Line DTOs
- Order Claim DTOs
- Order Exchange DTOs
- Order Return DTOs
- Shipping Method Adjustments
- Order Line Item DTOs
- Order DTOs
- Admin Order Validators
- Admin Order Query Configs
- Admin Order API Routes
- Order Edit API Routes
- Order Edit Shipping Routes
- Draft Order API Contracts
- Return API Validators
- Return Item Action Routes
- Claim API Validators
- Exchange API Validators
- Order Edit Item Routes
- Refund Reason Query Config
- Return Reason API Contracts
- Store Order API Validators
- Store Order Query Configs
- Order API Validation

## God Nodes (most connected - your core abstractions)
1. `IOrderModuleService` - 137 edges
2. `OrderModuleService` - 113 edges
3. `throwIfIsCancelled()` - 107 edges
4. `throwIfOrderChangeIsNotActive()` - 101 edges
5. `previewOrderChangeStep` - 95 edges
6. `setActionReference()` - 39 edges
7. `OrderChangeProcessing` - 38 edges
8. `validateDraftOrderChangeStep` - 32 edges
9. `throwIfOrderIsCancelled()` - 29 edges
10. `updateOrderChangeActionsStep` - 27 edges

## Surprising Connections (you probably didn't know these)
- `updateOrderChangeActionsWorkflow` --calls--> `updateOrderChangeActionsStep`  [EXTRACTED]
  workflows/update-order-change-actions.ts → steps/update-order-change-actions.ts
- `deleteOrderChangeActionsWorkflow` --calls--> `deleteOrderChangeActionsStep`  [EXTRACTED]
  workflows/delete-order-change-actions.ts → steps/delete-order-change-actions.ts
- `updateOrderChangesWorkflow` --calls--> `updateOrderChangesStep`  [EXTRACTED]
  workflows/update-order-changes.ts → steps/update-order-changes.ts
- `CancelTransferOrderRequestValidationStep` --calls--> `throwIfIsCancelled()`  [EXTRACTED]
  workflows/transfer/cancel-order-transfer.ts → utils/order-validation.ts
- `CancelTransferOrderRequestValidationStep` --calls--> `throwIfOrderChangeIsNotActive()`  [EXTRACTED]
  workflows/transfer/cancel-order-transfer.ts → utils/order-validation.ts

## Import Cycles
- 2-file cycle: `src/models/index.ts -> src/models/order.ts -> src/models/index.ts`
- 3-file cycle: `src/models/exchange.ts -> src/models/order.ts -> src/models/index.ts -> src/models/exchange.ts`
- 3-file cycle: `src/models/claim.ts -> src/models/order.ts -> src/models/index.ts -> src/models/claim.ts`
- 3-file cycle: `src/models/credit-line.ts -> src/models/order.ts -> src/models/index.ts -> src/models/credit-line.ts`
- 3-file cycle: `src/models/index.ts -> src/models/order-change.ts -> src/models/order.ts -> src/models/index.ts`
- 3-file cycle: `src/models/index.ts -> src/models/return.ts -> src/models/order.ts -> src/models/index.ts`
- 3-file cycle: `src/models/order-shipping-method.ts -> src/models/return.ts -> src/models/order.ts -> src/models/order-shipping-method.ts`
- 4-file cycle: `src/models/exchange.ts -> src/models/return.ts -> src/models/order.ts -> src/models/index.ts -> src/models/exchange.ts`
- 4-file cycle: `src/models/claim.ts -> src/models/return.ts -> src/models/order.ts -> src/models/index.ts -> src/models/claim.ts`
- 4-file cycle: `src/models/index.ts -> src/models/order-shipping-method.ts -> src/models/return.ts -> src/models/order.ts -> src/models/index.ts`
- 5-file cycle: `src/models/exchange.ts -> src/models/order-shipping-method.ts -> src/models/return.ts -> src/models/order.ts -> src/models/index.ts -> src/models/exchange.ts`
- 5-file cycle: `src/models/claim.ts -> src/models/order-shipping-method.ts -> src/models/return.ts -> src/models/order.ts -> src/models/index.ts -> src/models/claim.ts`

## Communities (127 total, 39 thin omitted)

### Community 0 - "Order Module Service Core"
Cohesion: 0.08
Nodes (7): OrderLineItemAdjustment, OrderShippingMethodAdjustment, OrderModuleService, CreateOrderChangeDTO, CreateOrderShippingMethodDTO, applyChangesToOrder(), formatOrder()

### Community 1 - "Claim Exchange Return Flows"
Cohesion: 0.07
Nodes (31): cancelClaim(), createOrderChange(), cancelExchange(), createOrderChange(), cancelReturn(), createOrderChange(), createClaim(), createClaimAndReturnEntities() (+23 more)

### Community 2 - "Order Module Data Models"
Cohesion: 0.15
Nodes (20): OrderAddress, OrderClaimItemImage, OrderClaimItem, OrderClaim, OrderCreditLine, OrderExchangeItem, OrderExchange, OrderLineItem (+12 more)

### Community 4 - "Order Package Manifest"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 5 - "Order Service and Changes"
Cohesion: 0.04
Nodes (15): joinerConfig, generateMethodForModels, InjectedDependencies, InjectedDependencies, OrderService, CreateOrderLineItemDTO, PartialUpsertOrderLineItemDTO, UpdateOrderLineItemDTO (+7 more)

### Community 6 - "Order Repositories"
Cohesion: 0.14
Nodes (11): OrderClaimRepository, OrderRepository, ReturnRepository, applyCrossModuleJoins(), configurePopulateWhere(), ensureOrderItemFieldsSelection(), ensureOrderShippingMethodFieldsSelection(), getVersionSubQuery() (+3 more)

### Community 7 - "Order Item Actions"
Cohesion: 0.07
Nodes (17): operation(), operation(), operation(), operation(), operation(), operation(), operation(), operation() (+9 more)

### Community 8 - "Order Change Processing"
Cohesion: 0.15
Nodes (8): ActionTypeDefinition, InternalOrderChangeEvent, OrderReferences, OrderSummaryCalculated, OrderTransaction, VirtualOrder, calculateOrderChange(), OrderChangeProcessing

### Community 10 - "Transform Order Entities"
Cohesion: 0.19
Nodes (10): orderEntity, cleanNestedRelations(), formatClaim(), formatExchange(), formatOrderReturn(), formatReturn(), mapRepositoryToOrderModel(), replace() (+2 more)

### Community 11 - "Order Change Calculations"
Cohesion: 0.09
Nodes (5): EVENT_STATUS, DONE, PENDING, OrderChangeEvent, ProcessOptions

### Community 12 - "Order Tax Line Services"
Cohesion: 0.24
Nodes (8): OrderLineItemTaxLine, OrderShippingMethodTaxLine, CreateOrderLineItemTaxLineDTO, UpdateOrderLineItemTaxLineDTO, CreateOrderShippingMethodTaxLineDTO, UpdateOrderShippingMethodTaxLineDTO, CreateOrderTaxLineDTO, UpdateOrderTaxLineDTO

### Community 13 - "Add Line Items Workflow"
Cohesion: 0.12
Nodes (3): addOrderLineItemsWorkflowId, OrderAddLineItemWorkflowOutput, variantFields

### Community 14 - "Order Migrations Feb-Jul 2024"
Cohesion: 0.18
Nodes (3): Migration20240219102530, Migration20240715102100, Migration20240716081800

### Community 15 - "Order Migrations Jun-Aug 2024"
Cohesion: 0.20
Nodes (3): Migration20240604100512, Migration20240715174100, Migration20240801085921

### Community 16 - "Order TS Config"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 17 - "Order Address Types"
Cohesion: 0.15
Nodes (9): CreateOrderAddressDTO, OrderAddressDTO, UpdateOrderAddressDTO, UpsertOrderAddressDTO, InitializeModuleInjectableDependencies, CreateOrderLineItemAdjustmentDTO, UpdateOrderLineItemAdjustmentDTO, CreateOrderShippingMethodAdjustmentDTO (+1 more)

### Community 19 - "Order Compute Action Context"
Cohesion: 0.20
Nodes (8): Adjustment, filterAdjustments(), normalizeProductContext(), prepareOrderComputeActionContextStep, prepareOrderComputeActionContextStepId, PrepareOrderComputeActionContextStepInput, ProductContext, ShippingOptionContext

### Community 20 - "Create Shipment Workflow"
Cohesion: 0.14
Nodes (9): UpdateOrderShippingMethodDTO, registerOrderShipmentStep, createOrderShipmentWorkflow, createOrderShipmentWorkflowId, CreateOrderShipmentWorkflowInput, createShipmentValidateOrder, CreateShipmentValidateOrderStepInput, OrderItemWithVariantDTO (+1 more)

### Community 48 - "Set Order Tax Lines"
Cohesion: 0.22
Nodes (6): normalizeItemTaxLinesForOrder(), normalizeShippingTaxLinesForOrder(), setOrderTaxLinesForItemsStep, setOrderTaxLinesForItemsStepId, SetOrderTaxLinesForItemsStepInput, TaxLinesOp

### Community 50 - "Return Reason DTOs"
Cohesion: 0.25
Nodes (5): FilterableOrderReturnReasonProps, OrderReturnReasonDTO, CreateOrderReturnReasonDTO, UpdateOrderReturnReasonDTO, UpdateOrderReturnReasonWithSelectorDTO

### Community 51 - "Order Address DTOs"
Cohesion: 0.29
Nodes (5): FilterableOrderAddressProps, OrderAddressDTO, CreateOrderAddressDTO, UpdateOrderAddressDTO, UpsertOrderAddressDTO

### Community 54 - "Order Flow Step Definitions"
Cohesion: 0.05
Nodes (25): archiveOrdersStepId, ArchiveOrdersStepInput, cancelOrderFulfillmentStepId, cancelOrdersStepId, CancelOrdersStepInput, createOrderClaimsStep, createOrderClaimsStepId, deleteClaimsStep (+17 more)

### Community 55 - "Order Change Workflow Validation"
Cohesion: 0.04
Nodes (117): deleteOrderChangeActionsStep, deleteOrderChangeActionsStepId, DeleteOrderChangeActionsStepInput, deleteOrderShippingMethods, previewOrderChangeStep, updateOrderChangeActionsStep, updateOrderShippingMethodsStep, throwIfIsCancelled() (+109 more)

### Community 56 - "Create Order Workflow"
Cohesion: 0.11
Nodes (10): createOrdersStep, productVariantsCacheTags, productVariantsFields, createOrdersWorkflow, createOrdersWorkflowId, createOrderWorkflow, CreateOrderWorkflowInput, getOrderInput() (+2 more)

### Community 57 - "Cancel Claim Workflow"
Cohesion: 0.33
Nodes (4): cancelOrderClaimStep, cancelOrderClaimStepId, cancelClaimValidateOrderStep, cancelOrderClaimWorkflow

### Community 58 - "Cancel Exchange Workflow"
Cohesion: 0.33
Nodes (4): cancelOrderExchangeStep, cancelOrderExchangeStepId, cancelExchangeValidateOrder, cancelOrderExchangeWorkflow

### Community 59 - "Complete Orders Step"
Cohesion: 0.40
Nodes (4): completeOrdersStep, completeOrdersStepId, CompleteOrdersStepInput, completeOrderWorkflow

### Community 60 - "Begin Order Change Guards"
Cohesion: 0.18
Nodes (11): createOrderExchangesStep, throwIfOrderIsCancelled(), beginExchangeOrderWorkflow, beginOrderExchangeValidationStep, beginOrderEditOrderWorkflow, beginOrderEditValidationStep, beginReturnOrderValidationStep, beginReturnOrderWorkflow (+3 more)

### Community 61 - "Cancel Order Change Workflows"
Cohesion: 0.07
Nodes (34): deleteOrderChangesStep, deleteExchangesStep, deleteReturnsStep, cancelBeginOrderClaimValidationStep, CancelBeginOrderClaimValidationStepInput, cancelBeginOrderClaimWorkflow, cancelBeginOrderClaimWorkflowId, CancelBeginOrderClaimWorkflowInput (+26 more)

### Community 62 - "Create Order Line Items"
Cohesion: 0.40
Nodes (3): createOrderLineItemsStep, createOrderLineItemsStepId, CreateOrderLineItemsStepInput

### Community 63 - "Order Change Shipping Workflows"
Cohesion: 0.12
Nodes (24): createOrderShippingMethods, CreateOrderShippingMethodsStepInput, prepareShippingMethod(), createClaimShippingMethodValidationStep, CreateClaimShippingMethodValidationStepInput, createClaimShippingMethodWorkflow, createClaimShippingMethodWorkflowId, CreateClaimShippingMethodWorkflowInput (+16 more)

### Community 64 - "Complete Return Workflows"
Cohesion: 0.12
Nodes (14): createCompleteReturnStep, createCompleteReturnStepId, receiveReturnStep, validateReturnReasons(), createAndCompleteReturnOrderWorkflow, createAndCompleteReturnOrderWorkflowId, createCompleteReturnValidationStep, CreateCompleteReturnValidationStepInput (+6 more)

### Community 65 - "Update Order Workflow"
Cohesion: 0.09
Nodes (14): registerOrderChangesStep, registerOrderChangeStepId, RegisterOrderChangeStepInput, updateOrderShippingMethodsTranslationsStep, updateOrderShippingMethodsTranslationsStepId, UpdateOrderShippingMethodsTranslationsStepInput, updateOrderTaxLinesTranslationsStep, updateOrderTaxLinesTranslationsStepId (+6 more)

### Community 66 - "Order Export Workflow"
Cohesion: 0.13
Nodes (12): exportOrdersStep, exportOrdersStepId, ExportOrdersStepInput, ExportOrdersStepOutput, normalizeOrderForExport(), getLastFulfillmentStatus(), getLastPaymentStatus(), ExportOrdersDTO (+4 more)

### Community 67 - "Exchange and Claim Requests"
Cohesion: 0.05
Nodes (78): ConfirmOrderChangesInput, DeleteOrderShippingMethodsStepInput, deleteExchangesStepId, DeleteOrderExchangesInput, listOrderChangeActionsByTypeStep, previewOrderChangeStepId, PreviewOrderChangeStepInput, createReturnsStep (+70 more)

### Community 68 - "Delivery Registration Workflow"
Cohesion: 0.13
Nodes (10): registerOrderDeliveryStep, registerOrderDeliveryStepId, markOrderFulfillmentAsDeliveredWorkflow, markOrderFulfillmentAsDeliveredWorkflowId, MarkOrderFulfillmentAsDeliveredWorkflowInput, OrderFulfillmentDeliverabilityValidationStepInput, orderFulfillmentDeliverablilityValidationStep, orderFulfillmentDeliverablilityValidationStepId (+2 more)

### Community 69 - "Update Tax Lines Workflow"
Cohesion: 0.14
Nodes (6): completeOrderFields, lineItemFields, orderFields, shippingMethodFields, updateOrderTaxLinesWorkflowId, UpdateOrderTaxLinesWorkflowInput

### Community 70 - "Order Edit Request Workflows"
Cohesion: 0.08
Nodes (23): cancelOrderReturnStep, CancelClaimValidateOrderStepInput, cancelOrderClaimWorkflowId, CancelExchangeValidateOrderStepInput, cancelOrderExchangeWorkflowId, getOrderDetailWorkflowId, GetOrderDetailWorkflowInput, confirmOrderEditRequestValidationStep (+15 more)

### Community 71 - "Order Transfer Requests"
Cohesion: 0.05
Nodes (48): createOrderChangeStep, createOrderChangeStepId, cancelOrderChangeWorkflowId, beginClaimOrderValidationStep, BeginClaimOrderValidationStepInput, beginClaimOrderWorkflow, beginClaimOrderWorkflowId, CompleteOrdersWorkflowInput (+40 more)

### Community 72 - "Order Update Steps"
Cohesion: 0.08
Nodes (12): updateOrderClaimsStep, updateOrderClaimsStepId, updateOrderExchangesStep, updateOrderExchangesStepId, UpdateReturnItemBySelector, updateReturnItemsStepId, updateReturnsStepId, UpdateReturnsStepInput (+4 more)

### Community 73 - "Create Fulfillment Workflow"
Cohesion: 0.16
Nodes (12): registerOrderFulfillmentStep, buildReservationsMap(), throwIfItemsAreNotGroupedByShippingRequirement(), createFulfillmentValidateOrder, CreateFulfillmentValidateOrderStepInput, createOrderFulfillmentWorkflow, createOrderFulfillmentWorkflowId, CreateOrderFulfillmentWorkflowInput (+4 more)

### Community 74 - "Payment Collection Settlement"
Cohesion: 0.18
Nodes (5): markPaymentCollectionAsPaid, markPaymentCollectionAsPaidId, MarkPaymentCollectionAsPaidInput, ThrowUnlessPaymentCollectionNotePaidInput, throwUnlessPaymentCollectionNotPaid

### Community 75 - "Cancel Order Workflow"
Cohesion: 0.12
Nodes (9): cancelOrdersStep, cancelOrderWorkflow, cancelOrderWorkflowId, cancelValidateOrder, CancelValidateOrderStepInput, createOrderRefundCreditLinesWorkflow, validateOrderRefundCreditLinesStep, refundCapturedPaymentsWorkflow (+1 more)

### Community 76 - "Draft Order Shipping Update"
Cohesion: 0.40
Nodes (4): updateDraftOrderShippingMethodStep, updateDraftOrderShippingMethodStepId, UpdateDraftOrderShippingMethodStepInput, updateDraftOrderShippingMethodWorkflow

### Community 78 - "Order Payment Collections"
Cohesion: 0.14
Nodes (8): CreateOrUpdateOrderPaymentCollectionInput, createOrUpdateOrderPaymentCollectionWorkflow, createOrUpdateOrderPaymentCollectionWorkflowId, getOrderPendingAmountStep, GetOrderPendingAmountStepInput, createOrderPaymentCollectionWorkflow, createOrderPaymentCollectionWorkflowId, CreateOrderPaymentCollectionWorkflowInput

### Community 79 - "Archive Orders Workflow"
Cohesion: 0.22
Nodes (5): archiveOrdersStep, ArchiveOrdersWorkflowInput, ArchiveOrdersWorkflowOutput, archiveOrderWorkflow, archiveOrderWorkflowId

### Community 80 - "Cancel Fulfillment Workflow"
Cohesion: 0.15
Nodes (9): cancelOrderFulfillmentStep, cancelOrderFulfillmentValidateOrder, CancelOrderFulfillmentValidateOrderStep, cancelOrderFulfillmentWorkflow, cancelOrderFulfillmentWorkflowId, CancelOrderFulfillmentWorkflowInput, OrderItemWithVariantDTO, prepareCancelOrderFulfillmentData() (+1 more)

### Community 84 - "Confirm Return Request"
Cohesion: 0.22
Nodes (11): CreateReturnItemsFromActionsInput, createReturnItemsFromActionsStep, confirmIfReturnItemsArePresent, confirmReturnRequestValidationStep, ConfirmReturnRequestValidationStepInput, confirmReturnRequestWorkflow, confirmReturnRequestWorkflowId, ConfirmReturnRequestWorkflowInput (+3 more)

### Community 85 - "Confirm Receive Return"
Cohesion: 0.15
Nodes (10): confirmOrderChanges, updateReturnItemsStep, createOrderCreditLinesWorkflow, validateOrderCreditLinesStep, ConfirmReceiveReturnRequestWorkflowInput, confirmReceiveReturnValidationStep, ConfirmReceiveReturnValidationStepInput, confirmReturnReceiveWorkflow (+2 more)

### Community 86 - "Confirm Claim Request"
Cohesion: 0.15
Nodes (12): CreateOrderClaimItemsFromActionsInput, createOrderClaimItemsFromActionsStep, confirmClaimRequestValidationStep, ConfirmClaimRequestValidationStepInput, confirmClaimRequestWorkflow, confirmClaimRequestWorkflowId, ConfirmClaimRequestWorkflowInput, confirmIfClaimItemsArePresent (+4 more)

### Community 87 - "Confirm Exchange Request"
Cohesion: 0.23
Nodes (12): createOrderExchangeItemsFromActionsStep, updateReturnsStep, confirmExchangeRequestValidationStep, ConfirmExchangeRequestValidationStepInput, confirmExchangeRequestWorkflow, confirmExchangeRequestWorkflowId, ConfirmExchangeRequestWorkflowInput, confirmIfExchangeItemsArePresent (+4 more)

### Community 88 - "Order Item Translations"
Cohesion: 0.18
Nodes (6): compensation(), ItemTranslationSnapshot, lineItemFields, updateOrderItemsTranslationsStep, updateOrderItemsTranslationsStepId, UpdateOrderItemsTranslationsStepInput

### Community 94 - "Order Change Cancellation Steps"
Cohesion: 0.12
Nodes (10): cancelOrderChangeStep, cancelOrderChangeStepId, declineOrderChangeStep, declineOrderChangeStepId, updateOrderChangeActionsStepId, UpdateOrderChangeActionsStepInput, cancelOrderChangeWorkflow, declineOrderChangeWorkflow (+2 more)

### Community 96 - "Order Transactions"
Cohesion: 0.33
Nodes (4): addOrderTransactionStep, addOrderTransactionStepId, AddOrderTransactionStepInput, AddOrderTransactionStepOutput

### Community 97 - "Draft Order Shipping Adjustments"
Cohesion: 0.05
Nodes (65): beginOrderEditOrderWorkflowId, BeginOrderEditValidationStepInput, getDraftOrderPromotionContextStep, GetDraftOrderPromotionContextStepInput, updateDraftOrderPromotionsStep, updateDraftOrderPromotionsStepId, UpdateDraftOrderPromotionsStepInput, validateDraftOrderChangeStep (+57 more)

### Community 98 - "Draft Order Adjustments Steps"
Cohesion: 0.11
Nodes (13): createDraftOrderLineItemAdjustmentsStep, createDraftOrderLineItemAdjustmentsStepId, CreateDraftOrderLineItemAdjustmentsStepInput, createDraftOrderShippingMethodAdjustmentsStep, createDraftOrderShippingMethodAdjustmentsStepId, CreateDraftOrderShippingMethodAdjustmentsStepInput, removeDraftOrderLineItemAdjustmentsStep, removeDraftOrderLineItemAdjustmentsStepId (+5 more)

### Community 99 - "Draft Order Shipping Options"
Cohesion: 0.09
Nodes (17): COMMON_OPTIONS_FIELDS, FetchShippingOptionForOrderWorkflowInput, FetchShippingOptionForOrderWorkflowOutput, fetchShippingOptionsForOrderWorkflowId, COMMON_OPTIONS_FIELDS, maybeRefreshShippingMethodsWorkflowId, MaybeRefreshShippingMethodsWorkflowInput, SetCalculatedShippingPricingContextHook (+9 more)

### Community 100 - "Promotion Code Validation"
Cohesion: 0.29
Nodes (8): validatePromoCodesToAddId, validatePromoCodesToAddStep, ValidatePromoCodesToAddStepInput, getMessageByCount(), throwIfCodesAreInactive(), throwIfCodesAreMissing(), throwIfNotDraftOrder(), ThrowIfNotDraftOrderInput

### Community 101 - "Draft Order Lifecycle Workflows"
Cohesion: 0.09
Nodes (13): validateDraftOrderStep, ValidateDraftOrderStepInput, beginDraftOrderEditWorkflow, convertDraftOrderStep, ConvertDraftOrderStepInput, convertDraftOrderWorkflow, convertDraftOrderWorkflowId, ConvertDraftOrderWorkflowInput (+5 more)

### Community 104 - "Delete Draft Order Workflow"
Cohesion: 0.21
Nodes (7): deleteDraftOrdersStep, deleteDraftOrdersStepId, DeleteDraftOrdersStepInput, DeleteDraftOrderStepInput, deleteDraftOrdersWorkflow, deleteDraftOrderWorkflowId, validateDraftOrdersStep

### Community 106 - "Return Reason Workflows"
Cohesion: 0.08
Nodes (19): createReturnReasonsStep, createReturnReasonsStepId, deleteReturnReasonStep, deleteReturnReasonStepId, DeleteReturnReasonStepInput, updateReturnReasonsStep, updateReturnReasonStepId, UpdateReturnReasonStepInput (+11 more)

### Community 112 - "Order Module Service Interface"
Cohesion: 0.04
Nodes (8): FilterableOrderChangeProps, FilterableOrderLineItemTaxLineProps, FilterableOrderShippingMethodTaxLineProps, OrderChangeDTO, CreateOrderChangeDTO, RegisterOrderChangeDTO, UpdateOrderChangeDTO, IOrderModuleService

### Community 113 - "Order Shipping Method DTOs"
Cohesion: 0.07
Nodes (14): FilterableOrderShippingMethodProps, OrderChangeReturn, OrderCreditLineDTO, OrderExchangeItemDTO, OrderReturnItemDTO, OrderShippingMethodDTO, CancelOrderChangeDTO, ConfirmOrderChangeDTO (+6 more)

### Community 114 - "Order Change Action DTOs"
Cohesion: 0.06
Nodes (16): ChangeActionType, FilterableOrderChangeActionProps, FilterableOrderTransactionProps, FulfillmentStatus, OrderChangeActionDTO, OrderChangeStatus, OrderClaimItemDTO, OrderClaimItemImageDTO (+8 more)

### Community 115 - "Order Mutation DTOs"
Cohesion: 0.07
Nodes (26): OrderItemDTO, OrderStatus, OrderTransactionDTO, BaseOrderBundledActionsDTO, BaseOrderBundledItemActionsDTO, CancelOrderExchangeDTO, CancelOrderFulfillmentDTO, CancelOrderReturnDTO (+18 more)

### Community 116 - "Order Tax Line DTOs"
Cohesion: 0.21
Nodes (9): OrderLineItemTaxLineDTO, OrderShippingMethodTaxLineDTO, OrderTaxLineDTO, CreateOrderLineItemTaxLineDTO, CreateOrderShippingMethodTaxLineDTO, CreateOrderTaxLineDTO, UpdateOrderLineItemTaxLineDTO, UpdateOrderShippingMethodTaxLineDTO (+1 more)

### Community 117 - "Order Claim DTOs"
Cohesion: 0.18
Nodes (7): FilterableOrderClaimProps, OrderClaimDTO, CancelOrderClaimDTO, CreateOrderClaimDTO, OrderClaimType, UpdateOrderClaimDTO, UpdateOrderClaimWithSelectorDTO

### Community 119 - "Order Exchange DTOs"
Cohesion: 0.16
Nodes (6): FilterableOrderExchangeProps, FilterableOrderProps, OrderExchangeDTO, CreateOrderExchangeDTO, UpdateOrderExchangeDTO, UpdateOrderExchangeWithSelectorDTO

### Community 120 - "Order Return DTOs"
Cohesion: 0.18
Nodes (6): FilterableReturnProps, ReturnDTO, CreateOrderReturnDTO, ReceiveOrderReturnDTO, UpdateOrderReturnWithSelectorDTO, UpdateReturnDTO

### Community 122 - "Shipping Method Adjustments"
Cohesion: 0.15
Nodes (8): FilterableOrderLineItemAdjustmentProps, FilterableOrderShippingMethodAdjustmentProps, OrderAdjustmentLineDTO, OrderLineItemAdjustmentDTO, OrderShippingMethodAdjustmentDTO, CreateOrderShippingMethodAdjustmentDTO, UpdateOrderShippingMethodAdjustmentDTO, UpsertOrderLineItemAdjustmentDTO

### Community 124 - "Order Line Item DTOs"
Cohesion: 0.28
Nodes (5): FilterableOrderLineItemProps, OrderLineItemDTO, OrderLineItemTotalsDTO, UpdateOrderLineItemDTO, UpdateOrderLineItemWithSelectorDTO

### Community 126 - "Order DTOs"
Cohesion: 0.14
Nodes (4): OrderDetailDTO, OrderDTO, CreateOrderDTO, OrderWorkflowDTO

### Community 127 - "Admin Order Validators"
Cohesion: 0.07
Nodes (35): adminOrderRoutesMiddlewares, AdminAuthorizeOrderPaymentSession, AdminAuthorizeOrderPaymentSessionType, AdminCompleteOrder, AdminCreateOrderCreditLines, AdminCreateOrderCreditLinesType, AdminGetOrderShippingOptionList, AdminGetOrderShippingOptionListType (+27 more)

### Community 129 - "Admin Order Query Configs"
Cohesion: 0.12
Nodes (15): defaultAdminExportOrderFields, defaultAdminOrderFields, defaultAdminOrderItemsFields, defaultAdminRetrieveOrderChangesFields, defaultAdminRetrieveOrderFields, Entities, credit_line, fulfillment (+7 more)

### Community 131 - "Admin Order API Routes"
Cohesion: 0.04
Nodes (3): AdminOrderCancelFulfillmentType, refetchOrder(), POST()

### Community 141 - "Order Edit API Routes"
Cohesion: 0.04
Nodes (3): AdminPostCancelReturnReqSchemaType, AdminPostCancelClaimReqSchemaType, AdminPostCancelExchangeReqSchemaType

### Community 144 - "Order Edit Shipping Routes"
Cohesion: 0.05
Nodes (5): AdminAddDraftOrderItemsType, AdminAddDraftOrderShippingMethodType, AdminUpdateDraftOrderActionShippingMethodType, AdminUpdateDraftOrderItemType, AdminUpdateDraftOrderShippingMethodType

### Community 147 - "Draft Order API Contracts"
Cohesion: 0.06
Nodes (32): adminDraftOrderRoutesMiddlewares, defaultAdminListOrderFields, defaultAdminOrderFields, Entities, order, listTransformQueryConfig, retrieveTransformQueryConfig, AdminAddDraftOrderItems (+24 more)

### Community 153 - "Return API Validators"
Cohesion: 0.06
Nodes (39): adminReturnRoutesMiddlewares, defaultAdminDetailsReturnFields, defaultAdminReturnFields, Entities, return, listTransformQueryConfig, retrieveTransformQueryConfig, AdminGetOrdersOrderParams (+31 more)

### Community 156 - "Return Item Action Routes"
Cohesion: 0.11
Nodes (3): AdminPostReturnsDismissItemsActionReqSchemaType, AdminPostReturnsReceiveItemsActionReqSchemaType, AdminPostExchangesRequestItemsReturnActionReqSchemaType

### Community 168 - "Claim API Validators"
Cohesion: 0.05
Nodes (43): adminClaimRoutesMiddlewares, defaultAdminClaimFields, defaultAdminDetailsClaimFields, Entities, order_claim, listTransformQueryConfig, retrieveTransformQueryConfig, AdminDeleteClaimItemActionSchema (+35 more)

### Community 182 - "Exchange API Validators"
Cohesion: 0.06
Nodes (38): adminExchangeRoutesMiddlewares, defaultAdminDetailsExchangeFields, defaultAdminExchangeFields, Entities, order_exchange, listTransformQueryConfig, retrieveTransformQueryConfig, AdminDeleteExchangeItemActionSchema (+30 more)

### Community 199 - "Order Edit Item Routes"
Cohesion: 0.06
Nodes (22): adminOrderEditRoutesMiddlewares, defaultAdminDetailsOrderEditFields, defaultAdminOrderEditFields, Entities, order, order_change, listTransformQueryConfig, retrieveTransformQueryConfig (+14 more)

### Community 214 - "Refund Reason Query Config"
Cohesion: 0.29
Nodes (6): defaultAdminRefundReasonFields, defaultAdminRetrieveRefundReasonFields, Entities, refund_reason, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 219 - "Return Reason API Contracts"
Cohesion: 0.13
Nodes (16): adminReturnReasonRoutesMiddlewares, defaultAdminRetrieveReturnReasonFields, defaultAdminReturnReasonFields, Entities, return_reason, listTransformQueryConfig, retrieveTransformQueryConfig, AdminCreateReturnReason (+8 more)

### Community 220 - "Store Order API Validators"
Cohesion: 0.13
Nodes (12): storeOrderRoutesMiddlewares, StoreAcceptOrderTransfer, StoreAcceptOrderTransferType, StoreDeclineOrderTransferRequest, StoreDeclineOrderTransferRequestType, StoreGetOrderParams, StoreGetOrderParamsType, StoreGetOrdersParams (+4 more)

### Community 223 - "Store Order Query Configs"
Cohesion: 0.12
Nodes (13): allowedStoreOrderExtraFields, allowedStoreOrderListExtraFields, allowedStoreOrderRetrieveExtraFields, defaultStoreOrderFields, defaultStoreRetrieveOrderFields, listTransformQueryConfig, retrieveTransformQueryConfig, allowedStoreReturnExtraFields (+5 more)

### Community 228 - "Order API Validation"
Cohesion: 0.06
Nodes (32): adminOrderChangesRoutesMiddlewares, defaultAdminRetrieveOrderChangeFields, Entities, order_change, retrieveTransformQueryConfig, AdminOrderChangeParams, AdminPostOrderChangesReqSchema, AdminPostOrderChangesReqSchemaType (+24 more)

## Knowledge Gaps
- **18 isolated node(s):** `DONE`, `PENDING`, `credit_line`, `fulfillment`, `order` (+13 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1291 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IOrderModuleService` connect `Order Module Service Interface` to `Order Shipping Method DTOs`, `Order Change Action DTOs`, `Order Mutation DTOs`, `Order Address DTOs`, `Order Claim DTOs`, `Order Tax Line DTOs`, `Order Exchange DTOs`, `Order Return DTOs`, `Return Reason DTOs`, `Shipping Method Adjustments`, `Order Line Item DTOs`, `Order DTOs`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `DONE`, `PENDING`, `credit_line` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Order Module Service Core` be split into smaller, more focused modules?**
  _Cohesion score 0.08043922369765066 - nodes in this community are weakly interconnected._
- **Why does `OrderModuleService` connect `Order Module Service Core` to `Order Module Data Models`, `Order Integration Tests`, `Order Tax Line Services`, `Order Service and Changes`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `Claim Exchange Return Flows` be split into smaller, more focused modules?**
  _Cohesion score 0.07467532467532467 - nodes in this community are weakly interconnected._
- **Why does `mapRepositoryToOrderModel()` connect `Transform Order Entities` to `Order Repositories`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Should `Order Module Data Models` be split into smaller, more focused modules?**
  _Cohesion score 0.14612794612794613 - nodes in this community are weakly interconnected._