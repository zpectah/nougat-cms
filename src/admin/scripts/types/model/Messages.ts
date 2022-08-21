import { MessagesTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type MessagesTypesProps = keyof typeof MessagesTypeKeys;

export interface MessagesItemProps {
    id: modelIdType,
    type: MessagesTypesProps,
}
