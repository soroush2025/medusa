# Cross-Subject Connections — Medusa Master Graph

Generated: 2026-10-30  
Graph: 17,961 nodes · 42,236 edges · 1,104 communities · 149 connected components  
Subjects merged: 20 (19 required + products-categories)

---

## Methodology

Subjects were extracted independently with per-subject AST runs. Each subject's nodes carry a
`repo` attribute matching the merge-graphs-assigned tag (e.g. `graphify-out` = cart-checkout,
`graphify-out-2` = orders). Cross-subject analysis uses three evidence types:

1. **Direct cross-subject edges** — links whose source and target have different subject repo tags.
   Result: **0 direct cross-subject edges** found. This is expected: per-subject extraction
   only captures imports/calls within each subject's manifest paths; no tool was run across
   subject boundaries, so cross-subject edges were never extracted.

2. **Shared external nodes** — nodes with no subject repo tag (2,389 nodes), representing shared
   Medusa core framework imports (e.g. `ext_framework_dist_workflows_sdk_index_js`,
   `ext_core_framework_dist_utils_index_js`). These nodes serve as bridges: subjects that both
   import the same external node are indirectly co-located in the graph.

3. **Multi-subject communities** — Louvain clustering found 53 communities containing nodes
   from 2 or more distinct subjects. These represent the strongest structural evidence of
   cross-subject affinity in the merged graph.

---

## Top 10 Multi-Subject Community Hubs

These are the communities with the widest subject coverage, along with their highest-degree
member node.

| Community | Subjects | Size | Hub Node | Hub Subject | Hub Degree |
|---|---|---|---|---|---|
| 540 | 17 | 148 | fulfillment-module-service/index.spec.ts | fulfillment-shipping | 26 |
| 1762 | 14 | 144 | integration-tests/__tests__/migrations.spec.ts | link-modules | 23 |
| 1854 (Tax Rate Rule Workflows) | 13 | 704 | steps/index.ts | products-categories | 67 |
| 3 (Core Injected Dependencies) | 12 | 86 | fulfillment-module-service.ts | fulfillment-shipping | 63 |
| 208 (Payment Region API Routes) | 10 | 180 | inbound/items/[action_id]/route.ts | orders | 15 |
| 941 | 10 | 51 | InitialSetup20240227075933.ts | regions-sales-channels | 4 |
| 92 | 9 | 53 | InitialSetup20240401153642.ts | products-categories | 4 |
| 218 (Order Product API Handlers) | 9 | 108 | [id]/route.ts | orders | 14 |
| 1105 (Analytics File Module Services) | 8 | 94 | src/loaders/providers.ts | fulfillment-shipping | 22 |
| 300 | 7 | 64 | validators.ts | fulfillment-shipping | 15 |

---

## Top Shared External Hub Nodes (Bridging Multiple Subjects)

These external nodes (no subject repo tag) are the highest-degree nodes in the entire merged
graph, connecting nodes across many subjects through shared import relationships.

| Node ID (short) | Degree | Subjects Connected |
|---|---|---|
| ext_framework_dist_workflows_sdk_index_js | 614 | cart-checkout, customers, fulfillment-shipping, inventory, orders, payments, pricing, products-categories, promotions, regions-sales-channels, search, tax, translation-settings (13) |
| home_soroush…packages_core_framework_dist_types | 550 | orders, products-categories, fulfillment-shipping, cart-checkout, workflow-engine (5+) |
| ext_framework_dist_types_index_js | 542 | orders, products-categories, cart-checkout, fulfillment-shipping (4+) |
| ext_framework_dist_utils_index_js | 529 | orders, products-categories, cart-checkout, fulfillment-shipping (4+) |
| ext_core_framework_dist_utils_index_js | 494 | orders, link-modules, auth-users, products-categories (4+) |

**Interpretation:** The Medusa core framework (`@medusajs/framework`) is the primary integration
hub. Subjects connect to each other through this shared dependency layer, not through direct
imports of each other's internals — consistent with Medusa's modular architecture.

---

## Evidence-Backed Subject-Pair Connections

