# Graph Report - medusa  (2026-10-30)

## Corpus Check
- 269 files · ~89,443 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 719 nodes · 1583 edges · 30 communities (25 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ea78969d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Search Query Planning
- Index Seeding and Reindexing
- Medusa Search Client
- Search Module Models and Specs
- Search Package Manifest
- Search Module Service
- MultiQuery Response Parsing
- Search Provider Registration
- Search Facet Aggregations
- Search Index Migration Tests
- Search Module Migrations
- Search Index Plan Builder
- Search Ingestion Subscriber
- Search Provider Options
- Search Joiner Configuration
- Search TSConfig Paths
- Index Module Registration
- Search Jest Configuration
- Reindex and Delete Workflows
- Search Module Service Contract
- Search Provider Contract
- Search Filters and Operators
- Search Index Definitions
- Search Query Results
- Search Field Kind Enums
- Admin Fallback Search Routes
- Admin Search Route Middlewares
- Store Search Route Middlewares
- Store Search Product Filtering

## God Nodes (most connected - your core abstractions)
1. `SearchModuleService` - 27 edges
2. `MedusaSearchService` - 23 edges
3. `reindexOne()` - 21 edges
4. `buildQueryPlan()` - 15 edges
5. `runSeed()` - 14 edges
6. `retrieveIndexDefinition()` - 14 edges
7. `ISearchModuleService` - 13 edges
8. `SearchTask` - 12 edges
9. `ActiveIndexVersionCache` - 12 edges
10. `SearchIndexState` - 12 edges

## Surprising Connections (you probably didn't know these)
- `deleteSearchIndexStep` --calls--> `deleteSearchIndexWorkflow`  [EXTRACTED]
  steps/delete-search-index.ts → workflows/delete-search-index.ts
- `reindexSearchIndexesStep` --calls--> `reindexSearchIndexesWorkflow`  [EXTRACTED]
  steps/reindex-search-indexes.ts → workflows/reindex-search-indexes.ts
- `validateSearchIndexesExistStep` --calls--> `deleteSearchIndexWorkflow`  [EXTRACTED]
  steps/validate-search-indexes-exist.ts → workflows/delete-search-index.ts
- `validateSearchIndexesExistStep` --calls--> `reindexSearchIndexesWorkflow`  [EXTRACTED]
  steps/validate-search-indexes-exist.ts → workflows/reindex-search-indexes.ts
- `MedusaSearchService` --calls--> `createService()`  [EXTRACTED]
  src/providers/search-medusa/services/medusa-search.ts → src/providers/search-medusa/services/__tests__/medusa-search.spec.ts

## Import Cycles
- None detected.

## Communities (30 total, 5 thin omitted)

### Community 0 - "Search Query Planning"
Cohesion: 0.11
Nodes (36): AttributeSchemaConfig, AttributeType, ComputeAttributes, Filter, FullTextSearchConfig, FuzzyEditDistanceThreshold, FuzzyFilterOptions, HighlightExpression (+28 more)

### Community 1 - "Index Seeding and Reindexing"
Cohesion: 0.07
Nodes (43): SearchIndexSeedAction, SearchIndexSyncRecord, DEFAULT_REINDEX_BATCH_SIZE, SearchSyncStatus, CANCELED, DONE, FAILED, PENDING (+35 more)

### Community 2 - "Medusa Search Client"
Cohesion: 0.07
Nodes (22): MedusaSearchService, createService(), definition, AttributeSchema, IndexCreateParams, IndexMetadata, IndexMultiQueryParams, IndexSummary (+14 more)

### Community 3 - "Search Module Models and Specs"
Cohesion: 0.09
Nodes (19): baseProducts, consumedContainers, consumedEvents, dataset, productIndex, removeProduct(), resetDataset(), setOnBulkSeedStart() (+11 more)

### Community 4 - "Search Package Manifest"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 5 - "Search Module Service"
Cohesion: 0.06
Nodes (43): InjectedDependencies, resolveLocking(), SearchModuleService, SearchEventRoutes, SearchIndexContext, SearchIndexes, SearchModuleOptions, ActiveIndexVersion (+35 more)

### Community 6 - "MultiQuery Response Parsing"
Cohesion: 0.09
Nodes (9): BuiltMultiQuery, InjectedDependencies, IndexMultiQueryResponse, IndexQueryResult, fromSearchDocument(), parseHighlights(), QueryPlan, tagFragment() (+1 more)

### Community 7 - "Search Provider Registration"
Cohesion: 0.10
Nodes (6): registrationFn(), hasMedusaSearchCredentials(), InjectedDependencies, SearchProviderService, SearchProviderIdentifiersRegistrationName, SearchProviderRegistrationPrefix

### Community 8 - "Search Facet Aggregations"
Cohesion: 0.15
Nodes (23): AggregationGroup, aggregationGroupValue(), assertStatsField(), buildFacetQueries(), emptyStatsResult(), FacetQuery, fail(), parseFacetResults() (+15 more)

### Community 9 - "Search Index Migration Tests"
Cohesion: 0.07
Nodes (29): productIndex, products, SearchService, @medusajs/types, ModuleOptions, SearchIndexRecord, SearchIndexRegistry, SearchIndexSeedReason (+21 more)

### Community 10 - "Search Module Migrations"
Cohesion: 0.16
Nodes (3): Migration20260805085626, Migration20260903085616, Migration20260911115931

### Community 11 - "Search Index Plan Builder"
Cohesion: 0.20
Nodes (15): assertIndexSupported(), assertTypoToleranceSupported(), buildIndexPlan(), coerce(), coerceVector(), DEFAULT_MIN_WORD_SIZE_FOR_ONE_TYPO, DEFAULT_MIN_WORD_SIZE_FOR_TWO_TYPOS, fail() (+7 more)

### Community 13 - "Search Provider Options"
Cohesion: 0.33
Nodes (6): DistanceMetric, FullTextSearch, MedusaSearchFieldOptions, MedusaSearchIndexOptions, MedusaSearchProviderOptions, MedusaSearchQueryOptions

### Community 15 - "Search TSConfig Paths"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models, @repositories, @services, @types (+1 more)

### Community 18 - "Reindex and Delete Workflows"
Cohesion: 0.12
Nodes (15): deleteSearchIndexStep, deleteSearchIndexStepId, DeleteSearchIndexStepInput, reindexSearchIndexesStep, reindexSearchIndexesStepId, ReindexSearchIndexesStepInput, validateSearchIndexesExistStep, validateSearchIndexesExistStepId (+7 more)

### Community 24 - "Search Module Service Contract"
Cohesion: 0.13
Nodes (7): SearchIndexDetails, SearchIndexMigrationAction, ISearchModuleService, SearchIndexDeleteResult, SearchReindexInput, SearchReindexResult, SearchReindexStrategy

### Community 25 - "Search Provider Contract"
Cohesion: 0.21
Nodes (7): SearchDocument, SearchIndexInfo, SearchTask, SearchTaskStatus, ResolvedSearchIndexDefinition, ISearchProvider, ProviderSearchQuery

### Community 26 - "Search Filters and Operators"
Cohesion: 0.11
Nodes (14): SearchFilterOperator, SearchFilters, SearchFilterValue, SearchOperatorMap, SearchDeleteDocumentsInput, SEARCH_SCORE_KEY, SearchCountStrategy, SearchFacetRequest (+6 more)

### Community 27 - "Search Index Definitions"
Cohesion: 0.10
Nodes (18): SearchFieldDefinition, SearchContainer, SearchIndexDefinition, SearchIndexSettings, SearchIngestionContext, SearchMutation, SearchSeedContext, InferSearchDocumentType (+10 more)

### Community 28 - "Search Query Results"
Cohesion: 0.22
Nodes (5): SearchQuery, SearchFacetResult, SearchHit, SearchResult, SearchResultMetadata

### Community 30 - "Search Field Kind Enums"
Cohesion: 0.43
Nodes (4): SearchFacetKind, SearchFieldKind, SearchIndexFieldInfo, SearchIndexStatus

### Community 35 - "Admin Fallback Search Routes"
Cohesion: 0.19
Nodes (8): FallbackSearchInput, searchWithGraphFallback(), GET(), searchIndexedEntities(), ADMIN_SEARCH_ENTITIES, ADMIN_SEARCH_ENTITY_MAP, AdminSearchEntityConfig, DEFAULT_ADMIN_SEARCH_ENTITY_NAMES

### Community 36 - "Admin Search Route Middlewares"
Cohesion: 0.17
Nodes (6): adminSearchRoutesMiddlewares, AdminGetSearchParams, AdminGetSearchParamsType, adminSearchIndexRoutesMiddlewares, AdminReindexSearchIndex, AdminReindexSearchIndexType

### Community 43 - "Store Search Route Middlewares"
Cohesion: 0.15
Nodes (10): storeSearchRoutesMiddlewares, StoreSearch, StoreSearchFacet, StoreSearchFilters, StoreSearchFilterValue, StoreSearchHighlight, StoreSearchOperatorMap, StoreSearchOptions (+2 more)

### Community 45 - "Store Search Product Filtering"
Cohesion: 0.24
Nodes (5): buildProductFilters(), mergeSearchFilters(), notFound(), POST(), unscopedProductIndexes

## Knowledge Gaps
- **12 isolated node(s):** `CANCELED`, `DONE`, `FAILED`, `PENDING`, `PROCESSING` (+7 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 248 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MedusaSearchService` connect `Medusa Search Client` to `MultiQuery Response Parsing`, `Search Provider Registration`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CANCELED`, `DONE`, `FAILED` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Search Query Planning` be split into smaller, more focused modules?**
  _Cohesion score 0.10668563300142248 - nodes in this community are weakly interconnected._
- **Why does `SearchModuleService` connect `Search Module Service` to `Index Seeding and Reindexing`, `Search Index Migration Tests`, `Search Provider Registration`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Index Seeding and Reindexing` be split into smaller, more focused modules?**
  _Cohesion score 0.07272727272727272 - nodes in this community are weakly interconnected._
- **Why does `SearchProviderService` connect `Search Provider Registration` to `Search Module Service`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Should `Medusa Search Client` be split into smaller, more focused modules?**
  _Cohesion score 0.07138535995160314 - nodes in this community are weakly interconnected._