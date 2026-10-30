# Graphify Usage Guide — Medusa Project

This guide documents exactly how graphify was used in this project: how subjects were extracted,
how the master was built, and how to query, update, and extend the graphs.

---

## What Is Graphify?

Graphify turns source code into a persistent knowledge graph. It runs AST extraction on code
files (zero tokens, no API key needed for code-only corpora), clusters the results into
communities using Louvain, and produces:

- `graph.json` — the raw graph (nodes, edges, community assignments)
- `graph.html` — an interactive visualization
- `GRAPH_REPORT.md` — a plain-language audit report
- `.graphify_labels.json` — community labels
- `.graphify_analysis.json` — community membership and cohesion scores

**Installed version:** 0.9.85  
**Python interpreter:** `/home/soroush110/.local/share/uv/tools/graphifyy/bin/python`  
**Binary:** `/home/soroush110/.local/bin/graphify`

---

## Project Graph Structure

This project uses a **two-tier graph architecture**:

```
graphify-out/
  <subject>/        ← one graph per domain subject (20 subjects)
    graph.json
    GRAPH_REPORT.md
    graph.html
    .graphify_labels.json
    .graphify_analysis.json
  master/           ← merged graph across all 20 subjects
    graph.json
    GRAPH_REPORT.md
    graph.html
    .graphify_labels.json
    .graphify_analysis.json
    MASTER_BUILD_MANIFEST.json
    SUBJECT_COVERAGE.md
    CROSS_SUBJECT_CONNECTIONS.md
    VALIDATION_REPORT.md
    MASTER_GRAPH_REPORT.md
```

### The 20 subjects

| Subject slug | Domain |
|---|---|
| cart-checkout | Cart and checkout flows |
| orders | Order management, returns, claims, exchanges |
| pricing | Pricing rules, price lists, currencies |
| inventory | Inventory items, reservations, stock locations |
| customers | Customer accounts and groups |
| promotions | Promotions and campaigns |
| payments | Payment processing and collections |
| fulfillment-shipping | Fulfillment, shipping options and profiles |
| auth-users | Authentication, users, RBAC, API keys |
| tax | Tax regions, rates, and providers |
| regions-sales-channels | Regions, sales channels, stores |
| notifications | Notification module and providers |
| search | Search module and indexing |
| files-uploads | File storage and uploads |
| workflow-engine | Workflows SDK, orchestration, execution |
| analytics | Analytics module and providers |
| translation-settings | Translations and settings |
| caching-locking-events | Cache, lock, and event-bus modules |
| link-modules | Link modules, DML, joiner types |
| products-categories | Products, variants, categories, collections |

---

## How to Query the Master Graph

### CLI query (no API key required — local BFS traversal)

```bash
cd /home/soroush/00-VP-Projects/03-medusa/medusa

# Ask a question about the codebase
graphify query "How does cart completion connect to payment processing?" \
  --graph graphify-out/master/graph.json

# DFS for a specific path
graphify query "What calls OrderModuleService?" \
  --graph graphify-out/master/graph.json --dfs

# Find shortest path between two concepts
graphify path "CompleteCartWorkflowInput" "CapturePaymentWorkflowInput" \
  --graph graphify-out/master/graph.json

# Explain a specific node
graphify explain "IOrderModuleService" \
  --graph graphify-out/master/graph.json
```

### Python API query (networkx — always local, always free)

```python
import json
import networkx as nx
from pathlib import Path

GRAPH = Path("graphify-out/master/graph.json")
data = json.loads(GRAPH.read_text(encoding="utf-8"))
G = nx.node_link_graph(data, edges="links", nodes="nodes")

# Find all neighbors of a node
node = "graphify-out-2::05::service_iordermoduleservice"  # IOrderModuleService
print(list(G.neighbors(node)))

# Shortest path between two nodes
src = "graphify-out::layer2::workflows_complete_cart_completecartworkflowinput"
tgt = "graphify-out-7::layer-2::workflows_capture_payment_capturepaymentworkflowinput"
path = nx.shortest_path(G, src, tgt)
print(path)

# Find highest-degree nodes
top = sorted(G.degree(), key=lambda x: x[1], reverse=True)[:10]
for nid, deg in top:
    print(deg, data["nodes"][0]["label"])  # fetch label from node_meta

# Filter nodes by subject
# Subjects map to repo tags: graphify-out=cart-checkout, graphify-out-2=orders, etc.
order_nodes = [n for n in data["nodes"] if n.get("repo") == "graphify-out-2"]

# Find all nodes in a community
community_id = 636  # Payment Capture Cart Workflows
members = [n for n in data["nodes"] if n.get("community") == community_id]
```

