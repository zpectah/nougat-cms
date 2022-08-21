import { CategoriesTypeKeys } from '../../enums';
import { modelIdType } from './common';

export type CategoriesTypesProps = keyof typeof CategoriesTypeKeys;

export interface CategoriesItemProps {
    id: modelIdType,
    type: CategoriesTypesProps,
}
