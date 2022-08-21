import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

import { commonItemModelProps } from '../../types';
import { ViewHeading } from '../../components';
import UiDemoForm from './UiDemoForm';

const uiDemoDefaultValues = {
    row: '',
    text: '',
    email: '',
    password: '',
    search: '',
    number: 0,
    select: '',
    selectMultiple: [],
    checkbox: true,
    checkboxLabel: false,
    checkboxGroup: [ '1', '3' ],
    switch: false,
    switchLabel: true,
    switchGroup: [ '2' ],
    radioGroup: '1',
    wysiwyg: '',
    slider: 0,
};

const UiDemo = () => {
    const { t } = useTranslation([ 'views' ]);

    const [ formValues, setFormValues ] = useState<typeof uiDemoDefaultValues>(cloneDeep(uiDemoDefaultValues));

    const loadHandler = () => {
        console.log('UiDemo: loadHandler');
        // TODO: callback for call api ... -->
        setFormValues(cloneDeep(uiDemoDefaultValues));
    };
    const submitHandler = (payload: commonItemModelProps) => {
        console.log('UiDemo: submitHandler', payload);
        // TODO: callback for call api ... -->
        loadHandler();
    };

    useEffect(() => {
        loadHandler();
    }, []);

    return (
        <>
            <ViewHeading
                title={t('views:UiDemo.title')}
                subtitle={t('views:UiDemo.subtitle')}
                withBreadcrumbs
            />
            <UiDemoForm
                defaultValues={formValues}
                onReload={loadHandler}
                onSubmit={submitHandler}
            />
        </>
    );
};

export default UiDemo;
