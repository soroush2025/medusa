# Subject Coverage — Medusa Master Graph

Generated: 2026-10-30  
Master graph: 17,961 nodes · 42,236 edges · 1,104 communities · 149 connected components

---

## Input Summary

All 20 subject graphs were present, valid, and used as inputs. The optional 20th subject
(products-categories) was included. No subject was omitted.

| # | Subject | Input Nodes | Input Edges | Input Communities | Nodes in Master | Notes |
|---|---|---|---|---|---|---|
| 1 | cart-checkout | 1,060 | 2,510 | 65 | 728 | |
| 2 | orders | 2,952 | 9,277 | 127 | 2,370 | Largest subject by nodes |
| 3 | pricing | 885 | 1,779 | 59 | 652 | |
| 4 | inventory | 830 | 1,657 | 46 | 618 | |
| 5 | customers | 541 | 1,112 | 20 | 399 | |
| 6 | promotions | 782 | 1,734 | 51 | 563 | |
| 7 | payments | 858 | 1,815 | 49 | 633 | |
| 8 | fulfillment-shipping | 1,164 | 2,629 | 48 | 848 | Top hub subject |
| 9 | auth-users | 1,343 | 2,679 | 81 | 1,113 | |
| 10 | tax | 481 | 899 | 26 | 351 | Corpus check: 0 files (cluster-only mode) |
| 11 | regions-sales-channels | 814 | 1,485 | 45 | 643 | |
| 12 | notifications | 419 | 540 | 73 | 333 | Isolated component; 60/73 thin communities |
| 13 | search | 719 | 1,583 | 30 | 609 | |
| 14 | files-uploads | 242 | 319 | 17 | 174 | Smallest required subject |
| 15 | workflow-engine | 1,618 | 3,300 | 87 | 1,337 | 78 INFERRED edges |
| 16 | analytics | 140 | 165 | 13 | 104 | Smallest subject; 5 INFERRED edges |
| 17 | translation-settings | 825 | 1,618 | 36 | 653 | |
| 18 | caching-locking-events | 1,653 | 1,875 | 448 | 1,653 | 448 communities (fragmented); 184k tokens |
| 19 | link-modules | 777 | 1,457 | 39 | 576 | 182 nodes missing label (temp path prefix) |
| 20 | products-categories | 1,574 | 3,826 | 116 | 1,215 | **Optional 20th — INCLUDED** |
| — | **Raw sum** | **19,677** | **42,258** | **1,376** | | |
| — | **Master merged** | **17,961** | **42,236** | **1,104** | | |
| — | **Deduplication** | **1,716 deduplicated** | **22 collapsed** | Fresh recluster | | |

---

## Counting Policy

- **Nodes in Master** = nodes in the merged graph whose `repo` attribute maps to this subject.
  This is always ≤ Input Nodes because some nodes are deduplicated during merge (identical IDs).
- **Deduplication** occurs only on exact node ID match. Node IDs are `<repo-tag>::<local-id>`
  after merge-graphs re-tagging; actual deduplication is rare because subjects use different repo
  prefixes. The 1,716 deduplicated nodes are likely from shared external/framework imports that
  appeared in multiple subject extraction outputs before merge.
- **Subject community numbers** from input graphs are discarded; the master uses a single fresh
  Louvain clustering (1,104 communities).

---

## Overlap and Shared Entities

**53 communities** in the master graph contain nodes from 2 or more distinct subjects. These
represent the structural overlap after merging.

The largest cross-subject community (Community 1854 — Tax Rate Rule Workflows) spans **13
subjects** with 704 nodes, indicating that step-input DTOs and workflow contracts are widely
shared across the Medusa codebase.

**2,389 nodes** have no subject repo tag (`repo` attribute absent). These are external shared
nodes — typically core framework dist imports (`ext_framework_dist_*`, `ext_core_framework_*`)
that appear in multiple subjects and were merged as single shared nodes. They form the primary
integration layer between subjects.

---

## Provenance and Freshness Notes

| Subject | Corpus Check | Freshness Note |
|---|---|---|
| products-categories | 344 files · ~173k words | GRAPH_REPORT dated 2026-10-29 |
| orders | 499 files · ~202k words | GRAPH_REPORT dated 2026-10-30 |
| customers | 91 files · ~23k words | GRAPH_REPORT dated 2026-10-29 |
| regions-sales-channels | 149 files · ~25k words | GRAPH_REPORT dated 2026-10-30 |
| search | 269 files · ~89k words | GRAPH_REPORT dated 2026-10-30 |
| auth-users | 1343 files · 0 words | Unusual: 0 words despite 1343 files |
| notifications | 48 files · ~1.5M words | Unusually high word count (possible binary/large file included) |
| tax | 0 files · 0 words | Cluster-only mode; no corpus stats |
| analytics | 21 files · 0 words | 0 words (likely code-only, no docs) |
| cart-checkout | cluster-only mode | No corpus stats available |
| payments | cluster-only mode | No corpus stats available |
| inventory | cluster-only mode | No corpus stats available |
| fulfillment-shipping | cluster-only mode | No corpus stats available |
| pricing | cluster-only mode | No corpus stats available |
| promotions | cluster-only mode | No corpus stats available |
| files-uploads | cluster-only mode | No corpus stats available |
| link-modules | cluster-only mode | No corpus stats available |
| translation-settings | cluster-only mode | No corpus stats available |
| caching-locking-events | cluster-only mode | 184,600 input tokens used (unusual — may have processed docs) |
| workflow-engine | cluster-only mode | No corpus stats available |

**Freshness:** Graph extraction timestamps are not embedded in graph.json metadata. Freshness
is inferred from GRAPH_REPORT.md dates only: most subjects were built on 2026-10-29 or
2026-10-30. Provenance for subjects in cluster-only mode is unknown. No incompatible repository
revisions were detected (all graphs use graphify_version 0.9.85).

---

## Missing Coverage

No subjects are missing. All 19 required subjects plus the optional products-categories are
included.

The following coverage gaps exist within the merged master (not missing subjects, but missing
cross-subject edges):
- Cross-subject import edges (e.g. cart-checkout importing payment types) were not captured
  because extraction ran per-subject, not cross-subject.
- Admin UI (`packages/admin/dashboard/src/routes/`) was intentionally excluded from all subjects
  per the SUBJECT_MANIFESTS.md note.
- Test files are included in some subjects (link-modules, fulfillment-shipping) because they
  were within the manifest paths.

---

## Disconnected Components

The master graph has **149 connected components**:

- **1 giant component**: 14,718 nodes (81.9% of all nodes)
- **8 medium components**: 100–999 nodes each (sizes: 177, 173, 171, 167, ...)
- **64 small components**: 10–99 nodes each
- **56 micro components**: 2–9 nodes each
- **20 isolated nodes**: 1 node (no edges)

The notifications and analytics subjects are predominantly in smaller components outside the
giant component, reflecting their low integration with the core Medusa module graph.
