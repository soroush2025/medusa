# Master Graphify Build Plan — Medusa (20 Subjects)

Generated: 2026-10-30  
Repository: /home/soroush/00-VP-Projects/03-medusa/medusa  
Master output: graphify-out/master/  
Graphify version: 0.9.85  
Python interpreter: /home/soroush110/.local/share/uv/tools/graphifyy/bin/python

---

## Problem Statement

Merge 20 validated per-subject `graph.json` files into a single master Medusa knowledge graph at `graphify-out/master/`, recluster communities, generate all companion outputs, verify integrity, and publish with a dated backup of any prior master state.

---

## Input Subject Inventory

| Subject | Nodes | Edges | Communities | graphify version |
|---|---|---|---|---|
| products-categories (optional 20th) | 1,574 | 3,826 | 116 | 0.9.85 |
| cart-checkout | 1,060 | 2,510 | 65 | 0.9.85 |
| orders | 2,952 | 9,277 | 127 | 0.9.85 |
| pricing | 885 | 1,779 | 59 | 0.9.85 |
| inventory | 830 | 1,657 | 46 | 0.9.85 |
| customers | 541 | 1,112 | 20 | 0.9.85 |
| promotions | 782 | 1,734 | 51 | 0.9.85 |
| payments | 858 | 1,815 | 49 | 0.9.85 |
| fulfillment-shipping | 1,164 | 2,629 | 48 | 0.9.85 |
| auth-users | 1,343 | 2,679 | 81 | 0.9.85 |
| tax | 481 | 899 | 26 | 0.9.85 |
| regions-sales-channels | 814 | 1,485 | 45 | 0.9.85 |
| notifications | 419 | 540 | 73 | 0.9.85 |
| search | 719 | 1,583 | 30 | 0.9.85 |
| files-uploads | 242 | 319 | 17 | 0.9.85 |
| workflow-engine | 1,618 | 3,300 | 87 | 0.9.85 |
| analytics | 140 | 165 | 13 | 0.9.85 |
| translation-settings | 825 | 1,618 | 36 | 0.9.85 |
| caching-locking-events | 1,653 | 1,875 | 448 | 0.9.85 |
| link-modules | 777 | 1,457 | 39 | 0.9.85 |
| **Raw sum** | **19,677** | **42,258** | **1,376** | |

---

## Required Output Files

```
graphify-out/master/
  graph.json
  GRAPH_REPORT.md
  graph.html
  .graphify_labels.json
  .graphify_analysis.json
  MASTER_BUILD_MANIFEST.json
  SUBJECT_COVERAGE.md
  CROSS_SUBJECT_CONNECTIONS.md
  VALIDATION_REPORT.md
```

---

## Build Flow

```
20 Subject graph.json files
  → Task 1: Hash & validate all inputs
  → Task 2: graphify merge-graphs → STAGING/graph.json
  → Task 3: diagnose multigraph on merged graph
      → 0 dangling/missing → Task 4: cluster-only + flatten nested output
      → issues found      → STOP: report blocker
  → Task 5: curate community labels + regenerate HTML
  → Task 6: cross-subject connectivity analysis → CROSS_SUBJECT_CONNECTIONS.md
  → Task 7: 5 structural queries
  → Task 8: VALIDATION_REPORT.md + SUBJECT_COVERAGE.md + MASTER_BUILD_MANIFEST.json
  → Task 9: rehash inputs, backup, publish to graphify-out/master/
  → Clean up STAGING
```

---

## Task 1: Environment Check and Input SHA-256 Hashing

**Objective:** Confirm the graphify binary and Python interpreter are operational, then record a
pre-run SHA-256 hash of every input graph.json.

Implementation steps:
1. Run `command -v graphify` and `graphify --version` to confirm the installed binary.
2. Run `$(cat graphify-out/.graphify_python) -c "import graphify; print(graphify.__version__)"` to
   confirm the Python API version matches 0.9.85.
3. For each of the 20 input `graph.json` files, compute `sha256sum graphify-out/<slug>/graph.json`.
4. Record merged node/edge counts for each subject from GRAPH_REPORT.md summaries.
5. Confirm no `graphify-out/master/` exists (clean slate).
6. Confirm/create `graphify-backups/` directory.

**Success criteria:** All 20 sha256sum commands return valid hashes; graphify version prints 0.9.85;
no error from the Python import.

---

## Task 2: Create Staging Directory and Run Merge

**Objective:** Merge all 20 input graphs into a single graph.json in a safe temp staging area.

