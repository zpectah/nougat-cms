import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isDesktop } from 'react-device-detect';
import {
    Breadcrumbs as MuiBreadcrumbs,
    BreadcrumbsProps as MuiBreadcrumbsProps,
    Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FEATURES } from '../../const';
import routes from '../../routes';
import { RouteParamKeys } from '../../enums';
import {
    useBreadcrumbs,
    useRoutes,
    useLanguage,
} from '../../hooks';

type BreadcrumbsBaseProps = {
    withListLink?: boolean,
    withDetailLink?: boolean,
    onlyDesktop?: boolean,
}
export type BreadcrumbsProps = MuiBreadcrumbsProps & BreadcrumbsBaseProps

const Breadcrumbs = (props: BreadcrumbsProps) => {
    const {
        withListLink,
        withDetailLink,
        onlyDesktop,
        ...rest
    } = props;

    const visible = onlyDesktop ? isDesktop : true;

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
            label: t(`views:${route?.name}.label`),
            active: !!route?.key,
            path: withListLink && route?.path,
        },
        {
            key: 'detail',
            label: `${t(`common:detail`)}: ${detail}`,
            active: !!detail,
            path: withDetailLink && `${route?.path}/${RouteParamKeys['detail']}/${detail}`,
        },
        {
            key: 'panel',
            label: `${t(`common:panel`)}: ${panel}`,
            active: !!panel,
        },
    ];

    return (
        <>
            {visible && (
                <nav
                    role="presentation"
                    aria-label="breadcrumbs"
                >
                    <MuiBreadcrumbs
                        separator={
                            <NavigateNextIcon
                                fontSize="inherit"
                            />
                        }
                        {...rest}
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
                                                fontSize: '.8rem',
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <Typography
                                            key={item.key}
                                            variant="caption"
                                            sx={{
                                                color: 'inherit',
                                                fontSize: '.8rem',
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    )}
                                </>
                            );
                        })}
                    </MuiBreadcrumbs>
                </nav>
            )}
        </>
    );
};

export default Breadcrumbs;
