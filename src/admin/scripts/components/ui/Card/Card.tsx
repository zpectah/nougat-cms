import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import { merge } from 'lodash';
import {
    Card as MuiCard,
    CardProps as MuiCardProps,
    CardContent,
    CardContentProps,
    CardActions,
    CardActionsProps,
    Collapse,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

import { ActionBar, ActionBarProps } from '../ActionBar';

type CardBaseProps = {
    children?: React.ReactNode,
    collapsible?: boolean,
    collapsed?: boolean,
    title?: React.ReactNode,
    subtitle?: string,
    headerActions?: React.ReactNode,
    actions?: React.ReactNode | React.ReactNode[],
    dividers?: boolean,
    cardContentProps?: CardContentProps,
    cardActionsProps?: CardActionsProps,
    hiddenArrowButton?: boolean,
    actionBarProps?: ActionBarProps,
}
export type CardProps = CardBaseProps & MuiCardProps

const Card: React.FC<CardProps> = (props) => {
    const {
        children,
        collapsible,
        collapsed,
        title,
        subtitle,
        headerActions,
        actions,
        dividers,
        cardContentProps,
        cardActionsProps,
        hiddenArrowButton,
        actionBarProps,
        id,
        ...rest
    } = props;

    const [ open, setOpen ] = useState(false);

    const renderHeader = useMemo(() => {
        const toggle = () => collapsible && setOpen(!open);
        const actionBarVisible = headerActions || collapsible || actionBarProps;
        if (title || subtitle || headerActions) return (
            <>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="baseline"
                    sx={{ p: 2 }}
                >
                    <Stack
                        direction="column"
                        alignSelf="center"
                    >
                        {title && (
                            <Typography
                                variant="h4"
                                onClick={toggle}
                                sx={{ cursor: collapsible ? 'pointer' : 'default' }}
                            >
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography
                                variant="caption"
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Stack>
                    {actionBarVisible && (
                        <ActionBar
                            id={`${id}-actionBar`}
                            onExpandToggle={(collapsible && !hiddenArrowButton) && toggle}
                            expanded={open}
                            children={headerActions}
                            iconButtonSize="small"
                            {...actionBarProps}
                        />
                    )}
                </Stack>
                {dividers && <Divider />}
            </>
        );
    }, [
        title,
        subtitle,
        headerActions,
        collapsible,
        open,
        dividers,
    ]);
    const renderContent = useMemo(() => {
        const content = (
            <CardContent
                {...merge({
                    sx: {
                        '&:last-child': {
                            pb: 2,
                        },
                    },
                }, cardContentProps)}
            >
                {children}
            </CardContent>
        );

        if (collapsible) {
            return (
                <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                >
                    {content}
                </Collapse>
            );
        }

        return content;
    }, [
        open,
        collapsible,
        children,
        cardContentProps,
    ]);
    const renderActions = useMemo(() => {
        if (actions) return (
            <>
                {dividers && (
                    <Divider
                        sx={{ opacity: open ? 1 : 0 }}
                    />
                )}
                <CardActions
                    {...cardActionsProps}
                >
                    {actions}
                </CardActions>
            </>
        );
    }, [
        actions,
        cardActionsProps,
        dividers,
        open,
    ]);

    useEffect(() => setOpen(!!collapsed), [ collapsed ]);

    return (
        <MuiCard
            elevation={0}
            variant="outlined"
            id={id}
            {...rest}
        >
            {renderHeader}
            {renderContent}
            {renderActions}
        </MuiCard>
    );
};

export default Card;
