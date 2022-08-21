import { MenuItemsTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type MenuItemsTypesProps = keyof typeof MenuItemsTypeKeys;

export interface MenuItemsItemProps {
    id: modelIdType,
    type: MenuItemsTypesProps,
}
