import React, {useEffect, useMemo, useState} from 'react';
import {
    Box,
    Tabs,
    Tab,
    Stack,
} from '@mui/material';

import { RouteParamKeys } from '../../enums';
import {
    SettingsProps,
    commonItemModelProps,
} from '../../types';
import { useBreadcrumbs, useRoutes } from '../../hooks';
import palette from '../../styles/palette';
import {
    ControlledForm,
    ControlledFormRow,
    Card,
    Button, Input,
} from '../../components';
import {
    GlobalPanel,
    WebPanel,
    ModulesPanel,
    AdminPanel,
} from './panel';

type panelTypes = 'global' | 'web' | 'modules' | 'admin';
type panelObjectType = {
    name: string,
    label: string,
}
type panelsObjectType = {
    [k: string]: panelObjectType,
}
type SettingsFormBaseProps = {
    data: SettingsProps,
    onReload: () => void,
    onUpdate: (payload: commonItemModelProps) => void,
}
export type SettingsFormProps = SettingsFormBaseProps

const SettingsForm = (props: SettingsFormProps) => {
    const {
        data,
        onReload,
        onUpdate,
    } = props;

    const { panel } = useBreadcrumbs();
    const { routes, navigate } = useRoutes();

    const [ activePanel, setActivePanel ] = useState<string | null>(null);

    const panels: panelsObjectType = {
        global: {
            name: 'global',
            label: 'Global',
        },
        web: {
            name: 'web',
            label: 'Web',
        },
        modules: {
            name: 'modules',
            label: 'Modules',
        },
        admin: {
            name: 'admin',
            label: 'Admin',
        },
    };

    const setPanelHandler = (payload: string | false) => {
        let panelName;
        if (payload) {
            panelName = payload;
        } else {
            panelName = 'global';
        }

        if (panelName) {
            navigate(`${routes.Settings.path}/${RouteParamKeys['panel']}/${panelName}`);
            setActivePanel(panelName);
        } else {

        }
    };

    useEffect(() => {
        setPanelHandler(panel);
    }, [ panel ]);

    return (
        <Box>
            <ControlledForm
                id="SettingsForm"
                name="SettingsForm"
                formProps={{
                    mode: 'all',
                }}
                // onSubmit={() => {}}
                render={(form) => {
                    const panelProps = {
                        form,
                    };

                    return (
                        <>
                            <Tabs
                                value={activePanel}
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab
                                    value={panels.global.name}
                                    label={panels.global.label}
                                    onClick={() => setPanelHandler(panels.global.name)}
                                />
                                <Tab
                                    value={panels.web.name}
                                    label={panels.web.label}
                                    onClick={() => setPanelHandler(panels.web.name)}
                                />
                                <Tab
                                    value={panels.modules.name}
                                    label={panels.modules.label}
                                    onClick={() => setPanelHandler(panels.modules.name)}
                                />
                                <Tab
                                    value={panels.admin.name}
                                    label={panels.admin.label}
                                    onClick={() => setPanelHandler(panels.admin.name)}
                                />
                            </Tabs>
                            <Box
                                sx={{
                                    pt: 2,
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                }}
                            >
                                <>
                                    {
                                        {
                                            global: <GlobalPanel {...panelProps} />,
                                            web: <WebPanel {...panelProps} />,
                                            modules: <ModulesPanel {...panelProps} />,
                                            admin: <AdminPanel {...panelProps} />,
                                        }[activePanel as panelTypes]
                                    }
                                </>
                            </Box>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent="flex-start"
                                sx={{
                                    my: 2,
                                }}
                            >
                                <Button
                                    secondary
                                >
                                    revert changes
                                </Button>
                                <Button
                                    submit
                                >
                                    update changes
                                </Button>
                            </Stack>
                        </>
                    );
                }}
            />
        </Box>
    );
};

export default SettingsForm;
