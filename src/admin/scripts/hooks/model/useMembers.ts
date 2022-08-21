import { MembersItemProps } from '../../types';

const useMembers = () => {
    const items: MembersItemProps[] = [];

    return {
        Members: items,
        loadMembers: () => { console.log('loadMembers') },
        createMembers: () => { console.log('createMembers') },
        updateMembers: () => { console.log('updateMembers') },
        toggleMembers: () => { console.log('toggleMembers') },
        deleteMembers: () => { console.log('deleteMembers') },
    };
};

export default useMembers;
