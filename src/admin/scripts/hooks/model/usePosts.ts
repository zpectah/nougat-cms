import { PostsItemProps } from '../../types';

// export interface UsePostsReturnProps {
//     Posts: PostsItemProps[],
//     loadPosts: () => Promise<unknown>, // TODO
//     createPosts: () => Promise<unknown>, // TODO
//     updatePosts: () => Promise<unknown>, // TODO
//     togglePosts: () => Promise<unknown>, // TODO
//     deletePosts: () => Promise<unknown>, // TODO
// }

const usePosts = () => {
    const items: PostsItemProps[] = [];

    return {
        Posts: items,
        loadPosts: () => { console.log('loadPosts') },
        createPosts: () => { console.log('createPosts') },
        updatePosts: () => { console.log('updatePosts') },
        togglePosts: () => { console.log('togglePosts') },
        deletePosts: () => { console.log('deletePosts') },
    };
};

export default usePosts;
