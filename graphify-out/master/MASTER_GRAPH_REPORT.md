# Medusa Master Graph Report

**Build date:** 2026-10-30  
**Graphify version:** 0.9.85  
**Repository:** /home/soroush/00-VP-Projects/03-medusa/medusa  
**Git revision:** ea78969d7e432dbbae125e0d29ca36401750955d (dirty — 111 modified files)  
**Subjects merged:** 20 (19 required + products-categories)  
**Token cost this build:** 0 input · 0 output (local AST only)

---

## Summary

| Metric | Value |
|---|---|
| Total nodes | **17,961** |
| Total edges | **42,236** |
| Communities (fresh recluster) | **1,104** |
| Connected components | **149** |
| Giant component | 14,718 nodes (81.9%) |
| Nodes deduplicated from raw input sum (19,677) | 1,716 |
| Edges collapsed | 22 |
| Multi-subject communities | 53 |
| Direct cross-subject edges | 0 (expected — see §6) |
| Integrity check | ✅ PASS — 0 dangling / 0 missing / 0 collapsed |
| Input hashes unchanged | ✅ All 20 verified |

---

## 1. Subject Inputs

All 20 subject graphs were present, valid (graphify_version 0.9.85 across all), and used as inputs. No subject was omitted.

| # | Subject | Nodes | Edges | Communities | Notes |
|---|---|---|---|---|---|
| 1 | cart-checkout | 1,060 | 2,510 | 65 | |
| 2 | orders | 2,952 | 9,277 | 127 | Largest subject |
| 3 | pricing | 885 | 1,779 | 59 | |
| 4 | inventory | 830 | 1,657 | 46 | |
| 5 | customers | 541 | 1,112 | 20 | |
| 6 | promotions | 782 | 1,734 | 51 | |
| 7 | payments | 858 | 1,815 | 49 | |
| 8 | fulfillment-shipping | 1,164 | 2,629 | 48 | Top hub subject |
| 9 | auth-users | 1,343 | 2,679 | 81 | |
| 10 | tax | 481 | 899 | 26 | |
| 11 | regions-sales-channels | 814 | 1,485 | 45 | |
| 12 | notifications | 419 | 540 | 73 | Isolated component |
| 13 | search | 719 | 1,583 | 30 | |
| 14 | files-uploads | 242 | 319 | 17 | Smallest required |
| 15 | workflow-engine | 1,618 | 3,300 | 87 | 78 INFERRED edges |
| 16 | analytics | 140 | 165 | 13 | Smallest subject |
| 17 | translation-settings | 825 | 1,618 | 36 | |
| 18 | caching-locking-events | 1,653 | 1,875 | 448 | Fragmented (448 communities) |
| 19 | link-modules | 777 | 1,457 | 39 | 182 nodes with temp IDs |
| 20 | products-categories | 1,574 | 3,826 | 116 | Optional 20th — included |
| — | **Raw sum** | **19,677** | **42,258** | **1,376** | |
| — | **Master merged** | **17,961** | **42,236** | **1,104 (fresh)** | |

---

## 2. Merge Results

```
graphify merge-graphs [all 20 inputs] --out graph.json

note: repo dir names collide; using distinct tags:
  graphify-out, graphify-out-2, ..., graphify-out-20
Merged 20 graphs -> 17961 nodes, 42236 edges
```

- **1,716 nodes deduplicated** — shared external framework import nodes that appeared in multiple per-subject extractions
- **22 edges collapsed** — exact duplicate links removed during merge
- **0 attribute conflicts** — no conflicting node/edge attribute values detected
- Identity policy: node IDs are `<repo-tag>::<layer>::<local-id>`; deduplication on exact ID match only

---

## 3. Integrity Diagnostic

```
graphify diagnose multigraph --graph graph.json

missing_endpoint_edges:                  0
dangling_endpoint_edges:                 0
self_loop_edges:                        94
exact_duplicate_edges:                   0
directed_same_endpoint_collapsed_edges:  0
undirected_same_endpoint_collapsed_edges: 0
```