Implementation steps:
1. Create staging dir: `STAGING=$(mktemp -d)`.
2. Run `graphify merge-graphs` with the explicit ordered input list (check --help first for exact syntax).
3. Parse output graph.json: confirm valid JSON, nodes/edges/graph keys, graphify_version 0.9.85.
4. Record merged node and edge counts; compare to raw sum; document deduplication count.

Input list (in order):
```
graphify-out/cart-checkout/graph.json
graphify-out/orders/graph.json
graphify-out/pricing/graph.json
graphify-out/inventory/graph.json
graphify-out/customers/graph.json
graphify-out/promotions/graph.json
graphify-out/payments/graph.json
graphify-out/fulfillment-shipping/graph.json
graphify-out/auth-users/graph.json
graphify-out/tax/graph.json
graphify-out/regions-sales-channels/graph.json
graphify-out/notifications/graph.json
graphify-out/search/graph.json
graphify-out/files-uploads/graph.json
graphify-out/workflow-engine/graph.json
graphify-out/analytics/graph.json
graphify-out/translation-settings/graph.json
graphify-out/caching-locking-events/graph.json
graphify-out/link-modules/graph.json
graphify-out/products-categories/graph.json
```

**Success criteria:** STAGING/graph.json exists, is valid JSON, node count > 0 and ≤ 19,677,
edge count ≤ 42,258.

---

## Task 3: Integrity Diagnostic on Merged Graph

**Objective:** Run the graphify integrity diagnostic before clustering.

Implementation steps:
1. Run: `graphify diagnose multigraph --graph $STAGING/graph.json`
2. Parse output: check for 0 dangling, 0 missing, 0 collapsed edges.
3. Independent Python check: load merged graph.json with networkx, verify all edge endpoints
   exist in node set, report orphaned edges.
4. Document any discrepancy.
5. If dangling/missing > 0: STOP, report affected node IDs.

**Success criteria:** Zero dangling endpoints, zero missing endpoints, zero collapsed edges.

---

## Task 4: Recluster Merged Graph

**Objective:** Recompute communities on the merged master graph.

Implementation steps:
1. Run: `graphify cluster-only $STAGING --graph $STAGING/graph.json --no-label`
2. Handle known nested-output quirk:
   ```bash
   if [ -d "$STAGING/graphify-out" ]; then
     mv $STAGING/graphify-out/* $STAGING/
     rmdir $STAGING/graphify-out
   fi
   ```
3. Confirm expected files in STAGING: graph.json, GRAPH_REPORT.md, graph.html,
   .graphify_labels.json, .graphify_analysis.json
4. Record community count from regenerated GRAPH_REPORT.md.
5. Confirm graph.json node/edge count unchanged from post-merge.

**Success criteria:** All 5 companion files present; node/edge count unchanged; fresh community count.

---

## Task 5: Community Label Curation

**Objective:** Replace auto-generated hub-based labels with readable 2-5 word names for the 30
largest communities.

Implementation steps:
1. Load $STAGING/.graphify_analysis.json — read communities dict, find 30 largest by member count.
2. For each large community, inspect member node labels to derive a readable name.
3. Construct labels dict mapping community int IDs to readable names.
4. Regenerate companions using graphify Python API: build_from_json, score_all, generate, to_json.
5. Write .graphify_labels.json with curated names.
6. Re-export graph.json with community_name fields updated.
7. Regenerate HTML: `graphify export html`.

**Success criteria:** .graphify_labels.json contains non-placeholder names for 30 largest
communities; graph.html is non-empty (> 10KB).

---

## Task 6: Cross-Subject Connectivity Analysis

**Objective:** Identify evidence-backed cross-subject connections using only graph data.

Implementation steps:
1. Load merged graph.json with networkx.
2. For each node, determine subject membership from node ID prefix.
3. Find nodes appearing in multiple subjects (shared entities).
4. Find edges where source and target have different subject prefixes (direct cross-subject edges).
5. Examine commerce path: cart-checkout → payments → orders → inventory → fulfillment-shipping.
6. Identify top shared hub nodes (highest degree nodes bridging subjects).
7. Write CROSS_SUBJECT_CONNECTIONS.md with required format.

**Success criteria:** CROSS_SUBJECT_CONNECTIONS.md exists with ≥ 5 evidence-backed subject-pair
relationships including node IDs.

---

## Task 7: Five Structural Queries

**Objective:** Exercise the merged graph with 5 local structural queries.

