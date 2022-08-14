import constants from '../../../constants.json';
import meta from '../../../meta.json';
import environmental from '../../config/environmental.json';
import global from '../../config/global.json';
import locales from '../../config/locales.json';
import options from '../../config/options.json';
import {
    environmentalNameType,
    configProps,
    pathsType,
} from './types';

export const env = process.env.BUNDLE_ENVIRONMENT as environmentalNameType;

export const paths: pathsType = {
    base: environmental[env].base_path,
    root: constants.APP.admin.path,
    api: constants.APP.api.path,
    web: constants.APP.web.path,
};

const config: configProps = {
    constants,
    meta,
    env,
    global,
    locales,
    options,
    environmental: environmental[env],
    debug: process.env.BUNDLE_DEBUG ? !!process.env.BUNDLE_DEBUG : true,
    token: process.env.BUNDLE_TOKEN || 'unknown',
};

export default config;
