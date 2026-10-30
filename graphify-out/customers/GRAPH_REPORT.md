# Graph Report - customers  (2026-10-29)

## Corpus Check
- 91 files · ~23,495 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 541 nodes · 1112 edges · 20 communities (18 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Customer Module Service
- Default Address Steps
- Customer Account Workflows
- Customer Step Inputs
- Customer Workflows
- Database Migrations
- Create Customers Step
- Customer Group Workflows
- Customer Data Types
- Admin Customer Routes
- Admin Customer Types
- Admin Query Config
- Admin Customer Group Types
- Customer Types & DTOs
- Admin Group Query Config
- Store Customer Types
- Package Manifest
- Store Query Config
- TypeScript Path Aliases
- Jest Config

## God Nodes (most connected - your core abstractions)
1. `ICustomerModuleService` - 25 edges
2. `CustomerModuleService` - 19 edges
3. `refetchCustomer()` - 13 edges
4. `scripts` - 12 edges
5. `refetchCustomer()` - 11 edges
6. `refetchCustomerGroup()` - 8 edges
7. `Customer` - 8 edges
8. `CustomerDTO` - 7 edges
9. `CustomerGroupDTO` - 7 edges
10. `unsetForCreate()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `DELETE()` --calls--> `refetchCustomer()`  [EXTRACTED]
  [id]/addresses/[address_id]/route.ts → helpers.ts
- `POST()` --calls--> `refetchCustomer()`  [EXTRACTED]
  [id]/addresses/[address_id]/route.ts → helpers.ts
- `POST()` --calls--> `refetchCustomer()`  [EXTRACTED]
  [id]/addresses/route.ts → helpers.ts
- `POST()` --calls--> `refetchCustomer()`  [EXTRACTED]
  [id]/customer-groups/route.ts → helpers.ts
- `GET()` --calls--> `refetchCustomer()`  [EXTRACTED]
  [id]/route.ts → helpers.ts

## Import Cycles
- 3-file cycle: `steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/create-customer-account.ts -> steps/validate-customer-account-creation.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/create-customer-groups.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/create-addresses.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/update-addresses.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/create-customers.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/delete-addresses.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/delete-customers.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/update-customers.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/delete-customer-groups.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/link-customer-groups-customer.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/link-customers-customer-group.ts -> steps/index.ts`
- 4-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/update-customer-groups.ts -> steps/index.ts`
- 5-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/create-customer-account.ts -> workflows/create-customers.ts -> steps/index.ts`
- 5-file cycle: `steps/index.ts -> steps/validate-customer-account-creation.ts -> workflows/index.ts -> workflows/remove-customer-account.ts -> workflows/delete-customers.ts -> steps/index.ts`

## Communities (20 total, 2 thin omitted)

### Community 0 - "Customer Module Service"
Cohesion: 0.07
Nodes (7): CustomerModuleService, InjectedDependencies, joinerConfig, CustomerAddress, Customer, CustomerGroupCustomer, CustomerGroup

### Community 10 - "Default Address Steps"
Cohesion: 0.12
Nodes (15): MaybeUnsetDefaultBillingAddressStepInput, MaybeUnsetDefaultShippingAddressesStepInput, CreateCustomerAddressesWorkflowInput, UpdateCustomerAddressesWorkflowInput, unsetForCreate(), unsetForUpdate(), createCustomerAddressesStep, maybeUnsetDefaultBillingAddressesStep (+7 more)

### Community 12 - "Customer Account Workflows"
Cohesion: 0.13
Nodes (10): CreateCustomerAccountWorkflowInput, GetCustomerAuthIdentityStepInput, RemoveCustomerAccountWorkflowInput, validateCustomerAccountCreation, validateCustomerAccountCreationStepId, createCustomerAccountWorkflow, createCustomerAccountWorkflowId, getCustomerAuthIdentityStep (+2 more)

### Community 14 - "Customer Step Inputs"
Cohesion: 0.12
Nodes (19): CreateCustomerAddressesStepInput, DeleteCustomerAddressesStepInput, DeleteCustomersStepInput, UpdateCustomerAddresseStepInput, UpdateCustomersStepInput, CreateCustomerGroupsStepInput, DeleteCustomerGroupsStepInput, createCustomerAddressesStepId (+11 more)

### Community 16 - "Customer Workflows"
Cohesion: 0.10
Nodes (16): CreateCustomersWorkflowInput, DeleteCustomerAddressesWorkflowInput, DeleteCustomersWorkflowInput, UpdateCustomersWorkflowInput, createCustomersStep, deleteCustomerAddressesStep, deleteCustomersStep, updateCustomersStep (+8 more)

### Community 2 - "Database Migrations"
Cohesion: 0.11
Nodes (5): Migration20240124154000, Migration20240524123112, Migration20240602110946, Migration20241211074630, Migration20251010130829

### Community 22 - "Customer Group Workflows"
Cohesion: 0.07
Nodes (23): UpdateCustomerGroupStepInput, CreateCustomerGroupsWorkflowInput, CreateCustomerGroupsWorkflowOutput, DeleteCustomerGroupsWorkflowInput, LinkCustomerGroupsToCustomerWorkflowInput, LinkCustomersToCustomerGroupWorkflow, UpdateCustomerGroupsWorkflowInput, UpdateCustomerGroupsWorkflowOutput (+15 more)

### Community 30 - "Customer Data Types"
Cohesion: 0.06
Nodes (19): CustomerAddressDTO, CustomerDTO, CustomerGroupCustomerDTO, CustomerGroupDTO, FilterableCustomerAddressProps, FilterableCustomerGroupCustomerProps, FilterableCustomerGroupProps, FilterableCustomerProps (+11 more)

### Community 4 - "Admin Customer Routes"
Cohesion: 0.08
Nodes (22): AdminCreateCustomerAddressType, refetchCustomer(), DELETE(), POST(), POST(), POST(), GET(), POST() (+14 more)

### Community 40 - "Admin Customer Types"
Cohesion: 0.11
Nodes (19): AdminCreateCustomerType, AdminCustomerAddressParamsType, AdminCustomerParamsType, AdminCustomersParamsType, AdminUpdateCustomerType, adminCustomerRoutesMiddlewares, AdminCreateCustomer, AdminCreateCustomerAddress (+11 more)

### Community 41 - "Admin Query Config"
Cohesion: 0.20
Nodes (9): Entities, defaultAdminCustomerAddressFields, defaultAdminCustomerFields, customer, customer_address, listAddressesTransformQueryConfig, listTransformQueryConfig, retrieveAddressTransformQueryConfig (+1 more)

### Community 47 - "Admin Customer Group Types"
Cohesion: 0.11
Nodes (11): AdminCreateCustomerGroupType, AdminGetCustomerGroupParamsType, AdminGetCustomerGroupsParamsType, AdminUpdateCustomerGroupType, adminCustomerGroupRoutesMiddlewares, AdminCreateCustomerGroup, AdminCustomerInGroupFilters, AdminGetCustomerGroupParams (+3 more)

### Community 5 - "Customer Types & DTOs"
Cohesion: 0.18
Nodes (5): InitializeModuleInjectableDependencies, CreateAddressDTO, UpdateAddressDTO, CreateCustomerGroupCustomerDTO, ServiceTypes

### Community 51 - "Admin Group Query Config"
Cohesion: 0.33
Nodes (5): Entities, defaultAdminCustomerGroupFields, customer_group, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 53 - "Store Customer Types"
Cohesion: 0.11
Nodes (15): StoreCreateCustomerAddressType, StoreCreateCustomerType, StoreGetCustomerAddressesParamsType, StoreGetCustomerAddressParamsType, StoreGetCustomerParamsType, StoreUpdateCustomerAddressType, StoreUpdateCustomerType, storeCustomerRoutesMiddlewares (+7 more)

### Community 1 - "Package Manifest"
Cohesion: 0.05
Nodes (37): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+29 more)

### Community 55 - "Store Query Config"
Cohesion: 0.20
Nodes (6): defaultStoreCustomerAddressFields, defaultStoreCustomersFields, listAddressesTransformQueryConfig, nestedStoreCustomerAddressFields, retrieveAddressTransformQueryConfig, retrieveTransformQueryConfig

### Community 8 - "TypeScript Path Aliases"
Cohesion: 0.22
Nodes (8): compilerOptions, paths, extends, @models, @repositories, @services, @types, ../../../_tsconfig.base.json

## Knowledge Gaps
- **6 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `customer`, `customer_address`, `customer_group` (+1 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 232 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `unsetForUpdate()` connect `Default Address Steps` to `Customer Data Types`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `customer` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Customer Module Service` be split into smaller, more focused modules?**
  _Cohesion score 0.06892655367231638 - nodes in this community are weakly interconnected._
- **Should `Default Address Steps` be split into smaller, more focused modules?**
  _Cohesion score 0.12043010752688173 - nodes in this community are weakly interconnected._
- **Should `Customer Account Workflows` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Customer Step Inputs` be split into smaller, more focused modules?**
  _Cohesion score 0.11517165005537099 - nodes in this community are weakly interconnected._
- **Should `Customer Workflows` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._