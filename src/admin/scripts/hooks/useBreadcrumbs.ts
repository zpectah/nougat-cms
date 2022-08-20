import { useLocation, useParams } from 'react-router-dom';

import config from '../config';
import { RouteParamKeys } from '../enums';
import { modelIdType, routeParamKeyType } from '../types';

const useBreadcrumbs = () => {
    const doc = window.document;
    const cms = config.constants.CMS;
    const year: number = new Date().getFullYear();
    const copyright = year !== cms.copyright ? `${cms.copyright} - ${year}` : cms.copyright;
    const location = useLocation();
    const params = useParams();
    const parsedPathRaw = location.pathname.split('/');
    const parsedPath = parsedPathRaw.filter(p => p);

    const getParamByKey = (key: routeParamKeyType) => (parsedPath[2] === key && parsedPath[3]) && parsedPath[3];
    const setDocumentMeta = (
        pageTitle?: string,
        pageDescription?: string,
        detailTitle?: string,
    ) => {
        const title = `${detailTitle ? `${detailTitle} | ` : ''}${pageTitle ? `${pageTitle} | ` : ''}${cms.name}`;
        const description = pageDescription ? pageDescription : cms.description;
        doc.title = title;
        if (pageDescription) window.document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    };

    const page = parsedPath[1];
    const detail = getParamByKey(RouteParamKeys['detail']) as modelIdType;
    const panel = getParamByKey(RouteParamKeys['panel']);
    const token = getParamByKey(RouteParamKeys['token']);

    return {
        cms,
        copyright,
        location,
        params,
        parsedPath,
        page,
        detail: detail && (detail === 'new' ? detail : Number(detail)),
        panel,
        token,
        setDocumentMeta,
    };
};

export default useBreadcrumbs;
