import { CommentsItemProps } from '../../types';

const useComments = () => {
    const items: CommentsItemProps[] = [];

    return {
        Comments: items,
        loadComments: () => { console.log('loadComments') },
        createComments: () => { console.log('createComments') },
        updateComments: () => { console.log('updateComments') },
        toggleComments: () => { console.log('toggleComments') },
        deleteComments: () => { console.log('deleteComments') },
    };
};

export default useComments;
