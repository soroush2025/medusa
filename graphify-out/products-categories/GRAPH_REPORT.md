# Graph Report - medusa  (2026-10-29)

## Corpus Check
- 344 files · ~173,736 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1574 nodes · 3826 edges · 116 communities (68 shown, 48 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Collections API Contracts
- Collections API Helpers
- Collections API Routes
- Collections Query Config
- Collections Route Handlers
- Collections Admin Routes
- Product Option Middlewares
- Product Option Validators
- Product Category Validators
- Product Category Query Config
- Product Category Middlewares
- Product Options Query Config
- Option Value Detail Routes
- Product API Validators
- Product Import Batch Route
- Product Variant API Helpers
- Products Query Config
- Products API Remap Helpers
- Price List Filtering
- Product Admin Middlewares
- Collections Validators
- Collections Query Config
- Collections Middlewares
- Product Type Validators
- Product Tags Query Config
- Product Type Route Helpers
- Product Tags Middlewares
- Product Type Validators B
- Product Types Query Config
- Product Type Middlewares
- Create Categories Workflow
- Delete Categories Workflow
- Update Categories Workflow
- Update Categories Step
- Create Categories Step
- Delete Categories Step
- Product Workflow Steps
- Create Product Variants Workflow
- Product Chunking Steps
- Update Product Tags Workflow
- Update Option Values Workflow
- Delete Options/Types Workflow
- Create Product Types Workflow
- Product Option Workflows
- Product CSV Generation
- Product CSV Parsing
- CSV Parsing
- Update Products Workflow
- Delete Collections Workflow
- Update Collections Workflow
- Create Product Tags Workflow
- Create Products Workflow
- Batch Image Variants Workflow
- Product Option Linking Workflow
- Product Import Normalization
- Create Collections Workflow
- Delete Products Workflow
- Product Export Normalization
- Product Export Steps
- Product Integration Fixtures
- Product Module Service Impl
- Product Repository
- Initial Setup Migration
- Migration 2024-06
- Migration 2024-08
- Migration 2024-11a
- Migration 2024-11b
- Migration 2025-04
- Migration 2025-05
- Migration 2025-09a
- Migration 2025-09b
- Migration 2025-09c
- Migration 2025-10a
- Migration 2025-10b
- Migration 2026-02
- Migration 2026-03a
- Migration 2026-03b
- Product Module Service Helpers
- Migration 2026-07
- Product Category Repository
- Product Category Service Queries
- Product Module Migrations
- Product Category Services
- Product Module Types
- Product Test Repositories
- Product Category Repositories
- Product Repositories
- TS Config Paths
- Package Metadata
- Jest Config
- Product Repository Base
- Product Module Service Interface
- Product Variant DTOs
- Product Module Service Misc
- Product Category DTOs
- Product Collection DTOs
- Product DTOs
- Product Option DTOs
- Product Tag DTOs
- Product Type DTOs
- Product Variant DTOs

## God Nodes (most connected - your core abstractions)
1. `ProductModuleService` - 94 edges
2. `IProductModuleService` - 77 edges
3. `ProductCategory` - 29 edges
4. `Product` - 26 edges
5. `remapKeysForProduct()` - 18 edges
6. `remapProductResponse()` - 18 edges
7. `ProductCategoryRepository` - 17 edges
8. `ProductOption` - 17 edges
9. `ProductRepository` - 16 edges
10. `ProductCategoryService` - 16 edges

## Surprising Connections (you probably didn't know these)
- `remapKeysForProduct()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → export/route.ts
- `remapProductResponse()` --indirect_call--> `POST()`  [INFERRED]
  helpers.ts → batch/route.ts
- `refetchCollection()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → [id]/products/route.ts
- `refetchCollection()` --calls--> `GET()`  [EXTRACTED]
  helpers.ts → [id]/route.ts
- `refetchCollection()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → [id]/route.ts

## Import Cycles
- 3-file cycle: `src/models/index.ts -> src/models/product.ts -> src/models/product-variant.ts -> src/models/index.ts`
- 3-file cycle: `src/models/index.ts -> src/models/product-image.ts -> src/models/product-variant.ts -> src/models/index.ts`
- 3-file cycle: `src/models/index.ts -> src/models/product-option-value.ts -> src/models/product-variant.ts -> src/models/index.ts`
- 3-file cycle: `src/models/index.ts -> src/models/product-product-option.ts -> src/models/product-option.ts -> src/models/index.ts`
- 3-file cycle: `src/models/product-option-value.ts -> src/models/product-product-option.ts -> src/models/product-option.ts -> src/models/product-option-value.ts`
- 3-file cycle: `src/models/index.ts -> src/models/product.ts -> src/models/product-type.ts -> src/models/index.ts`
- 3-file cycle: `src/models/index.ts -> src/models/product.ts -> src/models/product-option.ts -> src/models/index.ts`
- 4-file cycle: `src/models/index.ts -> src/models/product.ts -> src/models/product-image.ts -> src/models/product-variant.ts -> src/models/index.ts`
- 4-file cycle: `src/models/index.ts -> src/models/product.ts -> src/models/product-product-option.ts -> src/models/product-option.ts -> src/models/index.ts`
- 4-file cycle: `src/models/index.ts -> src/models/product-option-value.ts -> src/models/product-product-option.ts -> src/models/product-option.ts -> src/models/index.ts`
- 5-file cycle: `src/models/index.ts -> src/models/product.ts -> src/models/product-option.ts -> src/models/product-option-value.ts -> src/models/product-variant.ts -> src/models/index.ts`
- 5-file cycle: `src/models/index.ts -> src/models/product-product-option.ts -> src/models/product-option.ts -> src/models/product-option-value.ts -> src/models/product-variant.ts -> src/models/index.ts`
- 5-file cycle: `steps/index.ts -> steps/process-import-chunks.ts -> workflows/batch-products.ts -> workflows/update-products.ts -> workflows/upsert-variant-prices.ts -> steps/index.ts`
- 5-file cycle: `steps/index.ts -> steps/process-import-chunks.ts -> workflows/batch-products.ts -> workflows/delete-products.ts -> workflows/delete-product-options.ts -> steps/index.ts`

## Communities (116 total, 48 thin omitted)

### Community 0 - "Collections API Contracts"
Cohesion: 0.00
Nodes (4): AdminGetCollectionsParamsType, AdminGetCollectionsParamsFields, CreateCollection, UpdateCollection

### Community 4 - "Collections Query Config"
Cohesion: 0.01
Nodes (5): Entities, defaultAdminCollectionFields, product_collection, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 5 - "Collections Route Handlers"
Cohesion: 0.02
Nodes (5): refetchCollection(), POST(), GET(), POST(), POST()

### Community 1 - "Collections Admin Routes"
Cohesion: 0.01
Nodes (5): adminCollectionRoutesMiddlewares, AdminCreateCollection, AdminGetCollectionParams, AdminGetCollectionsParams, AdminUpdateCollection

### Community 15 - "Product Option Middlewares"
Cohesion: 0.10
Nodes (8): adminProductOptionRoutesMiddlewares, AdminCreateProductOption, AdminGetProductOptionParams, AdminGetProductOptionsParams, AdminGetProductOptionValueParams, AdminGetProductOptionValuesParams, AdminUpdateProductOption, AdminUpdateProductOptionValue

### Community 13 - "Product Option Validators"
Cohesion: 0.05
Nodes (7): AdminGetProductOptionParamsType, AdminGetProductOptionValueParamsType, AdminGetProductOptionValuesParamsType, AdminUpdateProductOptionType, AdminUpdateProductOptionValueType, AdminGetProductOptionsParamsFields, AdminGetProductOptionValuesParamsFields

### Community 7 - "Product Category Validators"
Cohesion: 0.02
Nodes (7): AdminCreateProductCategoryType, AdminProductCategoriesParamsType, AdminProductCategoryParamsType, AdminUpdateProductCategoryType, AdminProductCategoriesParamsFields, CreateProductCategory, UpdateProductCategory

### Community 12 - "Product Category Query Config"
Cohesion: 0.11
Nodes (5): Entities, defaults, product_category, listProductCategoryConfig, retrieveProductCategoryConfig

### Community 8 - "Product Category Middlewares"
Cohesion: 0.09
Nodes (5): adminProductCategoryRoutesMiddlewares, AdminCreateProductCategory, AdminProductCategoriesParams, AdminProductCategoryParams, AdminUpdateProductCategory

### Community 16 - "Product Options Query Config"
Cohesion: 0.12
Nodes (9): Entities, defaultAdminProductOptionsFields, defaultAdminProductOptionValuesFields, product_option, product_option_value, listProductOptionsTransformQueryConfig, listProductOptionValuesTransformQueryConfig, retrieveProductOptionsTransformQueryConfig (+1 more)

### Community 17 - "Option Value Detail Routes"
Cohesion: 0.19
Nodes (4): DELETE(), GET(), POST(), retrieveProductOptionValue()

### Community 18 - "Product API Validators"
Cohesion: 0.05
Nodes (38): AdminBatchCreateVariantInventoryItemType, AdminBatchDeleteVariantInventoryItemType, AdminBatchImageVariantType, AdminBatchUpdateProductType, AdminBatchUpdateProductVariantType, AdminBatchUpdateVariantInventoryItemType, AdminBatchVariantImagesType, AdminCreateProductTagType (+30 more)

### Community 21 - "Product Import Batch Route"
Cohesion: 0.06
Nodes (6): AdminImportProductsType, POST(), POST(), buildBatchVariantInventoryData(), refetchBatchProducts(), POST()

### Community 22 - "Product Variant API Helpers"
Cohesion: 0.17
Nodes (13): AdminBatchVariantInventoryItemsType, buildRules(), isPricing(), refetchBatchVariants(), refetchVariant(), remapKeysForVariant(), remapVariantResponse(), POST() (+5 more)

### Community 23 - "Products Query Config"
Cohesion: 0.12
Nodes (15): Entities, defaultAdminProductFields, defaultAdminProductsOptionFields, defaultAdminProductsVariantFields, inventory_item, price, product, product_option (+7 more)

### Community 20 - "Products API Remap Helpers"
Cohesion: 0.16
Nodes (12): remapKeysForProduct(), remapProductResponse(), POST(), GET(), POST(), POST(), DELETE(), POST() (+4 more)

### Community 19 - "Product Admin Middlewares"
Cohesion: 0.07
Nodes (23): adminProductRoutesMiddlewares, upload, AdminBatchCreateVariantInventoryItem, AdminBatchDeleteVariantInventoryItem, AdminBatchImageVariant, AdminBatchUpdateProduct, AdminBatchUpdateProductVariant, AdminBatchUpdateVariantInventoryItem (+15 more)

### Community 26 - "Collections Validators"
Cohesion: 0.33
Nodes (5): AdminCreateProductTagType, AdminGetProductTagParamsType, AdminGetProductTagsParamsType, AdminUpdateProductTagType, AdminGetProductTagsParamsFields

### Community 30 - "Collections Query Config"
Cohesion: 0.33
Nodes (5): Entities, defaultAdminProductTagFields, product_tag, listProductTagsTransformQueryConfig, retrieveProductTagTransformQueryConfig

### Community 27 - "Collections Middlewares"
Cohesion: 0.33
Nodes (5): adminProductTagRoutesMiddlewares, AdminCreateProductTag, AdminGetProductTagParams, AdminGetProductTagsParams, AdminUpdateProductTag

### Community 31 - "Product Type Validators"
Cohesion: 0.21
Nodes (5): AdminCreateProductTypeType, AdminGetProductTypeParamsType, AdminGetProductTypesParamsType, AdminUpdateProductTypeType, AdminGetProductTypesParamsFields

### Community 34 - "Product Tags Query Config"
Cohesion: 0.33
Nodes (5): Entities, defaultAdminProductTypeFields, product_type, listProductTypesTransformQueryConfig, retrieveProductTypeTransformQueryConfig

### Community 37 - "Product Type Route Helpers"
Cohesion: 0.50
Nodes (4): refetchProductType(), GET(), POST(), POST()

### Community 32 - "Product Tags Middlewares"
Cohesion: 0.33
Nodes (5): adminProductTypeRoutesMiddlewares, AdminCreateProductType, AdminGetProductTypeParams, AdminGetProductTypesParams, AdminUpdateProductType

### Community 41 - "Product Types Query Config"
Cohesion: 0.33
Nodes (5): Entities, defaultAdminProductVariantFields, product_variant, listProductVariantQueryConfig, retrieveProductVariantQueryConfig

### Community 42 - "Create Categories Workflow"
Cohesion: 0.50
Nodes (4): CreateProductCategoriesWorkflowOutput, createProductCategoriesStep, createProductCategoriesWorkflow, createProductCategoriesWorkflowId

### Community 43 - "Delete Categories Workflow"
Cohesion: 0.50
Nodes (4): DeleteProductCategoriesWorkflowInput, deleteProductCategoriesStep, deleteProductCategoriesWorkflow, deleteProductCategoriesWorkflowId

### Community 44 - "Update Categories Workflow"
Cohesion: 0.50
Nodes (4): UpdateProductCategoriesWorkflowOutput, updateProductCategoriesStep, updateProductCategoriesWorkflow, updateProductCategoriesWorkflowId

### Community 49 - "Product Workflow Steps"
Cohesion: 0.02
Nodes (57): AddProductOptionsToProductStepInput, CreateProductOptionsStepInput, CreateVariantPricingLinkStepInput, DeleteCollectionsStepInput, DeleteProductOptionValuesStepInput, DeleteProductOptionsStepInput, DeleteProductTagsStepInput, DeleteProductTypesStepInput (+49 more)

### Community 50 - "Create Product Variants Workflow"
Cohesion: 0.10
Nodes (21): VariantInventoryInput, BatchProductVariantsWorkflowInput, BatchProductVariantsWorkflowOutput, CreateProductVariantsWorkflowInput, UpdateProductVariantsWorkflowInput, UpsertVariantPricesWorkflowInput, createDefaultInventoryItem(), buildLink() (+13 more)

### Community 59 - "Product Chunking Steps"
Cohesion: 0.22
Nodes (7): NormalizeProductCsvStepInput, Chunk, NormalizeProductCsvV1StepInput, createChunks(), processChunk(), normalizeCsvStepId, normalizeCsvToChunksStepId

### Community 60 - "Update Product Tags Workflow"
Cohesion: 0.22
Nodes (8): DeleteProductTagsWorkflowInput, UpdateProductTagsWorkflowInput, deleteProductTagsStep, updateProductTagsStep, deleteProductTagsWorkflow, deleteProductTagsWorkflowId, updateProductTagsWorkflow, updateProductTagsWorkflowId

### Community 61 - "Update Option Values Workflow"
Cohesion: 0.22
Nodes (8): DeleteProductOptionValuesWorkflowInput, UpdateProductOptionValuesWorkflowInput, deleteProductOptionValuesStep, updateProductOptionValuesStep, deleteProductOptionValuesWorkflow, deleteProductOptionValuesWorkflowId, updateProductOptionValuesWorkflow, updateProductOptionValuesWorkflowId

### Community 62 - "Delete Options/Types Workflow"
Cohesion: 0.22
Nodes (8): DeleteProductOptionsWorkflowInput, DeleteProductTypesWorkflowInput, deleteProductOptionsStep, deleteProductTypesStep, deleteProductOptionsWorkflow, deleteProductOptionsWorkflowId, deleteProductTypesWorkflow, deleteProductTypesWorkflowId

### Community 63 - "Create Product Types Workflow"
Cohesion: 0.22
Nodes (8): CreateProductTypesWorkflowInput, UpdateProductTypesWorkflowInput, createProductTypesStep, updateProductTypesStep, createProductTypesWorkflow, createProductTypesWorkflowId, updateProductTypesWorkflow, updateProductTypesWorkflowId

### Community 64 - "Product Option Workflows"
Cohesion: 0.22
Nodes (6): CreateProductOptionsWorkflowInput, UpdateProductOptionsWorkflowInput, updateProductOptionsStep, createProductOptionsWorkflowId, updateProductOptionsWorkflow, updateProductOptionsWorkflowId

### Community 65 - "Product CSV Generation"
Cohesion: 0.27
Nodes (9): GenerateProductCsvStepInput, GenerateProductCsvStepOutput, comparator(), csvSortFunction(), convertJsonToCsv(), generateProductCsvStep, generateProductCsvStepId, prodColumnPositions (+1 more)

### Community 66 - "Product CSV Parsing"
Cohesion: 0.50
Nodes (4): ParseProductCsvStepInput, normalizeV1Products(), parseProductCsvStep, parseProductCsvStepId

### Community 67 - "CSV Parsing"
Cohesion: 0.29
Nodes (5): ConvertCsvToJsonOptions, ConvertJsonToCsvOptions, convertCsvToJson(), detectDelimiter(), delimiters

### Community 51 - "Update Products Workflow"
Cohesion: 0.10
Nodes (26): CreateProductVariantsDefaultInventoryStepInput, DismissProductVariantsInventoryStepInput, GetVariantPricingLinkStepInput, UpdateProductsWorkflowInputProducts, UpdateProductsWorkflowInputSelector, UpdateProductWorkflowInput, getVariantIdsWithoutInventory(), dismissVariantsInventory() (+18 more)

### Community 69 - "Delete Collections Workflow"
Cohesion: 0.50
Nodes (4): DeleteCollectionsWorkflowInput, deleteCollectionsStep, deleteCollectionsWorkflow, deleteCollectionsWorkflowId

### Community 70 - "Update Collections Workflow"
Cohesion: 0.50
Nodes (4): UpdateCollectionsWorkflowInput, updateCollectionsStep, updateCollectionsWorkflow, updateCollectionsWorkflowId

### Community 71 - "Create Product Tags Workflow"
Cohesion: 0.50
Nodes (4): CreateProductTagsWorkflowInput, createProductTagsStep, createProductTagsWorkflow, createProductTagsWorkflowId

### Community 52 - "Create Products Workflow"
Cohesion: 0.14
Nodes (14): ImportProductOptionInput, ProcessProductOptionsForImportInput, BatchProductWorkflowInput, CreateProductsWorkflowInput, ValidateProductInputStepInput, runStep(), createProductsStep, processProductOptionsForImportStep (+6 more)

### Community 54 - "Batch Image Variants Workflow"
Cohesion: 0.19
Nodes (13): BatchImageVariantsWorkflowInput, BatchImageVariantsWorkflowOutput, BatchVariantImagesWorkflowInput, BatchVariantImagesWorkflowOutput, addImageToVariantsStep, addImagesToVariantStep, removeImageFromVariantsStep, removeImagesFromVariantStep (+5 more)

### Community 55 - "Product Option Linking Workflow"
Cohesion: 0.22
Nodes (11): LinkProductOptionsToProductWorkflowInput, SetProductProductOptionsWorkflowInput, addProductOptionsToProductStep, createProductOptionsStep, removeProductOptionsFromProductStep, updateProductOptionValuesOnProductStep, createAndLinkProductOptionsToProductWorkflow, createAndLinkProductOptionsToProductWorkflowId (+3 more)

### Community 56 - "Product Import Normalization"
Cohesion: 0.22
Nodes (13): ImportOptionMeta, extractOptionMetaForImport(), getNormalizedValue(), normalizeForImport(), normalizeProductForImport(), normalizeVariantForImport(), parseBooleanFromCsv(), snakecaseKey() (+5 more)

### Community 57 - "Create Collections Workflow"
Cohesion: 0.17
Nodes (10): CreateCollectionsWorkflowInput, batchLinkProductsToCollectionStep, batchLinkProductsToCategoryStep, createCollectionsStep, batchLinkProductsToCollectionWorkflow, batchLinkProductsToCollectionWorkflowId, batchLinkProductsToCategoryWorkflow, batchLinkProductsToCategoryWorkflowId (+2 more)

### Community 58 - "Delete Products Workflow"
Cohesion: 0.22
Nodes (8): DeleteProductVariantsWorkflowInput, DeleteProductsWorkflowInput, deleteProductVariantsStep, deleteProductsStep, deleteProductVariantsWorkflow, deleteProductVariantsWorkflowId, deleteProductsWorkflow, deleteProductsWorkflowId

### Community 68 - "Product Export Normalization"
Cohesion: 0.80
Nodes (5): beautifyKey(), normalizeForExport(), normalizeProductForExport(), normalizeVariantForExport(), prefixFields()

### Community 53 - "Product Export Steps"
Cohesion: 0.16
Nodes (13): appendProductExportKeys(), exportProductsStep, exportProductsStepId, normalizeCsvStep, normalizeCsvToChunksStep, processImportChunksStep, waitConfirmationProductImportStep, exportProductsWorkflow (+5 more)

### Community 72 - "Product Integration Fixtures"
Cohesion: 0.07
Nodes (25): Service, Service, buildProductAndRelationsData(), buildProductOnlyData(), assignCategoriesToProduct(), createCollections(), createProductAndTags(), createProductVariants() (+17 more)

### Community 73 - "Product Module Service Impl"
Cohesion: 0.08
Nodes (7): ProductModuleService, UpdateCollectionInput, UpdateProductInput, UpdateProductVariantInput, VariantImageInputArray, ProductCollection, ProductOption

### Community 76 - "Product Category Repository"
Cohesion: 0.16
Nodes (4): ProductCategoryRepository, ProductCategoryService, updateMpathRecursively(), ProductCategory

### Community 77 - "Product Category Service Queries"
Cohesion: 0.11
Nodes (7): OptionLinkChanges, computeOptionLinkChanges(), applyPublishedProductsContext(), applyPublishedProductsPopulateWhere(), extractPublishedProductsContext(), eventBuilders, enabledContext

### Community 78 - "Product Module Migrations"
Cohesion: 0.08
Nodes (5): Migration20251022153442, Migration20251029150809, Migration20251110180907, Migration20251113183352, Migration20260623180000

### Community 80 - "Product Module Types"
Cohesion: 0.17
Nodes (10): CreateProductCollection, FilterableProduct, FilterableProductOption, InitializeModuleInjectableDependencies, UpdateCategoryInput, UpdateProductCollection, UpdateProductOptionInput, UpdateTagInput (+2 more)

### Community 81 - "Product Test Repositories"
Cohesion: 0.24
Nodes (6): CustomRepository, ProductCategoryRepository, ProductCollectionRepository, ProductRepository, ProductTagRepository, ProductVariantRepository

### Community 84 - "TS Config Paths"
Cohesion: 0.20
Nodes (9): compilerOptions, paths, extends, @models, @repositories, @services, @types, @utils (+1 more)

### Community 74 - "Package Metadata"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 107 - "Product Variant DTOs"
Cohesion: 0.16
Nodes (11): CreateProductImageDTO, CreateProductOptionValueDTO, CreateProductVariantInventoryKit, FilterableProductOptionValueProps, ProductImageDTO, ProductOptionValueDTO, ProductProductOptionDTO, ProductStatus (+3 more)

### Community 109 - "Product Category DTOs"
Cohesion: 0.24
Nodes (5): CreateProductCategoryDTO, FilterableProductCategoryProps, ProductCategoryDTO, UpdateProductCategoryDTO, UpsertProductCategoryDTO

### Community 110 - "Product Collection DTOs"
Cohesion: 0.24
Nodes (5): CreateProductCollectionDTO, FilterableProductCollectionProps, ProductCollectionDTO, UpdateProductCollectionDTO, UpsertProductCollectionDTO

### Community 111 - "Product DTOs"
Cohesion: 0.24
Nodes (5): CreateProductDTO, FilterableProductProps, ProductDTO, UpdateProductDTO, UpsertProductDTO

### Community 112 - "Product Option DTOs"
Cohesion: 0.24
Nodes (5): CreateProductOptionDTO, FilterableProductOptionProps, ProductOptionDTO, UpdateProductOptionDTO, UpsertProductOptionDTO

### Community 113 - "Product Tag DTOs"
Cohesion: 0.24
Nodes (5): CreateProductTagDTO, FilterableProductTagProps, ProductTagDTO, UpdateProductTagDTO, UpsertProductTagDTO

### Community 114 - "Product Type DTOs"
Cohesion: 0.24
Nodes (5): CreateProductTypeDTO, FilterableProductTypeProps, ProductTypeDTO, UpdateProductTypeDTO, UpsertProductTypeDTO

### Community 115 - "Product Variant DTOs"
Cohesion: 0.24
Nodes (5): CreateProductVariantDTO, FilterableProductVariantProps, ProductVariantDTO, UpdateProductVariantDTO, UpsertProductVariantDTO

## Knowledge Gaps
- **15 isolated node(s):** `product_collection`, `product_category`, `product_option`, `product_option_value`, `inventory_item` (+10 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 678 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **48 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IProductModuleService` connect `Product Module Service Interface` to `Product Variant DTOs`, `Product Module Service Misc`, `Product Category DTOs`, `Product Collection DTOs`, `Product DTOs`, `Product Option DTOs`, `Product Tag DTOs`, `Product Type DTOs`, `Product Variant DTOs`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `product_collection`, `product_category`, `product_option` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Collections API Contracts` be split into smaller, more focused modules?**
  _Cohesion score 0.001763150161622098 - nodes in this community are weakly interconnected._
- **Why does `ProductModuleService` connect `Product Module Service Impl` to `Product Integration Fixtures`, `Product Module Service Helpers`, `Product Category Repository`, `Product Category Service Queries`, `Product Repository`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `Collections API Helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.006342494714587738 - nodes in this community are weakly interconnected._
- **Why does `ProductCategory` connect `Product Category Repository` to `Product Integration Fixtures`, `Product Module Service Impl`, `Product Module Service Helpers`, `Product Category Services`, `Product Module Types`, `Product Category Repositories`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Should `Collections API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.002902757619738752 - nodes in this community are weakly interconnected._