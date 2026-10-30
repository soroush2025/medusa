# Graph Report - medusa  (2026-10-29)

## Corpus Check
- 1343 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1343 nodes · 2679 edges · 81 communities (51 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Auth Module Service
- MedusaCloudAuthService
- API Key Module Service
- Token Verification Provider
- AuthVerificationProviderService
- Rbac Module Service
- middlewares.ts
- AuthProviderService
- Recovery Codes Route
- validate-token.ts
- validators.ts
- register/route.ts
- AuthMfaProviderService
- user-module.ts
- UserModuleService
- scripts
- Migration20240703095850.ts
- types/index.ts
- jest.config.js
- Migration20240214033943
- rbac-module-service.ts
- TOTP & MFA Config
- rbac-role.ts
- rbac.spec.ts
- Migration20251219163509.ts
- rbac.ts
- jest.config.js
- types/index.ts
- api-key-module-service.ts
- api-key-module-service.spec.ts
- InitialSetup20240221144943.ts
- src/index.ts
- scripts
- jest.config.js
- Auth Identity Tests
- MFA Data Transfer Objects
- Provider Identity Models
- Auth Identity DTOs
- MFA Provider Services
- AuthenticationResponse
- providers/index.ts
- password-reset.ts
- mutations.ts
- Migration Scripts
- IRbacModuleService
- RbacRoleParentDTO
- RbacRoleDTO
- Auth Service Fixtures
- common.ts
- ApiKeyDTO
- Recovery Code Provider
- validators.ts
- query-config.ts
- validators.ts
- roles/validators.ts
- policies/[id]/route.ts
- roles/query-config.ts
- policies/middlewares.ts
- refetchApiKey
- [id]/route.ts
- route.ts
- Package Config / Empty Directories
- policies/query-config.ts
- home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_utils_index_definefileconfig
- TestMfaProvider
- jest.config.js
- Package Config / Empty Directories
- user.spec.ts
- paths
- models/index.ts
- Package Config / Empty Directories
- scripts
- paths
- Auth Identity Models
- Package Config / Empty Directories
- paths
- service.ts

## God Nodes (most connected - your core abstractions)
1. `AuthModuleService` - 53 edges
2. `IAuthModuleService` - 34 edges
3. `IRbacModuleService` - 34 edges
4. `ApiKeyModuleService` - 23 edges
5. `IUserModuleService` - 19 edges
6. `RbacModuleService` - 15 edges
7. `UserModuleService` - 15 edges
8. `AuthMfaProviderService` - 13 edges
9. `TotpMfaProvider` - 12 edges
10. `AuthIdentityDTO` - 12 edges

## Surprising Connections (you probably didn't know these)
- `AuthIdentityDTO` --references--> `AuthIdentityProviderService`  [EXTRACTED]
  common/auth-identity.ts → provider.ts
- `refetchApiKey()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → [id]/revoke/route.ts
- `refetchApiKey()` --calls--> `GET()`  [EXTRACTED]
  helpers.ts → [id]/route.ts
- `refetchApiKey()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → [id]/route.ts
- `refetchApiKey()` --calls--> `POST()`  [EXTRACTED]
  helpers.ts → [id]/sales-channels/route.ts

## Import Cycles
- None detected.

## Communities (81 total, 30 thin omitted)

### Community 2 - "Auth Module Service"
Cohesion: 0.08
Nodes (5): AuthProviderService, AuthMfaProviderService, AuthVerificationProviderService, AuthModuleService, AuthModuleOptions

### Community 10 - "MedusaCloudAuthService"
Cohesion: 0.27
Nodes (3): MedusaCloudAuthService, MedusaCloudAuthProviderOptions, verifyJwt

### Community 39 - "API Key Module Service"
Cohesion: 0.08
Nodes (11): ApiKeyModuleService, CreateApiKeyDTO, InitializeModuleInjectableDependencies, RevokeApiKeyInput, TokenDTO, UpdateApiKeyInput, omitToken(), redactKey() (+3 more)

### Community 9 - "Token Verification Provider"
Cohesion: 0.33
Nodes (6): TokenVerificationProvider, InjectedDependencies, TokenVerificationProviderOptions, generateVerificationToken(), getVerificationTokenTtlMs(), hashVerificationToken()

### Community 106 - "middlewares.ts"
Cohesion: 0.11
Nodes (16): Entities, AdminCreateApiKeyType, AdminGetApiKeysParamsType, AdminRevokeApiKeyType, AdminUpdateApiKeyType, adminApiKeyRoutesMiddlewares, defaultAdminApiKeyFields, api_key (+8 more)

### Community 11 - "AuthProviderService"
Cohesion: 0.10
Nodes (14): InjectedDependencies, InjectedDependencies, InjectedDependencies, AuthMfaDisablePolicy, InitializeModuleInjectableDependencies, ModuleOptions, InitializeModuleInjectableDependencies, AuthIdentifiersRegistrationName (+6 more)

### Community 113 - "Recovery Codes Route"
Cohesion: 0.09
Nodes (15): AuthMfaCreateFactorRequestType, AuthMfaDisableFactorRequestType, AuthMfaGenerateRecoveryCodesRequestType, AuthMfaVerifyChallengeRequestType, AuthMfaVerifyFactorRequestType, VerificationRequestType, authRoutesMiddlewares, AuthMfaCreateFactorRequest (+7 more)

### Community 114 - "validate-token.ts"
Cohesion: 0.22
Nodes (7): UpdateProviderJwtPayload, GET(), getAllowedAuthProvidersForActor(), isAuthProviderAllowedForActor(), run(), validateScopeProviderAssociation(), validateToken()

### Community 117 - "register/route.ts"
Cohesion: 0.13
Nodes (13): VerificationConfirmRequestType, GET(), POST(), POST(), GET(), POST(), POST(), POST() (+5 more)

### Community 18 - "user-module.ts"
Cohesion: 0.08
Nodes (6): InjectedDependencies, InjectedDependencies, InjectedDependencies, joinerConfig, joinerConfig, jsonwebtoken

### Community 3 - "TOTP & MFA Config"
Cohesion: 0.16
Nodes (11): TotpOptions, generateTotpCode(), generateTotpSecret(), generateTotpUri(), verifyTotpCode(), base32, RFC-6238, @otplib/core (+3 more)

### Community 31 - "rbac-role.ts"
Cohesion: 0.11
Nodes (6): InjectedDependencies, RbacPolicy, RbacRoleInheritance, RbacRoleParent, RbacRolePolicy, RbacRole

### Community 5 - "Auth Identity Tests"
Cohesion: 0.06
Nodes (13): TokenResponse, TestMfaProvider, createAuthIdentities(), moduleOptions, inMemoryCache, jwkPublic, mockCache, { privateKey, publicKey } (+5 more)

### Community 50 - "MFA Data Transfer Objects"
Cohesion: 0.10
Nodes (17): AuthMfaChallengeDTO, AuthMfaChallengeMethod, AuthMfaDTO, AuthMfaProviderMethod, AuthMfaRecoveryCodeDTO, AuthMfaSelector, AuthMfaStartDTO, AuthMfaStartResponse (+9 more)

### Community 51 - "Provider Identity Models"
Cohesion: 0.23
Nodes (6): AuthVerificationDTO, ConfirmAuthVerificationDTO, ConfirmAuthVerificationResponse, FilterableAuthVerificationProps, RequestAuthVerificationDTO, RequestAuthVerificationResponse

### Community 52 - "Auth Identity DTOs"
Cohesion: 0.14
Nodes (10): AuthIdentityDTO, CreateAuthIdentityDTO, CreateProviderIdentityDTO, FilterableAuthIdentityProps, FilterableProviderIdentityProps, ProviderIdentityDTO, UpdateAuthIdentityDTO, UpdateProviderIdentityDTO (+2 more)

### Community 53 - "MFA Provider Services"
Cohesion: 0.07
Nodes (9): AuthMfaProvider, IAuthMfaProvider, RecoveryCodeAuthMfaProvider, EmailPassAuthProviderOptions, GithubAuthProviderOptions, GoogleAuthProviderOptions, OidcAuthProviderOptions, OidcClaimMappings (+1 more)

### Community 54 - "AuthenticationResponse"
Cohesion: 0.17
Nodes (5): AuthenticationInput, AuthenticationResponse, AuthProviderInfoDTO, AuthIdentityProviderService, IAuthProvider

### Community 56 - "password-reset.ts"
Cohesion: 0.32
Nodes (4): ConsumePasswordResetTokenDTO, ConsumePasswordResetTokenResponse, CreatePasswordResetTokenDTO, CreatePasswordResetTokenResponse

### Community 58 - "mutations.ts"
Cohesion: 0.11
Nodes (9): FilterableInviteProps, FilterableUserProps, InviteDTO, UserDTO, CreateInviteDTO, CreateUserDTO, UpdateInviteDTO, UpdateUserDTO (+1 more)

### Community 64 - "IRbacModuleService"
Cohesion: 0.11
Nodes (5): FilterableRbacPolicyProps, RbacPolicyDTO, CreateRbacPolicyDTO, UpdateRbacPolicyDTO, IRbacModuleService

### Community 66 - "RbacRoleParentDTO"
Cohesion: 0.23
Nodes (4): FilterableRbacRoleParentProps, RbacRoleParentDTO, CreateRbacRoleParentDTO, UpdateRbacRoleParentDTO

### Community 67 - "RbacRoleDTO"
Cohesion: 0.25
Nodes (4): FilterableRbacRoleProps, RbacRoleDTO, CreateRbacRoleDTO, UpdateRbacRoleDTO

### Community 7 - "Auth Service Fixtures"
Cohesion: 0.12
Nodes (8): AuthServiceFixtures, EmailPassFixtureProvider, InjectedDependencies, services, inMemoryCache, mockCache, jsonwebtoken, jwks-rsa

### Community 70 - "common.ts"
Cohesion: 0.25
Nodes (4): FilterableRbacRolePolicyProps, RbacRolePolicyDTO, CreateRbacRolePolicyDTO, UpdateRbacRolePolicyDTO

### Community 73 - "ApiKeyDTO"
Cohesion: 0.12
Nodes (8): ApiKeyDTO, ApiKeyType, FilterableApiKeyProps, CreateApiKeyDTO, RevokeApiKeyDTO, UpdateApiKeyDTO, UpsertApiKeyDTO, IApiKeyModuleService

### Community 8 - "Recovery Code Provider"
Cohesion: 0.13
Nodes (14): InjectedDependencies, RecoveryCodeMfaProvider, InjectedDependencies, TotpConfig, TotpMfaProviderOptions, decryptSecret(), deriveKey(), encryptSecret() (+6 more)

### Community 80 - "validators.ts"
Cohesion: 0.16
Nodes (15): AdminAssignUserRolesType, AdminCreateUserType, AdminGetUserRolesParamsType, AdminGetUsersParamsType, AdminRemoveUserRolesType, AdminUpdateUserType, adminUserRoutesMiddlewares, AdminAssignUserRoles (+7 more)

### Community 83 - "query-config.ts"
Cohesion: 0.22
Nodes (8): Entities, defaultAdminUserFields, defaultAdminUserRolesFields, rbac_role, user, listTransformQueryConfig, listUserRolesTransformQueryConfig, retrieveTransformQueryConfig

### Community 86 - "validators.ts"
Cohesion: 0.10
Nodes (17): Entities, AdminCreateInviteType, AdminGetInviteAcceptParamsType, AdminGetInviteParamsType, AdminGetInvitesParamsType, AdminInviteAcceptType, adminInviteRoutesMiddlewares, defaultAdminInviteFields (+9 more)

### Community 90 - "roles/validators.ts"
Cohesion: 0.15
Nodes (16): AdminAddRolePoliciesType, AdminAssignRoleUsersType, AdminCreateRbacRoleType, AdminGetRbacRoleParamsType, AdminGetRbacRolesParamsType, AdminGetRoleUsersParamsType, AdminRemoveRoleUsersType, AdminAssignRoleUsers (+8 more)

### Community 92 - "roles/query-config.ts"
Cohesion: 0.17
Nodes (11): Entities, defaultAdminRbacRoleFields, defaultAdminRolePoliciesFields, defaultAdminRoleUsersFields, rbac_role, user, listRolePoliciesTransformQueryConfig, listRoleUsersTransformQueryConfig (+3 more)

### Community 94 - "policies/middlewares.ts"
Cohesion: 0.13
Nodes (13): AdminCreateRbacPolicyType, AdminGetRbacPoliciesParamsType, AdminGetRbacPolicyParamsType, AdminGetRbacPolicyRolesParamsType, adminRbacRoutesMiddlewares, adminRbacPolicyRoutesMiddlewares, AdminCreateRbacPolicy, AdminGetRbacPoliciesParams (+5 more)

### Community 110 - "refetchApiKey"
Cohesion: 0.22
Nodes (5): refetchApiKey(), POST(), GET(), POST(), POST()

### Community 88 - "route.ts"
Cohesion: 0.10
Nodes (6): refetchInvite(), POST(), GET(), POST(), refetchUser(), POST()

### Community 1 - "Package Config / Empty Directories"
Cohesion: 0.11
Nodes (18): author, bugs, url, description, engines, node, files, license (+10 more)

### Community 101 - "policies/query-config.ts"
Cohesion: 0.33
Nodes (5): defaultAdminRbacPolicyFields, defaultAdminRbacPolicyRolesFields, listRbacPolicyRolesTransformQueryConfig, listTransformQueryConfig, retrieveTransformQueryConfig

### Community 12 - "home_soroush_00_vp_projects_03_medusa_medusa_packages_core_framework_dist_utils_index_definefileconfig"
Cohesion: 0.22
Nodes (8): compilerOptions, paths, extends, @models, @repositories, @services, @types, ../../../_tsconfig.base.json

### Community 14 - "TestMfaProvider"
Cohesion: 0.18
Nodes (11): scripts, build, migration:create, migration:initial, migration:up, orm:cache:clear, resolve:aliases, test (+3 more)

### Community 16 - "jest.config.js"
Cohesion: 0.22
Nodes (4): defineJestConfig, defineJestConfig, defineJestConfig, defineJestConfig

### Community 17 - "Package Config / Empty Directories"
Cohesion: 0.05
Nodes (38): author, bugs, url, dependencies, jsonwebtoken, description, devDependencies, @medusajs/framework (+30 more)

### Community 19 - "user.spec.ts"
Cohesion: 0.25
Nodes (8): dependencies, jsonwebtoken, jwks-rsa, @otplib/core, @otplib/plugin-crypto-node, @otplib/totp, @otplib/uri, scrypt-kdf

### Community 23 - "paths"
Cohesion: 0.20
Nodes (9): compilerOptions, paths, extends, @models, @repositories, @services, @types, @utils (+1 more)

### Community 25 - "models/index.ts"
Cohesion: 0.23
Nodes (3): ApiKey, Invite, User

### Community 29 - "Package Config / Empty Directories"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 33 - "scripts"
Cohesion: 0.50
Nodes (4): repository, directory, type, url

### Community 34 - "paths"
Cohesion: 0.20
Nodes (9): compilerOptions, paths, extends, @models, @repositories, @services, @types, @utils (+1 more)

### Community 4 - "Auth Identity Models"
Cohesion: 0.46
Nodes (6): AuthIdentity, AuthMfaFactor, AuthMfaRecoveryCode, AuthPasswordResetToken, AuthVerification, ProviderIdentity

### Community 40 - "Package Config / Empty Directories"
Cohesion: 0.05
Nodes (36): author, bugs, url, description, devDependencies, @medusajs/framework, @medusajs/test-utils, engines (+28 more)

### Community 46 - "paths"
Cohesion: 0.22
Nodes (8): compilerOptions, paths, extends, @models, @repositories, @services, @types, ../../../_tsconfig.base.json

### Community 49 - "service.ts"
Cohesion: 0.67
Nodes (3): devDependencies, @medusajs/framework, @medusajs/test-utils

## Knowledge Gaps
- **19 isolated node(s):** `@medusajs/framework`, `@medusajs/test-utils`, `api_key`, `../../../_tsconfig.base.json`, `@medusajs/framework` (+14 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 551 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IAuthModuleService` connect `Auth Identity DTOs` to `Config & Module Options`, `MFA Data Transfer Objects`, `Provider Identity Models`, `AuthenticationResponse`, `password-reset.ts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `@medusajs/framework`, `@medusajs/test-utils`, `api_key` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth Module Service` be split into smaller, more focused modules?**
  _Cohesion score 0.07067603160667252 - nodes in this community are weakly interconnected._
- **Why does `AuthModuleService` connect `Auth Module Service` to `user-module.ts`, `AuthProviderService`, `Auth Identity Models`, `Auth Identity Tests`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `API Key Module Service` be split into smaller, more focused modules?**
  _Cohesion score 0.08383838383838384 - nodes in this community are weakly interconnected._
- **Why does `jsonwebtoken` connect `user-module.ts` to `Package Config / Empty Directories`, `Auth Identity Tests`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `middlewares.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11462450592885376 - nodes in this community are weakly interconnected._