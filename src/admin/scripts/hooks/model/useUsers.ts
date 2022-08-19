import { UsersItemProps } from '../../types';

export interface UseUsersReturnProps {
    Users: UsersItemProps[],
    loadUsers: () => Promise<unknown>, // TODO
    createUsers: () => Promise<unknown>, // TODO
    updateUsers: () => Promise<unknown>, // TODO
    toggleUsers: () => Promise<unknown>, // TODO
    deleteUsers: () => Promise<unknown>, // TODO
}

const useUsers = () => {
    const items: UsersItemProps[] = [];

    return {
        Users: items,
        loadUsers: () => { console.log('loadUsers') },
        createUsers: () => { console.log('createUsers') },
        updateUsers: () => { console.log('updateUsers') },
        toggleUsers: () => { console.log('toggleUsers') },
        deleteUsers: () => { console.log('deleteUsers') },
    };
};

export default useUsers;
