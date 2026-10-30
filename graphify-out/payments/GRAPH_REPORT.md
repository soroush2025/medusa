# Graph Report - stage  (2026-10-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 858 nodes · 1815 edges · 49 communities (28 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.85)
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
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
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
- Community 33
- Community 34
- Community 35
- Community 36
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 48
- Community 49
- Community 53
- Community 61
- Community 63
- Community 67
- Community 70
- Community 71

## God Nodes (most connected - your core abstractions)
1. `IPaymentModuleService` - 43 edges
2. `PaymentModuleService` - 40 edges
3. `MedusaPaymentsProvider` - 29 edges
4. `PaymentProviderService` - 22 edges
5. `IPaymentProvider` - 19 edges
6. `SystemPaymentProvider` - 17 edges
7. `PaymentProviderOutput` - 16 edges
8. `PaymentProviderInput` - 15 edges
9. `Payment` - 14 edges
10. `scripts` - 11 edges

## Surprising Connections (you probably didn't know these)
- `validatePaymentProviderInRegionStep` --calls--> `listRegionPaymentProviderIds()`  [EXTRACTED]
  steps/validate-payment-provider-in-region.ts → utils/region-payment-providers.ts
- `POST()` --calls--> `refetchPayment()`  [EXTRACTED]
  [id]/capture/route.ts → helpers.ts
- `POST()` --calls--> `refetchPayment()`  [EXTRACTED]
  [id]/refund/route.ts → helpers.ts
- `GET()` --calls--> `refetchPayment()`  [EXTRACTED]
  [id]/route.ts → helpers.ts
- `capturePaymentWorkflow` --calls--> `capturePaymentStep`  [EXTRACTED]
  workflows/capture-payment.ts → steps/capture-payment.ts

## Import Cycles
- None detected.

