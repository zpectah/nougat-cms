import { PagesTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type PagesTypesProps = keyof typeof PagesTypeKeys;

export interface PagesItemProps {
    id: modelIdType,
    type: PagesTypesProps,
}
