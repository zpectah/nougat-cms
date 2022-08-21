import { UploadsTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type UploadsTypesProps = keyof typeof UploadsTypeKeys;

export interface UploadsItemProps {
    id: modelIdType,
    type: UploadsTypesProps,
}