Independent Python check: **0 orphaned edge endpoints** confirmed by networkx traversal.

**Result: PASS.**

Minor extraction warnings: 182 nodes (from link-modules) missing `label` and `source_file` fields due to a temp path prefix in their IDs — `graphify-out-18::tmp_graphify_cl_jr1vdrxy-10::...`. This is a provenance issue in the source subject graph, not introduced by the master build.

---

## 4. God Nodes (Most Connected — Core Abstractions)

The ten highest-degree nodes in the master graph. These are the load-bearing abstractions of the Medusa codebase.

| Rank | Node | Edges | Subject |
|---|---|---|---|
| 1 | `IOrderModuleService` | 137 | orders |
| 2 | `OrderModuleService` | 113 | orders |
| 3 | `throwIfIsCancelled()` | 107 | orders |
| 4 | `throwIfOrderChangeIsNotActive()` | 101 | orders |
| 5 | `previewOrderChangeStep` | 95 | orders |
| 6 | `ProductModuleService` | 94 | products-categories |
| 7 | `@medusajs/event-bus-redis` | 94 | caching-locking-events |
| 8 | `@medusajs/event-bus-local` | 92 | caching-locking-events |
| 9 | `@medusajs/cache-redis` | 91 | caching-locking-events |
| 10 | `@medusajs/cache-inmemory` | 90 | caching-locking-events |

The orders module dominates the top 5 — unsurprising for an e-commerce platform where order management is the central business entity. The event-bus and cache modules appearing at ranks 7–10 reveal that infrastructure services (event emission, caching) are cross-cutting concerns imported by nearly every other module.

**Top external integration hub (not subject-owned):**
- `ext_framework_dist_workflows_sdk_index_js` — degree 614, bridges 13 subjects. This is the `@medusajs/framework/workflows-sdk` dist barrel, the primary integration layer for the entire platform.

---

## 5. Surprising Connections

Edges found in the graph that reveal non-obvious relationships:

- **`CreateOrderReturnWorkflowInput` → `CreateFulfillmentLabelWorkflowDTO`** [EXTRACTED]
  `order/create-return-order.ts` → `fulfillment/create-fulfillment.ts`
  Return workflows directly reference fulfillment label creation — returns trigger fulfillment label generation.

- **`CreateOrderShipmentWorkflowInput` → `CreateFulfillmentLabelWorkflowDTO`** [EXTRACTED]
  `order/create-shipment.ts` → `fulfillment/create-fulfillment.ts`
  Shipment creation workflows reference the same fulfillment label DTO, confirming fulfillment-shipping and orders share a common DTO contract.

- **`AuthIdentityProviderService` → `AuthIdentityDTO`** [EXTRACTED]
  The auth identity provider service directly references the core auth identity DTO — tight coupling between the provider implementation and the shared identity contract.

- **`GET()` → `fetchPriceList()`** and **`POST()` → `fetchPriceList()`** [EXTRACTED]
  Both read and write route handlers for price lists resolve through the same `fetchPriceList` helper — a shared data-access function handling both read and mutate paths.

---

## 6. Cross-Subject Connections

### Why there are 0 direct cross-subject edges

Per-subject extraction ran AST analysis only within each subject's declared manifest paths. When `cart-checkout` was extracted, it only saw imports within its own packages — it did not follow imports into the `payments` or `orders` packages. This is the expected design.

Cross-subject relationships are evidenced in three ways in the master graph:

**a) Graph paths through shared external nodes**

The `@medusajs/framework` dist barrel nodes (2,389 "external" nodes in the merged graph) serve as the integration layer. When two subjects both import the same framework utility, they are co-located in the graph.

Confirmed path: `CompleteCartWorkflowInput` [cart-checkout] → `complete-cart.ts` → `emitEventStep` [external] → `capture-payment.ts` → `CapturePaymentWorkflowInput` [payments] — path length 4.

