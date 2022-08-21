import { TagsTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type TagsTypesProps = keyof typeof TagsTypeKeys;

export interface TagsItemProps {
    id: modelIdType,
    type: TagsTypesProps,
}