## Communities (49 total, 21 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (11): HandledErrorType, CreateAccountHolderRequest, CreatePaymentRequest, MedusaAccountHolder, MedusaPayment, MedusaPaymentMethod, MedusaPaymentMethodSession, MedusaRefund (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (4): InitializeModuleInjectableDependencies, @medusajs/types, ModuleOptions, PaymentModuleOptions

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (7): CloudServiceError, MedusaPaymentsProvider, validateOptions(), MedusaPaymentsOptions, getAmountFromSmallestUnit(), getCurrencyMultiplier(), getSmallestUnit()

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (39): author, bugs, url, dependencies, stripe, description, devDependencies, @medusajs/framework (+31 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (4): Capture, Payment, PaymentModuleService, PaymentProviderService

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (5): PaymentCollection, PaymentProvider, PaymentSession, RefundReason, Refund

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (6): defaultPaymentCollectionData, defaultPaymentData, defaultPaymentSessionData, createPaymentCollections(), createPayments(), createPaymentSessions()

### Community 9 - "Community 9"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (11): capturePaymentStep, refundPaymentStep, refundPaymentStepId, RefundPaymentStepInput, capturePaymentWorkflow, capturePaymentWorkflowId, CapturePaymentWorkflowInput, refundPaymentWorkflow (+3 more)

### Community 25 - "Community 25"
Cohesion: 0.10
Nodes (9): authorizePaymentSessionStep, completeCartAfterPaymentStep, AuthorizePaymentSessionForOrderInput, authorizePaymentSessionForOrderWorkflow, authorizePaymentSessionForOrderWorkflowId, validatePendingAuthorizationStep, processPaymentWorkflow, processPaymentWorkflowId (+1 more)

### Community 26 - "Community 26"
Cohesion: 0.18
Nodes (8): refundPaymentsStep, refundPaymentsStepId, RefundPaymentsStepInput, refundPaymentsWorkflow, refundPaymentsWorkflowId, RefundPaymentsWorkflowInput, validatePaymentsRefundStep, ValidatePaymentsRefundStepInput

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (7): FilterableRefundReasonProps, RefundReasonDTO, CreateRefundReasonDTO, ProviderWebhookPayload, UpdateRefundReasonDTO, WebhookActionResult, PaymentModuleOptions

### Community 33 - "Community 33"
Cohesion: 0.08
Nodes (25): authorizePaymentSessionStepId, AuthorizePaymentSessionStepInput, cancelPaymentStep, cancelPaymentStepId, CancelPaymentStepInput, capturePaymentStepId, CapturePaymentStepInput, completeCartAfterPaymentStepId (+17 more)

### Community 34 - "Community 34"
Cohesion: 0.09
Nodes (17): createRefundReasonStep, createRefundReasonStepId, CreateRefundReasonStepInput, deleteRefundReasonsStep, updateRefundReasonsStep, updateRefundReasonStepId, UpdateRefundReasonStepInput, createRefundReasonsWorkflow (+9 more)

### Community 35 - "Community 35"
Cohesion: 0.24
Nodes (6): cancelPaymentStep, updatePaymentCollectionStep, cancelPaymentCollectionWorkflow, cancelPaymentCollectionWorkflowId, CancelPaymentCollectionWorkflowInput, validatePaymentCollectionCancellationStep

### Community 36 - "Community 36"
Cohesion: 0.11
Nodes (11): createPaymentAccountHolderStep, createPaymentSessionStep, deletePaymentSessionsStep, validateDeletedPaymentSessionsStep, validatePaymentProviderInRegionStep, createPaymentSessionsWorkflow, createPaymentSessionsWorkflowId, CreatePaymentSessionsWorkflowInput (+3 more)

### Community 39 - "Community 39"
Cohesion: 0.09
Nodes (37): PaymentSessionStatus, AuthorizePaymentInput, AuthorizePaymentOutput, CancelPaymentInput, CancelPaymentOutput, CapturePaymentInput, CapturePaymentOutput, CreateAccountHolderInput (+29 more)

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (6): CaptureDTO, FilterableCaptureProps, FilterablePaymentProviderProps, FilterableRefundProps, PaymentProviderDTO, RefundDTO

### Community 41 - "Community 41"
Cohesion: 0.11
Nodes (6): FilterablePaymentProps, PaymentDTO, CreateCaptureDTO, CreateRefundDTO, UpdatePaymentDTO, IPaymentModuleService

### Community 43 - "Community 43"
Cohesion: 0.16
Nodes (16): AccountHolderDTO, PaymentCollectionStatus, CreateAccountHolderDTO, CreatePaymentDTO, CreatePaymentMethodDTO, CreatePaymentProviderDTO, CreatePaymentSessionDTO, DeletePaymentMethodDTO (+8 more)

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (4): FilterablePaymentCollectionProps, PaymentCollectionDTO, CreatePaymentCollectionDTO, UpsertPaymentCollectionDTO

### Community 46 - "Community 46"
Cohesion: 0.13
Nodes (13): adminPaymentRoutesMiddlewares, AdminCreatePaymentCapture, AdminCreatePaymentCaptureType, AdminCreatePaymentRefund, AdminCreatePaymentRefundType, AdminGetPaymentParams, AdminGetPaymentParamsType, AdminGetPaymentProvidersParams (+5 more)

### Community 48 - "Community 48"
Cohesion: 0.20
Nodes (9): defaultAdminPaymentFields, defaultAdminPaymentPaymentProviderFields, Entities, capture, payment, refund, listTransformPaymentProvidersQueryConfig, listTransformQueryConfig (+1 more)

### Community 49 - "Community 49"
Cohesion: 0.10
Nodes (6): refetchPayment(), POST(), POST(), GET(), refetchPaymentCollection(), POST()

### Community 53 - "Community 53"
Cohesion: 0.15
Nodes (13): adminPaymentCollectionsMiddlewares, defaultPaymentCollectionFields, Entities, payment_collection, retrievePaymentCollectionTransformQueryConfig, AdminCreatePaymentCollection, AdminCreatePaymentCollectionType, AdminGetPaymentCollectionParams (+5 more)

### Community 61 - "Community 61"
Cohesion: 0.21
Nodes (7): storePaymentCollectionsMiddlewares, StoreCreatePaymentCollection, StoreCreatePaymentCollectionType, StoreCreatePaymentSession, StoreCreatePaymentSessionType, StoreGetPaymentCollectionParams, StoreGetPaymentCollectionParamsType

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (5): allowedStorePaymentCollectionExtraFields, defaultPaymentCollectionFields, retrievePaymentCollectionTransformQueryConfig, defaultAdminPaymentProviderFields, listTransformPaymentProvidersQueryConfig

### Community 67 - "Community 67"
Cohesion: 0.22
Nodes (3): storePaymentProvidersMiddlewares, StoreGetPaymentProvidersParams, StoreGetPaymentProvidersParamsType

## Knowledge Gaps
- **7 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`, `capture`, `payment` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 337 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `stripe` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08116883116883117 - nodes in this community are weakly interconnected._
- **Why does `PaymentModuleService` connect `Community 5` to `Community 1`, `Community 2`, `Community 6`, `Community 7`, `Community 10`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08307692307692308 - nodes in this community are weakly interconnected._
- **Why does `IPaymentModuleService` connect `Community 41` to `Community 40`, `Community 43`, `Community 44`, `Community 45`, `Community 27`, `Community 28`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._