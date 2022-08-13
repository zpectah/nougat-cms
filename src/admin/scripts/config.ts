import constants from '../../../constants.json';
import meta from '../../../meta.json';
import environmental from '../../config/environmental.json';
import global from '../../config/global.json';
import locales from '../../config/locales.json';
import options from '../../config/options.json';
import { environmentalKeyType, configProps } from './types';

const env = process.env.BUNDLE_ENVIRONMENT as environmentalKeyType;

const config: configProps = {
    constants,
    meta,
    env,
    global,
    locales,
    options,
    environmental: env && environmental[env],
    debug: process.env.BUNDLE_DEBUG ? !!process.env.BUNDLE_DEBUG : true,
};

export default config;
