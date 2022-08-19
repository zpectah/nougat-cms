import React, { useMemo } from 'react';

import { Common, RouteParamKeys } from '../../enums';
import { modelKeyType, availableActionsProps } from '../../types';
import { SplitButton, SplitButtonProps, MenuProps } from '../ui';
import { useRoutes  } from '../../hooks';

type CreateButtonBaseProps = {
    modelKey?: modelKeyType,
    disabled?: boolean,
    menuProps?: MenuProps,
    availableActions: availableActionsProps,
}
export type CreateButtonProps = SplitButtonProps & CreateButtonBaseProps

const CreateButton = (props: CreateButtonProps) => {
    const {
        modelKey,
        disabled,
        menuProps,
        availableActions,
        ...rest
    } = props;

    const { routes, route, navigate } = useRoutes();

    const clickHandler = (prefix: string) => navigate(`${prefix}/${RouteParamKeys['detail']}/${Common['new']}`);

    const button = useMemo(() => {
        return {
            children: `New ${route?.name}`,
            onClick: () => clickHandler(`${route?.path}`),
            disabled: !availableActions.create,
        };
    }, [ route, availableActions ]);
    const menu = useMemo(() => {
        let list = [];
        for (const k in routes) {
            const r = routes[k];
            if (r.detail && (route?.name !== r.name)) {
                list.push({
                    key: r.key,
                    children: `New ${r.name}`,
                    onClick: () => clickHandler(`${r.path}`),
                    disabled: !availableActions.create,
                });
            }
        }

        return list;
    }, [ routes, route, modelKey, availableActions ]);

    return (
        <SplitButton
            id={`CreateButton_${modelKey}`}
            label={button.children}
            variant="contained"
            color="success"
            menu={menu}
            disabled={disabled}
            menuProps={menuProps}
            closableMenuItemClick
            mainButtonProps={{
                onClick: button.onClick,
                disabled: button.disabled,
            }}
            {...rest}
        />
    );
};

export default CreateButton;
