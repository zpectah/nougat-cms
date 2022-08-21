import { TranslationsTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type TranslationsTypesProps = keyof typeof TranslationsTypeKeys;

export interface TranslationsItemProps {
    id: modelIdType,
    type: TranslationsTypesProps,
}
