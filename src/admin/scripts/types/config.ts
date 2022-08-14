import environmental from "../../../config/environmental.json";
import constants from "../../../../constants.json";
import {paths} from "../config";

export type environmentalNameType = 'development' | 'test' | 'production';
export type environmentalKeyType = 'dev' | 'test' | 'prod';

type propValueType = string | number | boolean | undefined;

type propObjectType = {
    [k: string]: propValueType | (propValueType)[] | propObjectType,
};

type appScopeObjectType = {
    path: string,
    folder: string,
    scripts?: string,
    styles?: string,
    views?: string,
    views_compiled?: string,
};

type documentMetaType = {
    title: string,
    description: string,
    robots: string,
    keywords: string,
    author: string,
    charset: string,
    viewport: string,
    lang: string,
};

type localesObjectType = {
    key: string,
    label: {
        a: string,
        b: string,
    },
    format: {
        date: string,
        time: string,
        datetime: string,
        date_alt: string,
        time_alt: string,
        datetime_alt: string,
    },
    direction: string,
};

export type pathsType = {
    base: string,
    root: string,
    api: string,
    web: string,
};

export interface configProps {
    constants: {
        ENV: propObjectType,
        APP: {
            config: string,
            uploads: string,
            logs: string,
            assets: string,
            admin: appScopeObjectType,
            "api": appScopeObjectType,
            "web": appScopeObjectType
        },
        DEFAULTS: propObjectType,
        CMS: {
            name: string,
            short_name: string,
            description: string,
            author: string,
            copyright: number | string,
            color: string,
            background: string,
            repository: string,
            themes: {
                default: string,
                list: string[],
            },
            languages: {
                default: string,
                list: string[],
            },
            document: {
                meta: documentMetaType
            }
        },
    },
    meta: {
        name: string,
        short_name: string,
        author: string,
        copyright: number | string,
        color: string,
        background: string,
        document: {
            meta: documentMetaType
        }
    },
    env: environmentalNameType,
    global: {
        admin: unknown,
        api: unknown,
        web: unknown,
        core: unknown,
    },
    locales: {
        [k: string]: localesObjectType,
    },
    options: propObjectType,
    environmental: propObjectType,
    debug: boolean,
    token: string | 'unknown',
}
