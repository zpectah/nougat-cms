import { CommentsTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type CommentsTypesProps = keyof typeof CommentsTypeKeys;

export interface CommentsItemProps {
    id: modelIdType,
    type: CommentsTypesProps,
}
