import { TagsItemProps } from '../../types';

const useTags = () => {
    const items: TagsItemProps[] = [];

    return {
        Tags: items,
        loadTags: () => { console.log('loadTags') },
        createTags: () => { console.log('createTags') },
        updateTags: () => { console.log('updateTags') },
        toggleTags: () => { console.log('toggleTags') },
        deleteTags: () => { console.log('deleteTags') },
    };
};

export default useTags;