Queries:
1. Connectivity: cart module to payment processing connection.
2. Shared hub: highest-degree node bridging 3+ subjects.
3. Dependency/path: OrderModuleService to PaymentModuleService shortest path.
4. Connected components: number and size distribution.
5. Relation evidence: cross-subject "calls"/"imports" edges count and 3 examples.

Note: Check whether `graphify query` is local/no-API first. If API-dependent, use Python networkx.

**Success criteria:** All 5 queries execute and return concrete answers (including "not connected"
when that is the real answer).

---

## Task 8: Generate Metadata Documents

**Objective:** Produce VALIDATION_REPORT.md, SUBJECT_COVERAGE.md, and MASTER_BUILD_MANIFEST.json.

### VALIDATION_REPORT.md sections:
- Pre-merge input validation (20/20 subjects, schema checks, SHA-256 hashes)
- Merge results (input raw sums, merged counts, deduplication, conflict ledger)
- Integrity diagnostic (diagnose multigraph output verbatim)
- Identity preservation (node count before and after clustering)
- Query results (all 5 queries from Task 7)
- Known limitations

### SUBJECT_COVERAGE.md sections:
- Per-subject table: Subject, Input Nodes, Input Edges, Input Communities, contribution notes
- Shared entity notes
- products-categories marked as "optional 20th — included"
- Provenance unknowns noted (subjects with "0 files" in corpus check)

### MASTER_BUILD_MANIFEST.json fields:
- tool_version, python_interpreter, build_timestamp, repository_root
- inputs array: {subject, path, sha256, nodes, edges, communities}
- products_categories_included: true
- identity_policy string
- merged_counts: {nodes, edges, communities, components}
- clustering_settings: {algorithm, seed, label_mode}
- output_files array with sha256 hashes
- commands_used array
- limitations array

**Success criteria:** All 3 files valid; MASTER_BUILD_MANIFEST.json parses as valid JSON with all
required keys; SUBJECT_COVERAGE.md has 20+ data rows.

---

## Task 9: Final Verification, Backup, and Publish

**Objective:** Rehash inputs, backup, atomically publish to graphify-out/master/.

Implementation steps:
1. Recompute SHA-256 of all 20 input graph.json files — compare to Task 1 hashes.
   If any hash differs: ABORT — "Input changed during run — do not publish mixed snapshot".
2. Parse all output JSON files in staging — confirm all valid JSON.
3. Check HTML is non-empty: wc -c $STAGING/graph.html — must be > 10,000 bytes.
4. Verify .graphify_labels.json community IDs all exist in graph.json node community attributes.
5. Back up prior master (none on first run — write sentinel file):
   ```bash
   BACKUP_DIR="graphify-backups/master-$(date +%Y%m%d-%H%M%S)-<uuid>"
   mkdir -p "$BACKUP_DIR"
   echo "initial-build-no-prior-master" > "$BACKUP_DIR/README.txt"
   ```
6. Create and populate graphify-out/master/ from staging.
7. Handle hidden files explicitly (cp .graphify_labels.json, .graphify_analysis.json).
8. Verify final output: ls -la graphify-out/master/ — confirm all 8 required files present.
9. Do NOT git-add any outputs.
10. Clean up: rm -rf $STAGING.

**Success criteria:** All 20 input hashes match pre-run values; all 8 output files present in
graphify-out/master/; no dangling temp directories.

---

## Key Risks and Mitigations

| Risk | Mitigation |
|---|---|
| cluster-only writes to nested graphify-out/graphify-out/ | Task 4 explicitly checks and flattens |
| graphify merge-graphs CLI flag syntax differs from docs | Task 2 checks --help first |
| graphify query requires API key | Task 7 checks --help; falls back to Python networkx BFS |
| Merged graph >5,000 nodes causes HTML aggregation mode | Expected and documented; check HTML is non-empty |
| Node ID collisions between subjects | Task 3 independent edge check catches this |
| caching-locking-events 448-community fragmentation | Noted in SUBJECT_COVERAGE.md; not a blocker |

---

## Background Notes

- Node IDs follow pattern `<repo-slug>::<local_id>` — subjects used different repo slug prefixes
  during extraction, so most nodes are subject-unique; genuine cross-subject shared entities only
  exist where identical IDs appear in multiple graphs.
- All graphs are undirected (directed: false) and non-multigraph (multigraph: false) — consistent
  across all 20 subjects.
- graphify-out/.graphify_python points to the uv tools interpreter:
  /home/soroush110/.local/share/uv/tools/graphifyy/bin/python
- No existing master directory — clean slate build.
- graphify-backups/ does not yet exist — must be created in Task 1.