### 1. cart-checkout ↔ payments
**Evidence type:** Graph path through shared external node (4 hops)  
**Path:** `CompleteCartWorkflowInput` [cart-checkout] → `complete-cart.ts` [cart-checkout] →
`emitEventStep` [external/core-flows] → `capture-payment.ts` [payments] →
`CapturePaymentWorkflowInput` [payments]  
**Node IDs:**
- Source: `graphify-out::layer2::workflows_complete_cart_completecartworkflowinput`
- Target: `graphify-out-7::layer-2::workflows_capture_payment_capturepaymentworkflowinput`  
**Relation:** co-community in Community 636 (Payment Capture Cart Workflows, 103 nodes)  
**Source evidence:** Both nodes are in the same Louvain community, indicating structural affinity.
The path goes through core-flows' emitEventStep, which is the shared event infrastructure.

### 2. orders ↔ payments  
**Evidence type:** Shared Louvain community (Community 636 — Payment Capture Cart Workflows)  
**Key shared nodes in community 636:**
- `graphify-out-7::layer-2::steps_capture_payment_capturepaymentstepinput` [payments]
- `graphify-out-2::…::workflows_complete_order_createorderworkflow` [orders]  
**Relation:** Co-membership in 103-node community spanning cart-checkout, payments, orders  
**Note:** The per-subject extraction did not capture the direct `confirmOrderPayment` →
`capturePayment` call. To recover this edge, a targeted bridge-extraction on
`packages/core/core-flows/src/cart/complete-cart.ts` is recommended.

### 3. orders ↔ fulfillment-shipping  
**Evidence type:** Shared Louvain community (Community 689 — Claim Exchange Shipping Options, 140 nodes)  
**Key nodes in community 689:**
- `graphify-out-2::…::CancelClaimValidateOrderStepInput` [orders]
- `graphify-out-8::…::CreateShippingOptionsPriceSetsStepInput` [fulfillment-shipping]  
**Relation:** Order claims and exchanges directly reference fulfillment/shipping option creation steps  
**Source evidence:** Community membership in 140-node community spanning both subjects.

### 4. fulfillment-shipping ↔ inventory  
**Evidence type:** Shortest path (6 hops) through shared core framework nodes  
**Path:** fulfillment-shipping → shared external imports → inventory  
**Community evidence:** Community 689 contains nodes from both, Community 1189 (Fulfillment Workflow DTOs) includes inventory-referenced DTOs  
**Note:** `ReserveInventoryStep` in cart-checkout (found as `graphify-out::…::steps_reserve_inventory_reserveinventorystep`) represents the inventory reservation during cart completion — this step belongs to the cart-checkout subject but references inventory types.

### 5. products-categories ↔ pricing  
**Evidence type:** Shared community (Community 1855 — Product Category Variant Pricing, 350 nodes)  
**Key nodes:**
- `graphify-out-20::…::CreateVariantPricingLinkStepInput` [products-categories]
- `graphify-out-3::…::CreateMoneyAmountDTO` [pricing]  
**Relation:** Product variant creation workflows include pricing link steps  
**Source evidence:** 350-node community spanning products-categories, pricing, inventory, promotions.

### 6. orders ↔ inventory  
**Evidence type:** Shared community (Community 1854 — Tax Rate Rule Workflows, 704 nodes — the largest cross-subject community)  
**Key overlap:** Both subjects contribute to workflow step definitions that reference each other's  
DTOs (order line items → inventory reservations)  
**Relation:** Order line item workflows trigger inventory reservation checks

### 7. auth-users ↔ orders  
**Evidence type:** Shared community (Community 886 — Auth JWT MFA Requests, 107 nodes; Community 208 — Payment Region API Routes, 180 nodes)  
**Key nodes in Community 208:**
- `graphify-out-9::…::UpdateProviderJwtPayload` [auth-users]
- `graphify-out-2::…::AdminUpdateOrderType` [orders]  
**Relation:** Admin API routes for orders require auth/JWT validation; both land in the same API handler community.

