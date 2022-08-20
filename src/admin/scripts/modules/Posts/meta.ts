import { Common, PostsTypeKeys } from '../../enums';
import { PostsItemProps } from '../../types';

export const newPostsModel: PostsItemProps = {
    id: Common['new'],
    type: PostsTypeKeys['default'],
    name: '',
};
