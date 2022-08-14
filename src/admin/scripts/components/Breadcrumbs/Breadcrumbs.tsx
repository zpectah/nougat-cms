import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FEATURES } from '../../const';
import routes from '../../routes';
import {
    useBreadcrumbs,
    useRoutes,
    useLanguage,
} from '../../hooks';

const Breadcrumbs = () => {
    const { t } = useTranslation([ 'common', 'views' ]);
    const { cms, detail, panel } = useBreadcrumbs();
    const { route } = useRoutes();
    const { language } = useLanguage();

    const navItems = [
        {
            key: 'system',
            label: cms.name,
            active: true,
            path: routes.Dashboard.path,
        },
        {
            key: 'language',
            label: language,
            active: FEATURES.breadcrumbsShowLanguage,
        },
        {
            key: 'page',
            label: t(`views:${route?.i18n_key}.label`),
            active: !!route?.key,
        },
        {
            key: 'detail',
            label: `${t(`common:detail`)}: ${detail}`,
            active: !!detail,
        },
        {
            key: 'panel',
            label: `${t(`common:panel`)}: ${panel}`,
            active: !!panel,
        },
    ];

    return (
        <nav
            role="presentation"
            aria-label="breadcrumbs"
        >
            <MuiBreadcrumbs
                sx={{ fontSize: '.8rem' }}
                separator={
                    <NavigateNextIcon
                        fontSize="inherit"
                    />
                }
            >
                {navItems.map((item) => {
                    if (item.active) return (
                        <>
                            {item.path ? (
                                <Link
                                    key={item.key}
                                    to={item.path}
                                    style={{
                                        color: 'inherit',
                                        fontSize: 'inherit',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <Typography
                                    key={item.key}
                                    variant="caption"
                                >
                                    {item.label}
                                </Typography>
                            )}
                        </>
                    );
                })}
            </MuiBreadcrumbs>
        </nav>
    );
};

export default Breadcrumbs;
