# Per-subject graph build — prompt + manifests

Validated on `products-categories` (12 layers → 1,574 nodes / 3,826 edges / 116 communities),
built code-only with local AST (zero tokens, no API key).

Start a **new session per subject**, paste the BASE PROMPT, then fill `{{NAME}}`, `{{SLUG}}`,
and the manifest lines for that subject.

---

## BASE PROMPT (copy this first)

```
Use the graphify skill (skill id: graphify) and follow its instructions. Build ONE per-subject,
code-only graph and stop.

Repo: /home/soroush/00-VP-Projects/03-medusa/medusa
Subject: {{NAME}}
Slug: {{SLUG}}

Reference output shape/quality: graphify-out/products-categories/
(graph.json + GRAPH_REPORT.md + graph.html + .graphify_labels.json + .graphify_analysis.json)

MANIFEST — only these paths; skip any that do not exist:
{{MANIFEST}}

Recipe (validated on products-categories):
1. Read the graphify skill first.
2. Extract each manifest path in parallel, AST only:
   graphify extract "<path>" --code-only --out /tmp/opencode/graphify-{{SLUG}}/<layer>
   (--code-only = local AST, no API key, zero tokens. Never ask for a key.)
3. Merge:
   mkdir -p graphify-out/{{SLUG}}
   graphify merge-graphs /tmp/opencode/graphify-{{SLUG}}/*/graphify-out/graph.json \
     --out graphify-out/{{SLUG}}/graph.json
4. Cluster:
   graphify cluster-only graphify-out/{{SLUG}} --graph graphify-out/{{SLUG}}/graph.json --no-label
   mv graphify-out/{{SLUG}}/graphify-out/* graphify-out/{{SLUG}}/ &&
     rmdir graphify-out/{{SLUG}}/graphify-out
5. Curate community labels (2-5 plain words). Load graph.json with
   networkx.node_link_graph(edges='links', nodes='nodes'), group nodes by node['community'],
   call graphify.cluster.label_communities_by_hub as the base, then override the largest
   ~30 communities with readable names inferred from their node labels.
   Regenerate with graphify.report.generate(...), graphify.export.to_json(..., community_labels=labels),
   graphify.exporters.html.to_html(..., community_labels=labels). Write .graphify_labels.json
   and .graphify_analysis.json next to graph.json.
6. Verify integrity:
   graphify diagnose multigraph --graph graphify-out/{{SLUG}}/graph.json
   Expect 0 dangling / 0 missing / 0 collapsed edges. Then run one sample:
   graphify query "<a real question about this domain>" --graph graphify-out/{{SLUG}}/graph.json
7. Clean up /tmp/opencode/graphify-{{SLUG}}/.

Rules:
- Never scan the whole repo; only manifest paths.
- Never modify source files.
- Never touch graphify-out/products-categories/.
- Do not git-add graphify-out/.
- Final message: node/edge/community counts, integrity result, output files, and paste the
  God Nodes / Surprising Connections / Suggested Questions sections.
```

---

## MANIFESTS

### cart-checkout — `cart-checkout`
```
packages/modules/cart
packages/core/core-flows/src/cart
packages/core/core-flows/src/line-item
packages/core/types/src/cart
packages/medusa/src/api/store/carts
```

### orders — `orders`
```
packages/modules/order
packages/core/core-flows/src/order
packages/core/core-flows/src/draft-order
packages/core/core-flows/src/return-reason
packages/core/types/src/order
packages/medusa/src/api/admin/orders
packages/medusa/src/api/admin/draft-orders
packages/medusa/src/api/admin/returns
packages/medusa/src/api/admin/claims
packages/medusa/src/api/admin/exchanges
packages/medusa/src/api/admin/order-changes
packages/medusa/src/api/admin/order-edits
packages/medusa/src/api/admin/refund-reasons
packages/medusa/src/api/admin/return-reasons
packages/medusa/src/api/store/orders
packages/medusa/src/api/store/returns
packages/medusa/src/api/store/return-reasons
```

### pricing — `pricing`
```
packages/modules/pricing
packages/modules/currency
packages/core/core-flows/src/pricing
packages/core/core-flows/src/price-list
packages/core/types/src/pricing
packages/core/types/src/currency
packages/medusa/src/api/admin/price-lists
packages/medusa/src/api/admin/price-preferences
packages/medusa/src/api/admin/currencies
packages/medusa/src/api/store/currencies
```

### inventory — `inventory`
```
packages/modules/inventory
packages/modules/stock-location
packages/core/core-flows/src/inventory
packages/core/core-flows/src/reservation
packages/core/core-flows/src/stock-location
packages/core/types/src/inventory
packages/core/types/src/stock-location
packages/medusa/src/api/admin/inventory-items
packages/medusa/src/api/admin/reservations
packages/medusa/src/api/admin/stock-locations
```

### customers — `customers`
```
packages/modules/customer
packages/core/core-flows/src/customer
packages/core/core-flows/src/customer-group
packages/core/types/src/customer
packages/medusa/src/api/admin/customers
packages/medusa/src/api/admin/customer-groups
packages/medusa/src/api/store/customers
```

### promotions — `promotions`
```
packages/modules/promotion
packages/core/core-flows/src/promotion
packages/core/types/src/promotion
packages/medusa/src/api/admin/promotions
packages/medusa/src/api/admin/campaigns
```

### payments — `payments`
```
packages/modules/payment
packages/core/core-flows/src/payment
packages/core/core-flows/src/payment-collection
packages/core/types/src/payment
packages/medusa/src/api/admin/payments
packages/medusa/src/api/admin/payment-collections
packages/medusa/src/api/store/payment-collections
packages/medusa/src/api/store/payment-providers
packages/medusa/src/modules/payment.ts
packages/medusa/src/modules/payment-stripe.ts
```

