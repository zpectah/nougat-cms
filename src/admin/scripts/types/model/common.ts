import { UseFormProps } from 'react-hook-form';

import { Model } from '../../enums';

export type modelKeyType = keyof typeof Model;

export type commonItemModelProps = UseFormProps['defaultValues'];
