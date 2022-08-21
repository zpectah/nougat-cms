import { MenuItemProps } from '../../types';

const useMenu = () => {
    const items: MenuItemProps[] = [];

    return {
        Menu: items,
        loadMenu: () => { console.log('loadMenu') },
        createMenu: () => { console.log('createMenu') },
        updateMenu: () => { console.log('updateMenu') },
        toggleMenu: () => { console.log('toggleMenu') },
        deleteMenu: () => { console.log('deleteMenu') },
    };
};

export default useMenu;
