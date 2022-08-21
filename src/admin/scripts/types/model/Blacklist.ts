import { BlacklistTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type BlacklistTypesProps = keyof typeof BlacklistTypeKeys;

export interface BlacklistItemProps {
    id: modelIdType,
    type: BlacklistTypesProps,
}
