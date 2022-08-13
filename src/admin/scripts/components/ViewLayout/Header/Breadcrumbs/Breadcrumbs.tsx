import React from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useBreadcrumbs, useRoutes } from '../../../../hooks';

const Breadcrumbs = () => {
    const { t } = useTranslation([ 'common', 'views' ]);
    const { cms, detail, panel } = useBreadcrumbs();
    const { route } = useRoutes();

    const navItems = [
        {
            key: 'system',
            label: cms.name,
            active: true,
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
                separator={
                    <NavigateNextIcon
                        fontSize="small"
                    />
                }
            >
                {navItems.map((item) => {
                    if (item.active) return (
                        <Typography
                            key={item.key}
                            variant="caption"
                        >
                            {item.label}
                        </Typography>
                    );
                })}
            </MuiBreadcrumbs>
        </nav>
    );
};

export default Breadcrumbs;
