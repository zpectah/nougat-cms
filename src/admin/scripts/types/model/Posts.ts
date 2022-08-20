import { PostsTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type PostsTypesProps = keyof typeof PostsTypeKeys;

export interface PostsItemProps {
    id: modelIdType,
    type: PostsTypesProps,
}
