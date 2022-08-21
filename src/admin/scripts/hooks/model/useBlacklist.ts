import { BlacklistItemProps } from '../../types';

const useBlacklist = () => {
    const items: BlacklistItemProps[] = [];

    return {
        Blacklist: items,
        loadBlacklist: () => { console.log('loadBlacklist') },
        createBlacklist: () => { console.log('createBlacklist') },
        updateBlacklist: () => { console.log('updateBlacklist') },
        toggleBlacklist: () => { console.log('toggleBlacklist') },
        deleteBlacklist: () => { console.log('deleteBlacklist') },
    };
};

export default useBlacklist;
