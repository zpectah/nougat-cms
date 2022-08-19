import {
    UseFormProps,
    UseFormReturn,
    UseControllerProps,
    UseControllerReturn,
} from 'react-hook-form';

export type formProps = UseFormProps;
export type formReturnProps = UseFormReturn;
export type rowControllerProps = UseControllerProps;
export type rowControllerReturnProps = UseControllerReturn;
export type commonItemModelProps = formProps['defaultValues'];

export interface DetailFormProps {
    form: UseFormReturn,
}
