import { useLocation, useParams } from 'react-router-dom';

import config from '../config';

const useBreadcrumbs = () => {
    const doc = window.document;
    const cms = config.constants.CMS;
    const year: number = new Date().getFullYear();
    const copyright = year !== cms.copyright ? `${cms.copyright} - ${year}` : cms.copyright;
    const location = useLocation();
    const params = useParams();
    const parsedPathRaw = location.pathname.split('/');
    const parsedPath = parsedPathRaw.filter(p => p);

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

    return {
        cms,
        copyright,
        location,
        params,
        parsedPath,
        page: parsedPath[1],
        detail: (parsedPath[2] === 'detail' && parsedPath[3]) && parsedPath[3],
        panel: (parsedPath[2] === 'panel' && parsedPath[3]) && parsedPath[3],
        setDocumentMeta,
    };
};

export default useBreadcrumbs;