### fulfillment-shipping — `fulfillment-shipping`
```
packages/modules/fulfillment
packages/core/core-flows/src/fulfillment
packages/core/core-flows/src/shipping-options
packages/core/core-flows/src/shipping-profile
packages/core/types/src/fulfillment
packages/medusa/src/api/admin/fulfillments
packages/medusa/src/api/admin/fulfillment-sets
packages/medusa/src/api/admin/fulfillment-providers
packages/medusa/src/api/admin/shipping-options
packages/medusa/src/api/admin/shipping-option-types
packages/medusa/src/api/admin/shipping-profiles
packages/medusa/src/api/store/shipping-options
packages/medusa/src/modules/fulfillment.ts
packages/medusa/src/modules/fulfillment-manual.ts
```

### auth-users — `auth-users`
```
packages/modules/auth
packages/modules/user
packages/modules/rbac
packages/modules/api-key
packages/core/core-flows/src/auth
packages/core/core-flows/src/user
packages/core/core-flows/src/invite
packages/core/core-flows/src/rbac
packages/core/core-flows/src/api-key
packages/core/types/src/auth
packages/core/types/src/user
packages/core/types/src/rbac
packages/core/types/src/api-key
packages/medusa/src/api/admin/users
packages/medusa/src/api/admin/invites
packages/medusa/src/api/admin/rbac
packages/medusa/src/api/admin/api-keys
packages/medusa/src/api/auth
```

### tax — `tax`
```
packages/modules/tax
packages/core/core-flows/src/tax
packages/core/types/src/tax
packages/medusa/src/api/admin/tax-providers
packages/medusa/src/api/admin/tax-rates
packages/medusa/src/api/admin/tax-regions
```

### regions-sales-channels — `regions-sales-channels`
```
packages/modules/region
packages/modules/sales-channel
packages/modules/currency
packages/modules/store
packages/core/core-flows/src/region
packages/core/core-flows/src/sales-channel
packages/core/core-flows/src/store
packages/core/types/src/region
packages/core/types/src/sales-channel
packages/core/types/src/store
packages/core/types/src/currency
packages/medusa/src/api/admin/regions
packages/medusa/src/api/admin/sales-channels
packages/medusa/src/api/admin/stores
packages/medusa/src/api/store/regions
```

### notifications — `notifications`
```
packages/modules/notification
packages/core/core-flows/src/notification
packages/core/types/src/notification
packages/medusa/src/api/admin/notifications
packages/medusa/src/modules/notification.ts
packages/medusa/src/modules/notification-local.ts
packages/medusa/src/modules/notification-sendgrid.ts
packages/medusa/src/subscribers/configurable-notifications.ts
```

### search — `search`
```
packages/modules/search
packages/core/core-flows/src/search
packages/core/types/src/search
packages/medusa/src/api/admin/search
packages/medusa/src/api/admin/search-indexes
packages/medusa/src/api/store/search
packages/medusa/src/modules/index-module.ts
packages/medusa/src/subscribers/search-ingestion.ts
```

### files-uploads — `files-uploads`
```
packages/modules/file
packages/core/types/src/file
packages/core/types/src/file-service
packages/medusa/src/api/admin/uploads
packages/medusa/src/modules/file.ts
packages/medusa/src/modules/file-local.ts
packages/medusa/src/modules/file-s3.ts
```

### workflow-engine — `workflow-engine`
```
packages/modules/workflow-engine-inmemory
packages/modules/workflow-engine-redis
packages/core/workflows-sdk
packages/core/orchestration
packages/core/types/src/workflow
packages/medusa/src/api/admin/workflows-executions
```

### analytics — `analytics`
```
packages/modules/analytics
packages/core/types/src/analytics
packages/medusa/src/modules/analytics.ts
packages/medusa/src/modules/analytics-local.ts
packages/medusa/src/modules/analytics-posthog.ts
```

### translation-settings — `translation-settings`
```
packages/modules/translation
packages/modules/settings
packages/core/core-flows/src/translation
packages/core/core-flows/src/settings
packages/core/types/src/translation
packages/core/types/src/settings
packages/medusa/src/api/admin/translations
packages/medusa/src/api/admin/locales
```

### caching-locking-events — `caching-locking-events`
```
packages/modules/caching
packages/modules/cache-inmemory
packages/modules/cache-redis
packages/modules/locking
packages/modules/event-bus-local
packages/modules/event-bus-redis
packages/core/types/src/caching
packages/core/types/src/cache
packages/core/types/src/locking
packages/core/types/src/event-bus
packages/medusa/src/modules/cache-inmemory.ts
packages/medusa/src/modules/cache-redis.ts
packages/medusa/src/modules/caching.ts
packages/medusa/src/modules/caching-redis.ts
packages/medusa/src/modules/locking.ts
packages/medusa/src/modules/locking-postgres.ts
packages/medusa/src/modules/locking-redis.ts
packages/medusa/src/modules/event-bus-local.ts
packages/medusa/src/modules/event-bus-redis.ts
```

### link-modules — `link-modules`
```
packages/modules/link-modules
packages/core/types/src/link-modules
packages/core/types/src/joiner
packages/core/types/src/dml
packages/core/modules-sdk
```

---

## Notes
- `products-categories` is already built; do not rebuild it.
- Admin UI (`packages/admin/dashboard/src/routes/<subject>`) is intentionally excluded — add it
  only if you want a front-end-inclusive graph (much larger; use `--code-only` still).
- Cross-subject edges (e.g. product → pricing/inventory) are lost in a split graph; merge the
  per-subject graph.json files later with `graphify merge-graphs` if you want a master graph.
