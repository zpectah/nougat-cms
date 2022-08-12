import environmental from '../../config/environmental.json';
import global from '../../config/global.json';
import locales from '../../config/locales.json';
import options from '../../config/options.json';
import { environmentalKeyType } from './types';

const env = process.env.BUNDLE_ENVIRONMENT as environmentalKeyType;

const config = {
    env,
    global,
    locales,
    options,
    environmental: env && environmental[env],
    debug: process.env.BUNDLE_DEBUG,
};

export default config;