### Query a per-subject graph

```bash
# Query within a single subject
graphify query "What does CartModuleService do?" \
  --graph graphify-out/cart-checkout/graph.json

graphify query "How are order changes validated?" \
  --graph graphify-out/orders/graph.json
```

---

## How Subject Graphs Were Built

Each subject was built in a separate session using the recipe from `graphify-out/SUBJECT_MANIFESTS.md`.

### Pattern (using orders as an example)

```bash
# Step 1 — Extract each manifest path
SLUG="orders"
for path in \
  "packages/modules/order" \
  "packages/core/core-flows/src/order" \
  "packages/core/types/src/order" \
  "packages/medusa/src/api/admin/orders"; do
  graphify extract "$path" --code-only \
    --out /tmp/graphify-${SLUG}/$(echo $path | tr '/' '_')
done

# Step 2 — Merge extracted layers
mkdir -p graphify-out/${SLUG}
graphify merge-graphs /tmp/graphify-${SLUG}/*/graphify-out/graph.json \
  --out graphify-out/${SLUG}/graph.json

# Step 3 — Cluster
graphify cluster-only graphify-out/${SLUG} \
  --graph graphify-out/${SLUG}/graph.json \
  --no-label

# Flatten nested output if it appeared
if [ -d "graphify-out/${SLUG}/graphify-out" ]; then
  mv graphify-out/${SLUG}/graphify-out/* graphify-out/${SLUG}/
  rmdir graphify-out/${SLUG}/graphify-out
fi

# Step 4 — Curate labels and regenerate (Python API)
$(cat graphify-out/.graphify_python) -c "
from graphify.build import build_from_json
from graphify.cluster import score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from graphify.export import to_json
import json
from pathlib import Path

data = json.loads(Path('graphify-out/${SLUG}/graph.json').read_text())
analysis = json.loads(Path('graphify-out/${SLUG}/.graphify_analysis.json').read_text())
G = build_from_json(data, root='.', directed=False)
communities = {int(k): v for k, v in analysis['communities'].items()}
cohesion = {int(k): v for k, v in analysis['cohesion'].items()}
labels = {0: 'My Label', 1: 'Another Label'}  # curate these
# ... regenerate report, labels, html
"

# Step 5 — Integrity check
graphify diagnose multigraph --graph graphify-out/${SLUG}/graph.json

# Step 6 — Clean up temp
rm -rf /tmp/graphify-${SLUG}
```

**Key flags:**
- `--code-only` — AST extraction only, no LLM, zero tokens
- `--no-label` in `cluster-only` — skips auto-labeling; you provide labels manually
- `directed=False` — all subject graphs are undirected

---

## How to Build the Master Graph

Run this after all 20 subject graphs exist and are valid.

