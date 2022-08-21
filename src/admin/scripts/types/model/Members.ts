import { MembersTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type MembersTypesProps = keyof typeof MembersTypeKeys;

export interface MembersItemProps {
    id: modelIdType,
    type: MembersTypesProps,
}
