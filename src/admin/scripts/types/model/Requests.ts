import { RequestsTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type RequestsTypesProps = keyof typeof RequestsTypeKeys;

export interface RequestsItemProps {
    id: modelIdType,
    type: RequestsTypesProps,
}
