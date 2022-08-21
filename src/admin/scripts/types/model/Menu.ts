import { MenuTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type MenuTypesProps = keyof typeof MenuTypeKeys;

export interface MenuItemProps {
    id: modelIdType,
    type: MenuTypesProps,
}
