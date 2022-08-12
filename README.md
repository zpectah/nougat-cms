# Nougat CMS

## Description
Modern content managing system with React admin and static PHP pages with Blade template system.

## Development

### Dependencies
- PHP 8.1+
- Node 18.7.0+
- Yarn 1.22.18
- Webpack 5+
- JavaScript ES6
- Typescript 4.7.4+
- ReactJS 18+
- Vue.js 3+
- MaterialUI

### Environment
#### Virtual Host
```
<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/.../<nougat-cms>/dist/"
    ServerName nougat-cms
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/path-to-project-root/.../<nougat-cms>/test/"
    ServerName test.nougat-cms
</VirtualHost>
```
#### Hosts
```
127.0.0.1		nougat-cms
127.0.0.1		test.nougat-cms
```

### Scripts
- `% yarn install` - Install dependencies
- `% yarn initial` - Prepare composer packages
- `% yarn dev` - Create development bundle
- `% yarn test` - Create test bundle
- `% yarn prod` - Create production bundle
- `% yarn start` - Create development bundle & watching project changes, but need to be manually reloaded.

## Deployment
..todo

## Project configuration
- !`./constants.json` - Project constants, do not change!
- !`./src/config/env.json` - Template for dynamic environment file created by each build, do not change!
- `./meta.json` - Project metadata, change what need to be changed. Web only metadata for manifest.json
- `./src/config/index.php` - Root configuration file with imports and define base constants
- `./src/config/constants.php` - Static backend constants. Change only when are changing view structure, etc.
- `./src/config/db.php` - Database configuration per each environment
- `./src/config/global.json` - Global project configuration file
- `./src/config/environmental.json` - Environmental config file
- `./src/config/locales.json` - Common locales (languages) config file
- `./src/config/options.json` - Common options list (for admin & web)

## TODO List
- create project structure =OK
- prepare dependencies
- prepare configuration and environment =OK
- bundle project for development/test/production =OK
- prepare admin base routing
- prepare web base routing

