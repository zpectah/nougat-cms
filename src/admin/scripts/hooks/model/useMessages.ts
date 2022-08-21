import { MessagesItemProps } from '../../types';

const useMessages = () => {
    const items: MessagesItemProps[] = [];

    return {
        Messages: items,
        loadMessages: () => { console.log('loadMessages') },
        createMessages: () => { console.log('createMessages') },
        updateMessages: () => { console.log('updateMessages') },
        toggleMessages: () => { console.log('toggleMessages') },
        deleteMessages: () => { console.log('deleteMessages') },
    };
};

export default useMessages;
