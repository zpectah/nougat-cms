import { CategoriesItemProps } from '../../types';

const useCategories = () => {
    const items: CategoriesItemProps[] = [];

    return {
        Categories: items,
        loadCategories: () => { console.log('loadCategories') },
        createCategories: () => { console.log('createCategories') },
        updateCategories: () => { console.log('updateCategories') },
        toggleCategories: () => { console.log('toggleCategories') },
        deleteCategories: () => { console.log('deleteCategories') },
    };
};

export default useCategories;