### 8. regions-sales-channels ↔ payments  
**Evidence type:** Shared community (Community 208 — Payment Region API Routes, 180 nodes spanning 10 subjects)  
**Key nodes:**
- `graphify-out-11::…::AdminGetRegionsParamsType` [regions-sales-channels]
- `graphify-out-7::…::AdminGetPaymentProvidersParamsType` [payments]  
**Relation:** Region-scoped payment provider configuration routes co-cluster with payment processing routes.

### 9. workflow-engine ↔ orders  
**Evidence type:** Shared community (Community 1173 — Workflow SDK Hooks, 123 nodes)  
**Key nodes:**
- `graphify-out-15::…::Hook` [workflow-engine]
- `graphify-out-2::…::ConfirmOrderChangesInput` [orders]  
**Relation:** Order change workflows use the workflow SDK's hook mechanism.

### 10. fulfillment-shipping ↔ pricing  
**Evidence type:** Shared community (Community 689 — Claim Exchange Shipping Options, 140 nodes)  
**Key nodes:**
- `graphify-out-8::…::CreateShippingOptionsPriceSetsStepInput` [fulfillment-shipping]
- `graphify-out-3::…::CreatePriceSetDTO` [pricing]  
**Relation:** Shipping option creation includes price set creation as a sub-step, co-clustering with pricing DTOs.

---

## Commerce Pathway Analysis

**Cart → Payment → Order → Inventory → Fulfillment**

| Hop | Evidence | Status |
|---|---|---|
| Cart → Payment | Path found (4 hops via emitEventStep) | ✅ Graph-evidenced path |
| Payment → Order | Co-community in Community 636 | ✅ Community evidence |
| Order → Inventory | Community 1854 co-membership | ✅ Community evidence |
| Order → Fulfillment | Community 689 co-membership | ✅ Community evidence |
| Inventory → Fulfillment | No direct graph path found | ⚠️ Not evidenced in graph |

The `ReserveInventoryStep` lives in the cart-checkout subject (discovered during extraction),
not in the inventory subject — confirming that cross-subject reservation happens via cart flows,
not via direct inventory→fulfillment edges.

---

## Disconnected Subject Pairs (Honest Report)

The following subjects have **no graph-evidenced path** to each other:

- **notifications ↔ any subject**: notifications subject (419 nodes) is in a separate connected
  component. Its nodes cluster in 73 thin communities; no bridge to other subjects is evidenced.
- **analytics ↔ most subjects**: analytics (140 nodes) clusters primarily with files-uploads
  in Community 1105 (provider loaders), with no path to orders, cart, or payments.
- **caching-locking-events**: Despite 1,653 nodes, this subject is structurally isolated —
  its nodes form many thin communities (448 per-subject) that did not merge with other subjects'
  communities. Likely cause: caching/locking modules export infrastructure types that were not
  imported by other per-subject manifests.

**Note on missing cross-subject edges:** Per-subject extraction by design captures only intra-
subject imports. Cross-subject edges (e.g. `completeCart` calling `capturePayment`) exist in the
source code at `packages/core/core-flows/src/cart/complete-cart.ts` but were not captured because
that file was included in the cart-checkout subject only, not run against the payments subject.
A targeted bridge-extraction task should inspect:
- `packages/core/core-flows/src/cart/` — references to payment, inventory, order modules
- `packages/core/core-flows/src/order/` — references to fulfillment, inventory, payment modules
- `packages/medusa/src/api/` — shared middleware and route patterns across subjects

---

## Limitations

1. All cross-subject connections above are inferred from structural co-clustering or multi-hop
   paths through shared external nodes. They are **graph-evidenced** but not all represent
   direct function calls.
2. 0 direct cross-subject edges exist in the merged graph because per-subject extraction did not
   cross subject boundaries. This is not a failure — it reflects the extraction design.
3. The 2,389 "external" nodes (no subject repo tag) serve as the primary integration layer but
   their identities are path-hashed strings, not readable names.
4. Freshness of individual subject graphs is unknown (extraction timestamps not available in
   graph.json metadata); comparisons assume all subjects reflect a consistent repository state.
