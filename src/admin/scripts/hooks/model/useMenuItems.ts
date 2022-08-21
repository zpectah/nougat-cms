import { MenuItemsItemProps } from '../../types';

const useMenuItems = () => {
    const items: MenuItemsItemProps[] = [];

    return {
        MenuItems: items,
        loadMenuItems: () => { console.log('loadMenuItems') },
        createMenuItems: () => { console.log('createMenuItems') },
        updateMenuItems: () => { console.log('updateMenuItems') },
        toggleMenuItems: () => { console.log('toggleMenuItems') },
        deleteMenuItems: () => { console.log('deleteMenuItems') },
    };
};

export default useMenuItems;