```bash
cd /home/soroush/00-VP-Projects/03-medusa/medusa

# 1. Create a safe staging directory
STAGING=$(mktemp -d)

# 2. Merge all 20 subjects
graphify merge-graphs \
  graphify-out/cart-checkout/graph.json \
  graphify-out/orders/graph.json \
  graphify-out/pricing/graph.json \
  graphify-out/inventory/graph.json \
  graphify-out/customers/graph.json \
  graphify-out/promotions/graph.json \
  graphify-out/payments/graph.json \
  graphify-out/fulfillment-shipping/graph.json \
  graphify-out/auth-users/graph.json \
  graphify-out/tax/graph.json \
  graphify-out/regions-sales-channels/graph.json \
  graphify-out/notifications/graph.json \
  graphify-out/search/graph.json \
  graphify-out/files-uploads/graph.json \
  graphify-out/workflow-engine/graph.json \
  graphify-out/analytics/graph.json \
  graphify-out/translation-settings/graph.json \
  graphify-out/caching-locking-events/graph.json \
  graphify-out/link-modules/graph.json \
  graphify-out/products-categories/graph.json \
  --out $STAGING/graph.json

# 3. Run integrity diagnostic
graphify diagnose multigraph --graph $STAGING/graph.json
# Expected: 0 dangling / 0 missing / 0 collapsed

# 4. Recluster (subject community IDs must be discarded)
graphify cluster-only $STAGING \
  --graph $STAGING/graph.json \
  --no-label

# Flatten nested output
if [ -d "$STAGING/graphify-out" ]; then
  mv $STAGING/graphify-out/* $STAGING/
  rmdir $STAGING/graphify-out
fi

# 5. Curate labels (Python API — see graphify-out/MASTER_BUILD_PLAN.md for full script)
# ... label the top 30-40 communities from .graphify_analysis.json

# 6. Regenerate HTML
graphify export html \
  --graph $STAGING/graph.json \
  --out $STAGING/graph.html
# Note: >5000 nodes → auto-aggregated to community view (expected)

# 7. Publish
mkdir -p graphify-out/master
cp -r $STAGING/. graphify-out/master/
cp $STAGING/.graphify_labels.json graphify-out/master/.graphify_labels.json
cp $STAGING/.graphify_analysis.json graphify-out/master/.graphify_analysis.json

# 8. Clean up
rm -rf $STAGING
```

---

## How to Rebuild a Single Subject

When source files in a subject's manifest change:

```bash
SLUG="orders"  # replace with the subject to rebuild

# Run the subject build prompt from graphify-out/SUBJECT_MANIFESTS.md
# with the appropriate SLUG and MANIFEST filled in.
# Never rebuild directly into graphify-out/$SLUG/ — use a staging dir
# and only replace after verification.

# After rebuilding, rebuild the master too (see above).
```

---

## How to Check Subject Graphs Are Valid

```bash
cd /home/soroush/00-VP-Projects/03-medusa/medusa

# Quick parse check for all subjects
for slug in cart-checkout orders pricing inventory customers promotions payments \
  fulfillment-shipping auth-users tax regions-sales-channels notifications search \
  files-uploads workflow-engine analytics translation-settings caching-locking-events \
  link-modules products-categories; do
  python3 -c "
import json, sys
try:
    d = json.load(open('graphify-out/$slug/graph.json'))
    n = len(d.get('nodes', []))
    e = len(d.get('links', d.get('edges', [])))
    v = d.get('graph', {}).get('graphify_version', '?')
    print(f'  ✅ $slug  nodes={n}  edges={e}  v={v}')
except Exception as ex:
    print(f'  ❌ $slug  ERROR: {ex}')
  "
done
```

---

## Repo Tag → Subject Mapping

When `graphify merge-graphs` merges inputs from the same parent directory, it assigns sequential
collision-free repo tags. After a master build, node IDs follow this mapping:

| Repo tag | Subject |
|---|---|
| `graphify-out` | cart-checkout |
| `graphify-out-2` | orders |
| `graphify-out-3` | pricing |
| `graphify-out-4` | inventory |
| `graphify-out-5` | customers |
| `graphify-out-6` | promotions |
| `graphify-out-7` | payments |
| `graphify-out-8` | fulfillment-shipping |
| `graphify-out-9` | auth-users |
| `graphify-out-10` | tax |
| `graphify-out-11` | regions-sales-channels |
| `graphify-out-12` | notifications |
| `graphify-out-13` | search |
| `graphify-out-14` | files-uploads |
| `graphify-out-15` | workflow-engine |
| `graphify-out-16` | analytics |
| `graphify-out-17` | translation-settings |
| `graphify-out-18` | caching-locking-events |
| `graphify-out-19` | link-modules |
| `graphify-out-20` | products-categories |

Nodes without a `repo` attribute (`repo` field absent) are external shared nodes — typically
`@medusajs/framework` dist barrel imports. In the master graph there are 2,389 such nodes;
they are the primary integration layer between subjects.

---

## Python API Cheat Sheet

All operations use:
```bash
PYTHON=$(cat graphify-out/.graphify_python)
# = /home/soroush110/.local/share/uv/tools/graphifyy/bin/python
```