**b) Multi-subject Louvain communities**

53 communities in the master graph contain nodes from 2 or more distinct subjects. The Louvain algorithm found these clusters structurally — they are not asserted, they emerge from the graph topology.

| Community | Subjects covered | Size | Label |
|---|---|---|---|
| 1854 | 13 subjects | 704 | Tax Rate Rule Workflows |
| 540 | 17 subjects | 148 | Module Initialization Services |
| 1762 | 14 subjects | 144 | (migration test cluster) |
| 3 | 12 subjects | 86 | Core Injected Dependencies |
| 208 | 10 subjects | 180 | Payment Region API Routes |

**c) Top 10 evidence-backed subject-pair connections**

| # | Subject A | Subject B | Evidence type |
|---|---|---|---|
| 1 | cart-checkout | payments | Graph path (4 hops via emitEventStep) |
| 2 | orders | payments | Community 636 (103 nodes) |
| 3 | orders | fulfillment-shipping | Community 689 (140 nodes) |
| 4 | fulfillment-shipping | inventory | Community 689 + ReserveInventoryStep |
| 5 | products-categories | pricing | Community 1855 (350 nodes) |
| 6 | orders | inventory | Community 1854 (704 nodes) |
| 7 | auth-users | orders | Community 208 (180 nodes) |
| 8 | regions-sales-channels | payments | Community 208 (180 nodes) |
| 9 | workflow-engine | orders | Community 1173 (123 nodes) |
| 10 | fulfillment-shipping | pricing | Community 689 (shipping price sets) |

**Commerce pathway evidence:**

| Hop | Evidence | Status |
|---|---|---|
| Cart → Payment | Path found (4 hops) | ✅ Evidenced |
| Payment → Order | Community 636 | ✅ Evidenced |
| Order → Inventory | Community 1854 | ✅ Evidenced |
| Order → Fulfillment | Community 689 | ✅ Evidenced |
| Inventory → Fulfillment | No path found | ⚠️ Not evidenced in graph |

**Disconnected subjects** (no graph path to other subjects):
- **notifications** — isolated component, 333 nodes outside the giant component
- **analytics** — primarily isolated; clusters with files-uploads providers only

To recover direct cross-subject edges, a targeted bridge-extraction on `packages/core/core-flows/src/cart/`, `packages/core/core-flows/src/order/`, and `packages/medusa/src/api/` is recommended.

---

## 7. Structural Queries (5 Verified)

All queries executed locally via Python networkx. No API calls.

| Query | Result |
|---|---|
| Cart → Payment path | Found — 4 hops through core-flows emitEventStep |
| Highest-degree hub bridging 3+ subjects | `ext_framework_dist_workflows_sdk_index_js`, degree 614, 13 subjects |
| Shortest path OrderModuleService → PaymentModuleService | 6 hops (through shared external nodes) |
| Connected components | 149 total; giant = 14,718 nodes (81.9%) |
| Cross-subject edge relation types | 0 direct; all 42,236 edges are intra-subject |

---

## 8. Edge Relation Type Distribution

| Relation | Count |
|---|---|
| imports | 15,963 |
| contains | 9,484 |
| imports_from | 6,765 |
| references | 2,806 |
| calls | 2,700 |
| method | 2,605 |
| re_exports | 1,453 |
| inherits | 148 |
| case_of | 101 |
| rationale_for | 101 |
| indirect_call | 66 |
| extends | 38 |
| implements | 3 |
| dynamic_import | 2 |
| cites | 1 |

`imports` (38%) and `contains` (22%) dominate — consistent with a TypeScript monorepo where the graph primarily captures module import trees and class/function containment.

---

## 9. Import Cycles Detected

20+ import cycles were discovered. All route through `steps/index.ts` → `workflows/index.ts` in the customers/orders area:

