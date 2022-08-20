# How to

This is document for describing how to do this or that in nutshell. When you adding/updating/deleting features, model, etc.

## Adding ADMIN new store property
1. Set up store model type
2. Set up connection
3. Set up hook

## Adding new model
1. Create database table
2. Set up configuration
3. Set up model/core
4. Set up ADMIN
   1. module, enums, types, i18n ...
   2. connections
   3. hooks
   4. views
   5. detail form
   6. list options

## Updating 'Users' model level
1. Update CORE enum `src/config/constants.php`
2. Update ADMIN enum `src/admin/scripts/enums/model/Users.ts:UsersLevelKeys`
3. Translation keys
