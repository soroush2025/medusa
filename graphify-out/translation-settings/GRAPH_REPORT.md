# Graph Report - staging-subject  (2026-10-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 825 nodes · 1618 edges · 36 communities (30 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Test Fixtures
- Package Metadata
- Translation Module Service
- Migrations
- Data Models
- Settings Module Service
- Entity Discovery
- TypeScript Config
- Test Config
- Computed Columns
- Package Metadata
- Module Loaders
- Entity Discovery Utils
- Settings Module API
- Joiner Fixtures
- Column Generator
- Translation Types
- Computed Column Registry
- Filter Rules
- TypeScript Config
- Entity Overrides
- Translation Update Steps
- Translation Settings Steps
- Translation Workflows
- View Configuration
- Layout Configuration
- Property Label Workflows
- Cross-Cutting Steps
- Translation DTOs
- Settings DTOs
- Translation Validators
- Translation Middleware
- Translation Query Config
- Locale Validators
- Locale Routes

## God Nodes (most connected - your core abstractions)
1. `ISettingsModuleService` - 41 edges
2. `SettingsModuleService` - 31 edges
3. `ITranslationModuleService` - 26 edges
4. `TranslationModuleService` - 25 edges
5. `generateEntityColumns()` - 16 edges
6. `EntityDiscoveryService` - 15 edges
7. `processEntityType()` - 13 edges
8. `getEntityOverride()` - 13 edges
9. `scripts` - 11 edges
10. `scripts` - 11 edges

## Surprising Connections (you probably didn't know these)
- `updateTranslationsWorkflow` --calls--> `updateTranslationsStep`  [EXTRACTED]
  workflows/update-translations.ts → steps/update-translations.ts
- `batchTranslationSettingsWorkflow` --calls--> `createTranslationSettingsStep`  [EXTRACTED]
  workflows/batch-translation-settings.ts → steps/create-translation-settings.ts
- `batchTranslationSettingsWorkflow` --calls--> `deleteTranslationSettingsStep`  [EXTRACTED]
  workflows/batch-translation-settings.ts → steps/delete-translation-settings.ts
- `batchTranslationSettingsWorkflow` --calls--> `updateTranslationSettingsStep`  [EXTRACTED]
  workflows/batch-translation-settings.ts → steps/update-translation-settings.ts
- `deleteTranslationsWorkflow` --calls--> `deleteTranslationsStep`  [EXTRACTED]
  workflows/delete-translations.ts → steps/delete-translations.ts

## Import Cycles
- None detected.

## Communities (36 total, 6 thin omitted)

### Community 0 - "Test Fixtures"
Cohesion: 0.13
Nodes (3): createLocaleFixture, createTranslationFixture, InjectedDependencies

### Community 1 - "Package Metadata"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 2 - "Translation Module Service"
Cohesion: 0.23
Nodes (3): TranslationModuleService, computeTranslatedFieldCount(), filterTranslationFields()

### Community 3 - "Migrations"
Cohesion: 0.08
Nodes (7): Migration20251208124155, Migration20251215083927, Migration20251218140235, Migration20260108122757, Migration20250717162007, Migration20260127081758, Migration20260615151246

### Community 4 - "Data Models"
Cohesion: 0.23
Nodes (5): Locale, Settings, Translation, PropertyLabel, UserPreference

### Community 7 - "TypeScript Config"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @models/*, @repositories/*, @services/*, @types/* (+1 more)

### Community 9 - "Computed Columns"
Cohesion: 0.19
Nodes (12): BUILTIN_COMPUTED_COLUMNS, ComputedColumnDefinition, ComputedColumnFilter, EntityOverride, RelationshipFilterConfig, ColumnCategory, ColumnDataType, FIELD_PATTERN_OVERRIDES (+4 more)

### Community 10 - "Package Metadata"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 11 - "Module Loaders"
Cohesion: 0.20
Nodes (4): defaultLocales, InitializeModuleInjectableDependencies, @medusajs/types, ModuleOptions

### Community 12 - "Entity Discovery Utils"
Cohesion: 0.09
Nodes (11): DiscoveredEntity, EntityInfo, JoinerConfig, normalizeEntityName(), SchemaTypeMap, toKebabCasePlural(), ENTITY_ENDPOINT_MAP, inferOptionsEndpoint() (+3 more)

### Community 13 - "Settings Module API"
Cohesion: 0.13
Nodes (5): LayoutConfiguration, ViewConfiguration, SettingsModuleService, SettingsModuleOptions, EntityDiscoveryService

### Community 14 - "Joiner Fixtures"
Cohesion: 0.08
Nodes (25): createCustomerJoinerConfig(), createOrderJoinerConfig(), createProductJoinerConfig(), Customer, CustomerGroup, customerSchema, getTestJoinerConfigs(), Order (+17 more)

### Community 15 - "Column Generator"
Cohesion: 0.23
Nodes (13): formatFieldName(), getEnumValues(), processEntityType(), semanticTypeToCategory(), ViewConfigurationColumn, getUnderlyingType(), isArrayField(), isSingleRelationship() (+5 more)

### Community 16 - "Translation Types"
Cohesion: 0.20
Nodes (6): TRANSLATION_MODULE, @medusajs/types, ModuleOptions, StringValuedKeys, TranslatableEntityConfig, TranslationModuleOptions

### Community 18 - "Filter Rules"
Cohesion: 0.20
Nodes (10): buildFilterConfig(), ColumnFilterConfig, DEFAULT_FIELD_FILTER_RULES, FieldFilterRules, FILTER_OPERATORS_BY_TYPE, getFilterOperators(), isFilterable(), NON_FILTERABLE_PATTERNS (+2 more)