- **3-file cycle:** `steps/validate-customer-account-creation.ts` → `workflows/index.ts` → `workflows/create-customer-account.ts` → back
- **20 four-file cycles** all via: `steps/index.ts` → `steps/validate-customer-account-creation.ts` → `workflows/index.ts` → `workflows/<various>.ts` → back

These are real circular dependencies in the source code worth investigating. The root cause appears to be that `steps/index.ts` and `workflows/index.ts` barrel-export each other's dependencies.

---

## 10. Connected Component Analysis

| Component size | Count |
|---|---|
| ≥ 1,000 nodes | 1 (14,718 — the giant component) |
| 100–999 nodes | 8 |
| 10–99 nodes | 64 |
| 2–9 nodes | 56 |
| Isolated (1 node) | 20 |

The 8 medium components (100–999 nodes) include the notifications subject cluster, isolated migration modules, and several test utility clusters that did not connect to the main graph.

---

## 11. Suggested Questions

Questions the master graph is uniquely positioned to answer:

- **Why does `TaxModuleService` bridge Community 893 to `Core Injected Dependencies` and `Module Initialization Services`?**
  High betweenness centrality (0.017) — this node is a cross-community bridge.

- **What connects `@medusajs/framework`, `@medusajs/test-utils`, and `_tsconfig.base.json` to the rest of the system?**
  221 weakly-connected nodes found — possible documentation gaps or missing edges.

- **Should `Cart Module Core` be split into smaller, more focused modules?**
  Cohesion score 0.052 — nodes in this community are weakly interconnected.

- **Why does `WorkflowOrchestratorService` bridge 5 communities?**
  High betweenness centrality (0.017) — this node connects workflow-engine to multiple other subjects.

- **Why does `ICartModuleService` bridge 7 communities?**
  High betweenness centrality (0.010) — the cart service interface is a wider integration point than the implementation alone.

- **What does the `notifications` subject connect to?**
  It is currently in an isolated component — is this by design, or are notification triggers missing from the graph?

- **Where does inventory reservation actually happen in the cart completion flow?**
  `ReserveInventoryStep` lives in cart-checkout, not inventory — this cross-subject step is worth a targeted bridge-extraction.

---

## 12. Known Limitations

1. **0 direct cross-subject edges** — per-subject extraction did not cross subject boundaries. Direct calls between modules (e.g. `completeCart` → `capturePayment`) exist in source but are not in this graph.
2. **182 link-modules nodes** have unstable temp path IDs (`graphify-out-18::tmp_graphify_cl_jr1vdrxy-10::...`). Rebuild the link-modules subject with a stable output path to fix.
3. **caching-locking-events anomaly** — 448 per-subject communities (vs. 13–127 for other subjects) and 184,600 input tokens during extraction suggest non-code files were included. Subject is structurally valid but fragmented.
4. **Admin UI excluded** — `packages/admin/dashboard/src/routes/` was intentionally excluded from all subjects.
5. **Freshness unknown** — extraction timestamps are not embedded in graph.json; subject graphs were built 2026-10-29 to 2026-10-30.
6. **HTML is aggregated** — 17,961 nodes → 1,104 community-level nodes in graph.html. Use `graphify query` for node-level detail.

---

## 13. Output Files

```
graphify-out/master/
  graph.json                   27.9 MB   SHA-256: 8c7434ce...
  GRAPH_REPORT.md             106.6 KB   SHA-256: 1a60b209...
  graph.html                    1.0 MB   SHA-256: d9464a49...
  .graphify_labels.json        30.4 KB   SHA-256: 20247e4c...
  .graphify_analysis.json       1.5 MB   SHA-256: 05c09310...
  MASTER_BUILD_MANIFEST.json    9.7 KB
  SUBJECT_COVERAGE.md           6.5 KB
  CROSS_SUBJECT_CONNECTIONS.md 12.1 KB
  VALIDATION_REPORT.md         14.2 KB
  MASTER_GRAPH_REPORT.md        this file

graphify-backups/master-20261030-155452-92410017/
  README.txt   (first build — no prior master to back up)
```
