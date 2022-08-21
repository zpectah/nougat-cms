import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import {
    Form,
    Button,
    FormRow,
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
    const form = useForm({
        mode: 'all',
        defaultValues: {},
    });
    const handleSubmit = form.handleSubmit;

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
    const updateHandler = (formData: commonItemModelProps) => {
        // TODO: master ...
        console.log('submitHandler', formData);
        onUpdate && onUpdate(formData);
    };

    useEffect(() => {
        setPanelHandler(panel);
    }, [ panel ]);

    return (
        <Box>
            <Form
                id="SettingsForm"
                name="SettingsForm"
                onSubmit={handleSubmit(updateHandler)}
            >
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
                                    global: <GlobalPanel form={form} />,
                                    web: <WebPanel form={form} />,
                                    modules: <ModulesPanel form={form} />,
                                    admin: <AdminPanel form={form} />,
                                }[activePanel as panelTypes]
                            }
                        </>
                    </Box>
                    <Box>
                        <FormRow
                            emptyLabel
                        >
                            spaced empty field without label ...
                        </FormRow>
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
            </Form>
        </Box>
    );
};

export default SettingsForm;