### Community 20 - "TypeScript Config"
Cohesion: 0.20
Nodes (9): ../../../_tsconfig.base.json, compilerOptions, paths, extends, @/models, @/repositories, @/services, @/types (+1 more)

### Community 21 - "Entity Overrides"
Cohesion: 0.16
Nodes (15): generateEntityColumns(), ENTITY_OVERRIDES, EntityOverrideRegistry, getAdditionalTypes(), getDefaultVisibleFields(), getEntityOverride(), getEntityOverrideRegistry(), getFieldFilterRules() (+7 more)

### Community 23 - "Translation Update Steps"
Cohesion: 0.13
Nodes (5): updateTranslationsStepId, UpdateTranslationsStepInput, validateTranslationsStep, validateTranslationsStepId, ValidateTranslationsStepInput

### Community 25 - "Translation Settings Steps"
Cohesion: 0.17
Nodes (8): createTranslationSettingsStep, createTranslationSettingsStepId, CreateTranslationSettingsStepInput, deleteTranslationSettingsStep, updateTranslationSettingsStep, batchTranslationSettingsWorkflow, batchTranslationSettingsWorkflowId, BatchTranslationSettingsWorkflowInput

### Community 26 - "Translation Workflows"
Cohesion: 0.11
Nodes (15): createTranslationsStep, deleteTranslationsStep, updateTranslationsStep, batchTranslationsWorkflow, batchTranslationsWorkflowId, BatchTranslationsWorkflowInput, createTranslationsWorkflow, createTranslationsWorkflowId (+7 more)

### Community 34 - "View Configuration"
Cohesion: 0.14
Nodes (11): createViewConfigurationStep, setActiveViewConfigurationStep, updateViewConfigurationStep, updateViewConfigurationStepId, UpdateViewConfigurationStepInput, createViewConfigurationWorkflow, createViewConfigurationWorkflowId, CreateViewConfigurationWorkflowInput (+3 more)

### Community 35 - "Layout Configuration"
Cohesion: 0.15
Nodes (11): clearLayoutConfigurationStep, setActiveLayoutScopeStep, setLayoutConfigurationStep, setLayoutConfigurationStepId, SetLayoutConfigurationStepInput, clearLayoutConfigurationWorkflow, clearLayoutConfigurationWorkflowId, ClearLayoutConfigurationWorkflowInput (+3 more)

### Community 36 - "Property Label Workflows"
Cohesion: 0.09
Nodes (21): createPropertyLabelsStep, deletePropertyLabelsStep, updatePropertyLabelsStep, BatchPropertyLabelCreateInput, batchPropertyLabelsWorkflow, batchPropertyLabelsWorkflowId, BatchPropertyLabelsWorkflowInput, BatchPropertyLabelsWorkflowOutput (+13 more)

### Community 40 - "Cross-Cutting Steps"
Cohesion: 0.10
Nodes (23): createTranslationsStepId, CreateTranslationsStepInput, deleteTranslationSettingsStepId, DeleteTranslationSettingsStepInput, deleteTranslationsStepId, DeleteTranslationsStepInput, updateTranslationSettingsStepId, UpdateTranslationSettingsStepInput (+15 more)

### Community 48 - "Translation DTOs"
Cohesion: 0.07
Nodes (21): EntityTypeStatistics, FilterableLocaleProps, FilterableTranslationProps, FilterableTranslationSettingsProps, LocaleDTO, LocaleStatistics, TranslationDTO, TranslationSettingsDTO (+13 more)

### Community 57 - "Settings DTOs"
Cohesion: 0.05
Nodes (23): FilterableLayoutConfigurationProps, FilterableUserPreferenceProps, FilterableViewConfigurationProps, LayoutConfigurationData, LayoutConfigurationDTO, LayoutConfigurationFilterableFields, LayoutWidgetPreference, PropertyLabelDTO (+15 more)

### Community 69 - "Translation Validators"
Cohesion: 0.12
Nodes (13): AdminBatchTranslationSettingsType, AdminBatchTranslationsType, AdminCreateTranslation, AdminCreateTranslationSettings, AdminCreateTranslationType, AdminGetTranslationParamsFields, AdminGetTranslationsParamsType, AdminTranslationEntitiesParamsType (+5 more)

### Community 72 - "Translation Middleware"
Cohesion: 0.17
Nodes (7): adminTranslationsRoutesMiddlewares, AdminBatchTranslations, AdminBatchTranslationSettings, AdminGetTranslationsParams, AdminTranslationEntitiesParams, AdminTranslationSettingsParams, AdminTranslationStatisticsParams

### Community 73 - "Translation Query Config"
Cohesion: 0.29
Nodes (6): defaultAdminTranslationFields, Entities, translation, translation_setting, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 78 - "Locale Routes"
Cohesion: 0.17
Nodes (8): adminLocalesRoutesMiddlewares, defaultAdminLocaleFields, Entities, store_locale, listTransformQueryConfig, retrieveTransformQueryConfig, AdminGetLocaleParams, AdminGetLocalesParams

## Knowledge Gaps
- **9 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json`, `@medusajs/framework`, `@medusajs/test-utils` (+4 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 353 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SettingsModuleService` connect `Community 13` to `Community 4`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `../../../_tsconfig.base.json` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `TranslationModuleService` connect `Community 2` to `Community 0`, `Community 16`, `Community 4`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Why does `EntityDiscoveryService` connect `Community 13` to `Community 12`, `Community 5`, `Community 15`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08374384236453201 - nodes in this community are weakly interconnected._