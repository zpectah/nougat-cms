// Get also all files from config folder
// import env from '../../config/env.json'; // TODO: make this file load on init and save object to store ... create properties
import environmental from '../../config/environmental.json';
import global from '../../config/global.json';
import locales from '../../config/locales.json';
import options from '../../config/options.json';

const env = process.env.BUILD_ENVIRONMENT as 'development' | 'test' | 'production';

const config = {
    env,
    global,
    locales,
    options,
    environmental: env && environmental[env],
};

export default config;