### Build a graph from JSON

```python
from graphify.build import build_from_json
import json
from pathlib import Path

data = json.loads(Path("graphify-out/master/graph.json").read_text(encoding="utf-8"))
G = build_from_json(data, root=".", directed=False)
# G is a networkx Graph (undirected)
```

### Cluster-only recluster

```python
from graphify.cluster import cluster, score_all
communities = cluster(G)          # {community_id: [node_id, ...]}
cohesion    = score_all(G, communities)  # {community_id: float}
```

### Generate report

```python
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate

gods      = god_nodes(G)
surprises = surprising_connections(G, communities)
labels    = {0: "My Label", 1: "Another Label"}   # your curated labels
questions = suggest_questions(G, communities, labels)
detection = {"total_files": 0, "total_words": 0, "files": {}}
tokens    = {"input": 0, "output": 0}

report = generate(G, communities, cohesion, labels, gods, surprises,
                  detection, tokens, ".", suggested_questions=questions)
Path("GRAPH_REPORT.md").write_text(report, encoding="utf-8")
```

### Export graph.json with community_name in nodes

```python
from graphify.export import to_json

wrote = to_json(G, communities, "graph.json", community_labels=labels)
# Returns False if the new graph would be smaller than the existing one (shrink guard)
```

### Export HTML

```bash
graphify export html --graph graphify-out/master/graph.json
# Aggregates to community view when >5000 nodes
```

### Integrity diagnostic

```bash
graphify diagnose multigraph --graph graphify-out/master/graph.json
# Expect: 0 dangling / 0 missing / 0 collapsed
```

### Hub-based auto-labels

```python
from graphify.cluster import label_communities_by_hub
auto_labels = label_communities_by_hub(data)
# Returns {community_id: "Hub Node Name"} — use as baseline, override manually
```

---

## Common Pitfalls

| Problem | Cause | Fix |
|---|---|---|
| `cluster-only` output ends up in `$DIR/graphify-out/` instead of `$DIR/` | cluster-only writes to a nested dir | `mv $DIR/graphify-out/* $DIR/ && rmdir $DIR/graphify-out` |
| `.graphify_labels.json` not created by `--no-label` | `--no-label` skips label file creation | Generate it manually via `label_communities_by_hub` + Python write |
| Merged node count < expected due to aggressive deduplication | Shared external import nodes merged | Expected — `@medusajs/framework` dist nodes appear in many subjects |
| `graphify merge-graphs` assigns `graphify-out`, `graphify-out-2` tags (not subject names) | All subject dirs are named `graphify-out` | Use the repo-tag→subject mapping table above to decode node IDs |
| `to_json` returns `False` and doesn't write | Shrink guard: new graph is smaller than existing | Pass `--force` or delete the existing `graph.json` first if the shrink is intentional |
| `graphify query` fails or requires API key | Some query modes use LLM backends | Use Python networkx directly (always free, always local) |
| 182 link-modules nodes have temp IDs | link-modules was extracted to a temp dir | Rebuild the link-modules subject with a stable `--out` path |

---

## File Reference

| File | Purpose |
|---|---|
| `graphify-out/.graphify_python` | Path to the correct Python interpreter (read before every Python invocation) |
| `graphify-out/.graphify_root` | The repository root path used during extraction |
| `graphify-out/SUBJECT_MANIFESTS.md` | Base prompt and per-subject manifests for building each subject graph |
| `graphify-out/MASTER_BUILD_PLAN.md` | Step-by-step plan used to build the master graph |
| `graphify-out/master/MASTER_BUILD_MANIFEST.json` | Machine-readable build record: all hashes, counts, commands, limitations |
| `graphify-out/master/SUBJECT_COVERAGE.md` | Per-subject contribution counts and provenance notes |
| `graphify-out/master/CROSS_SUBJECT_CONNECTIONS.md` | Evidence-backed cross-subject relationships |
| `graphify-out/master/VALIDATION_REPORT.md` | All integrity checks and query results |
| `graphify-out/master/MASTER_GRAPH_REPORT.md` | Human-readable master graph summary (this build's final report) |
| `graphify-backups/` | Dated backups of prior master builds |
